class Spring {
  constructor({
    duration = 0.5,
    bounce = 0.2,
    mass = 1,
    stiffness = 100,
    damping = 10,
    properties = ['transform'], // Default to 'transform', customizable via attributes
    preset = null, // Preset (bouncy, smooth, flattened)
  } = {}) {
    this.mass = mass;
    this.stiffness = stiffness;
    this.damping = damping;
    this.duration = duration;
    this.bounce = bounce;
    this.properties = properties;

    if (preset) this.applyPreset(preset); // Apply preset if specified
  }

  // Apply preset configurations (bouncy, smooth, flattened)
  applyPreset(preset) {
    const presets = {
      bouncy: { stiffness: 150, damping: 20, duration: 0.75 },
      smooth: { stiffness: 120, damping: 15, duration: 0.5 },
      flattened: { stiffness: 80, damping: 5, duration: 0.3 },
    };
    const presetConfig = presets[preset];
    if (presetConfig) {
      this.stiffness = presetConfig.stiffness;
      this.damping = presetConfig.damping;
      this.duration = presetConfig.duration;
    }
  }

  // Calculate the spring value based on parameters
  calculateSpringValue(A, B, a, c, t) {
    const dampingRatio = c / (2 * Math.sqrt(a));
    const naturalFrequency = Math.sqrt(a);
    return (A - B) * Math.exp(-dampingRatio * t) * Math.cos(naturalFrequency * t) + B;
  }

  // Apply spring animation to specified properties on an element
  applyToElement(element) {
    const A = 0; // Desired position (final position)
    const B = parseFloat(getComputedStyle(element).transform.split(',')[5]) || 0; // Current position
    const a = this.stiffness;
    const c = this.damping;

    let startTime;

    const bezierCurve = this.generateBezierCurve(); // Generate the Bezier curve
    element.style.transition = `transform ${this.duration}s ${bezierCurve}`; // Apply transition with Bezier

    const animate = (time) => {
      if (!startTime) startTime = time;
      const t = (time - startTime) / 1000;

      const newValue = this.calculateSpringValue(A, B, a, c, t);
      element.style.transform = `translateY(${newValue}px)`; // Update the transform directly

      if (t < this.duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = `translateY(${A}px)`; // Ensure it finishes at the target position
      }
    };

    requestAnimationFrame(animate);
  }

  // Generate cubic Bezier control points based on spring parameters
  generateBezierCurve() {
    const x1 = this.bounce > 0 ? 0.42 : (this.bounce < 0 ? 0.3 : 0.25);
    const y1 = this.bounce > 0 ? 1.75 : (this.bounce < 0 ? 0.6 : 0.1);
    const x2 = this.bounce > 0 ? 0.58 : (this.bounce < 0 ? 0.7 : 0.75);
    const y2 = 1.0;

    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }

  // Static method to instantiate from custom attributes
  static fromAttributes(element) {
    const duration = element.getAttribute('data-spring-duration') || 0.5;
    const bounce = element.getAttribute('data-spring-bounce') || 0.2;
    const mass = element.getAttribute('data-spring-mass') || 1;
    const propertiesAttr = element.getAttribute('data-spring-properties');
    const properties = propertiesAttr ? propertiesAttr.split(',').map(prop => prop.trim()) : ['transform'];

    return new Spring({
      duration: parseFloat(duration),
      bounce: parseFloat(bounce),
      mass: parseFloat(mass),
      properties,
    });
  }
}

// Utility to automatically apply spring animations based on attributes
function applySpringAnimationsFromAttributes() {
  const elements = document.querySelectorAll('*'); // Select all elements

  elements.forEach((element) => {
    const attributes = Array.from(element.attributes);
    const hasSpringAttribute = attributes.some(attr => attr.name.startsWith('data-spring'));

    if (hasSpringAttribute) {
      const spring = Spring.fromAttributes(element);
      if (spring) {
        spring.applyToElement(element);
        console.log("Spring applied to element:", element);
      } else {
        console.warn("Spring instance could not be created for element:", element);
      }
    }
  });
}

// Event listener to trigger animations on DOMContentLoaded
document.addEventListener('DOMContentLoaded', applySpringAnimationsFromAttributes);
