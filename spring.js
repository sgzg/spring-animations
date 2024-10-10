class Spring {
  constructor({
    duration = 0.5,
    bounce = 0.2,
    mass = 1,
    stiffness = 100,
    damping = 10,
    perceptualDuration = 1,
    properties = ['transform'], // Default to 'transform', customizable via attributes
  } = {}) {
    this.mass = mass;
    this.stiffness = stiffness;
    this.damping = damping;
    this.duration = duration;
    this.bounce = bounce;
    this.perceptualDuration = perceptualDuration;
    this.properties = properties; // Store the properties to animate
  }

  // Function 1: Handles bounce cases
  springEquation1(A, a, B, c, t) {
    return (A * Math.exp(a * t) + B * Math.exp(-a * t)) * Math.exp(-c * t);
  }

  // Function 2: Handles smooth cases without bounce
  springEquation2(A, B, c, t) {
    return (A * t + B) * Math.exp(-c * t);
  }

  // Choose spring equation based on bounce value
  calculateSpringValue(A, B, a, c, t) {
    if (this.bounce > 0) {
      return this.springEquation1(A, a, B, c, t);
    } else {
      return this.springEquation2(A, B, c, t);
    }
  }

  // Generate cubic Bezier control points based on spring parameters
  generateBezierCurve() {
    const x1 = this.bounce > 0 ? 0.42 : 0.25;
    const y1 = this.bounce > 0 ? 1.75 : 0.1;
    const x2 = this.bounce > 0 ? 0.58 : 0.75;
    const y2 = this.bounce > 0 ? 1.0 : 1.0;

    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
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

      const newValue = this.calculateSpringValue(A, B, a, c, t);

      // Accumulate the transition property values for each specified property
      let transitionString = this.properties.map(property => {
        return `${property} ${this.duration}s ${this.generateBezierCurve()}`;
      }).join(', '); // Join them into a single string

      // Apply all transitions at once to the element
      element.style.transition = transitionString;

      if (t < this.duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    // Output the equivalent Bezier function for reuse
    const bezierCurve = this.generateBezierCurve();
    element.dataset.bezierCurve = bezierCurve;
  }

  // Apply the saved Bezier curve to another element
  applyBezierToElement(element) {
    const bezierCurve = element.dataset.bezierCurve;
    if (bezierCurve) {
      this.properties.forEach((property) => {
        element.style.transitionTimingFunction = bezierCurve;
      });
    }
  }

  // Parse shorthand data-spring attribute (with improved error handling)
  static parseShorthand(springShorthand) {
    const params = springShorthand.split(',').reduce((acc, param) => {
      let [key, value] = param.split(':').map(item => item.trim());
      // Handle cases where = is used by mistake, replace = with : before parsing
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

  // Static method to instantiate from custom attributes, including shorthand
  static fromAttributes(element) {
    const springShorthand = element.getAttribute('data-spring');
    if (springShorthand) {
      const parsedParams = Spring.parseShorthand(springShorthand);
      return new Spring(parsedParams);
    }

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
    });
  }
}

// Utility to automatically apply spring animations based on attributes
function applySpringAnimationsFromAttributes() {
  const elements = document.querySelectorAll('[data-spring]');
  
  elements.forEach((element) => {
    const spring = Spring.fromAttributes(element);
    spring.applyToElement(element);
  });
}

// Call this function to initialize spring animations for elements with data-spring attribute
document.addEventListener('DOMContentLoaded', applySpringAnimationsFromAttributes);
