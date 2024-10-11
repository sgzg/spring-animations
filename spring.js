class Spring {
  constructor({
    duration = 0.5,
    bounce = 0.2,
    mass = 1,
    stiffness = 100,
    damping = 10,
    perceptualDuration = 1,
    properties = ['transform'], // Default to 'transform', customizable via attributes
    preset = null, // Preset (bouncy, smooth, flattened)
  } = {}) {
    this.mass = mass;
    this.stiffness = stiffness;
    this.damping = damping;
    this.duration = duration;
    this.bounce = bounce;
    this.perceptualDuration = perceptualDuration;
    this.properties = properties;
    this.velocity = {}; // Track velocity for each property
    this.previousArea = null; // Track area changes for resizing detection
    this.previousTransform = null; // Track translation and transformation
    if (preset) this.applyPreset(preset); // Apply preset if specified
  }

  // Apply preset configurations (bouncy, smooth, flattened)
  applyPreset(preset) {
    switch (preset.toLowerCase()) {
      case 'bouncy':
        this.bounce = 0.4;
        this.stiffness = 200;
        this.damping = 5;
        break;
      case 'smooth':
        this.bounce = 0;
        this.stiffness = 100;
        this.damping = 8;
        break;
      case 'flattened':
        this.bounce = -0.4;
        this.stiffness = 80;
        this.damping = 15;
        break;
      default:
        console.warn(`Unknown preset: ${preset}. Using default values.`);
    }
  }

  // Function 1: Handles bounce cases
  springEquation1(A, a, B, c, t) {
    return (A * Math.exp(a * t) + B * Math.exp(-a * t)) * Math.exp(-c * t);
  }

  // Function 2: Handles smooth cases without bounce
  springEquation2(A, B, c, t) {
    return (A * t + B) * Math.exp(-c * t);
  }

  // Calculate velocity-preserving spring value
  calculateSpringValue(A, B, a, c, t) {
    if (this.bounce > 0) {
      return this.springEquation1(A, a, B, c, t);
    } else {
      return this.springEquation2(A, B, c, t);
    }
  }

  // Detect changes in surface area or position (size and transform)
  detectChanges(element) {
    const currentRect = element.getBoundingClientRect();
    const currentArea = currentRect.width * currentRect.height;
    const computedStyle = window.getComputedStyle(element);

    let transformMatrix = computedStyle.transform !== 'none' ? computedStyle.transform : null;

    // Detect changes in area (resizing)
    let isResizing = this.previousArea !== null && currentArea !== this.previousArea;

    // Detect changes in translation (moving)
    let isMoving = this.previousTransform !== null && this.previousTransform !== transformMatrix;

    // Update previous values
    this.previousArea = currentArea;
    this.previousTransform = transformMatrix;

    return { isResizing, isMoving };
  }

  // Update velocity based on changes
  updateVelocity(property, newValue, deltaTime) {
    if (!this.velocity[property]) this.velocity[property] = 0;

    // Approximate velocity as change in value over time (finite difference)
    const velocity = (newValue - this.velocity[property]) / deltaTime;
    this.velocity[property] = velocity;
  }

  // Apply spring animation to specified properties on an element
  applyToElement(element) {
    const A = 1;
    const B = 0;
    const a = this.stiffness;
    const c = this.damping;

    let startTime;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const t = (time - startTime) / 1000;

      // Detect changes in size and position (momentum)
      const { isResizing, isMoving } = this.detectChanges(element);

      // If changes are detected, reconfigure the spring animation with current velocity
      if (isResizing || isMoving) {
        this.updateVelocity('transform', element.style.transform, t);
        startTime = time; // Reset animation time to adjust velocity properly
      }

      const newValue = this.calculateSpringValue(A, B, a, c, t);

      // Accumulate the transition property values for each specified property
      let transitionString = this.properties.map(property => {
        return `${property} ${this.duration}s ${this.generateBezierCurve()}`;
      }).join(', '); // Join them into a single string

      // Apply all transitions at once to the element
      element.style.transition = transitionString;

      // Set the transformed property based on newValue, can apply to specific properties
      this.properties.forEach(property => {
        if (property === 'transform') {
          element.style.transform = `translateY(${newValue}px)`; // Example for transform
        } else {
          // For other properties, you might have to map newValue accordingly or maintain a structure
          element.style[property] = newValue; // This is for simplicity; you'd handle each property correctly.
        }
      });

      if (t < this.duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    // Output the equivalent Bezier function for reuse
    const bezierCurve = this.generateBezierCurve();
    element.dataset.bezierCurve = bezierCurve;
  }

  // Generate cubic Bezier control points based on spring parameters
  generateBezierCurve() {
    const x1 = this.bounce > 0 ? 0.42 : (this.bounce < 0 ? 0.3 : 0.25);
    const y1 = this.bounce > 0 ? 1.75 : (this.bounce < 0 ? 0.6 : 0.1);
    const x2 = this.bounce > 0 ? 0.58 : (this.bounce < 0 ? 0.7 : 0.75);
    const y2 = 1.0;

    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }

  // Static method to instantiate from custom attributes, including shorthand and preset
  static fromAttributes(element) {
    const springShorthand = element.getAttribute('data-spring');
    if (springShorthand) {
      const parsedParams = Spring.parseShorthand(springShorthand);
      return new Spring(parsedParams);
    }

    const preset = element.getAttribute('data-spring-preset');
    const duration = parseFloat(element.getAttribute('data-spring-duration')) || 0.5;
    const bounce = parseFloat(element.getAttribute('data-spring-bounce')) || 0.2;
    const mass = parseFloat(element.getAttribute('data-spring-mass')) || 1;
    const stiffness = parseFloat(element.getAttribute('data-spring-stiffness')) || 100;
    const damping = parseFloat(element.getAttribute('data-spring-damping')) || 10;
    const perceptualDuration = parseFloat(element.getAttribute('data-spring-perceptual-duration')) || 1;

    const propertiesAttr = element.getAttribute('data-spring-properties');
    const properties = propertiesAttr ? propertiesAttr.split(',').map(prop => prop.trim()) : ['transform'];

    return new Spring({
      duration,
      bounce,
      mass,
      stiffness,
      damping,
      perceptualDuration,
      properties,
      preset,
    });
  }

  // Parse shorthand data-spring attribute (with improved error handling)
  static parseShorthand(springShorthand) {
    const params = springShorthand.split(',').reduce((acc, param) => {
      let [key, value] = param.split(':').map(item => item.trim());
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    return {
      duration: parseFloat(params.duration) || 0.5,
      bounce: parseFloat(params.bounce) || 0.2,
      mass: parseFloat(params.mass) || 1,
      stiffness: parseFloat(params.stiffness) || 100,
      damping: parseFloat(params.damping) || 10,
      perceptualDuration: parseFloat(params.perceptualDuration) || 1,
      properties: params.properties ? params.properties.split(',').map(prop => prop.trim()) : ['transform'],
    };
  }
}

// Utility to automatically apply spring animations based on attributes
function applySpringAnimationsFromAttributes() {
  const elements = document.querySelectorAll('[data-spring], [data-spring-preset]');
  
  elements.forEach((element) => {
    const spring = Spring.fromAttributes(element);
    spring.applyToElement(element);
  });
}

// Call this function to initialize spring animations for elements with data-spring attribute
document.addEventListener('DOMContentLoaded', applySpringAnimationsFromAttributes);
