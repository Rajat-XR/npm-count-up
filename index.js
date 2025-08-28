/**
 * @license @rajatjain/count-up | Apache-2.0 License | https://github.com/Rajat-XR/npm-count-up
 * Copyright (c) 2024 rajatjain
 */
'use strict';

class CountUp {
  constructor(element, options = {}) {
    if (!element) {
      throw new Error('Element must be provided.');
    }
    this.el = element;
    
    // Merge user options with defaults
    this.options = {
      endValue: 0,
      startValue: undefined,
      duration: 2000,
      delay: 0,
      format: 'int',
      onStart: () => {},
      onUpdate: () => {},
      onComplete: () => {},
      ...options,
    };
    
    this.endValue = this.options.endValue;
    this.startValue = this.options.startValue !== undefined ? this.options.startValue : (parseFloat(this.el.textContent.replace(/,/g, '')) || 0);

    // Internal state
    this.paused = true;
    this.startTime = null;
    this.frameId = null;
    this.elapsed = 0;
    this.remaining = this.options.duration;

    this.update(this.startValue); // Set initial text
  }
  
  animate(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp;
      this.options.onStart(this.startValue);
    }

    this.elapsed = timestamp - this.startTime;

    if (this.elapsed < this.options.delay) {
        this.frameId = requestAnimationFrame(this.animate.bind(this));
        return;
    }

    const timeAfterDelay = this.elapsed - this.options.delay;
    let progress = Math.min(timeAfterDelay / this.options.duration, 1);
    
    const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    
    const currentValue = this.startValue + (this.endValue - this.startValue) * easedProgress;
    this.update(currentValue);
    this.options.onUpdate(currentValue);
    
    if (progress < 1) {
      this.frameId = requestAnimationFrame(this.animate.bind(this));
    } else {
      this.update(this.endValue);
      this.options.onComplete(this.endValue);
    }
  }

  update(value) {
    if (typeof this.options.format === 'function') {
      this.el.textContent = this.options.format(value);
      return;
    }
    
    const formattingOptions = {
      minimumFractionDigits: 0,
      maximumFractionDigits: (this.options.format === 'int' ? 0 : 2)
    };
    this.el.textContent = value.toLocaleString(undefined, formattingOptions);
  }

  start() {
    this.reset();
    this.paused = false;
    this.frameId = requestAnimationFrame(this.animate.bind(this));
  }

  pause() {
    if (!this.paused && this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
      this.paused = true;
      this.remaining = this.options.duration - (this.elapsed - this.options.delay);
    }
  }

  resume() {
    if (this.paused) {
      this.paused = false;
      this.options.duration = this.remaining;
      this.startTime = null; // Will be set on the next frame
      this.frameId = requestAnimationFrame(this.animate.bind(this));
    }
  }

  reset() {
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
    this.paused = true;
    this.startTime = null;
    this.elapsed = 0;
    this.remaining = this.options.duration;
    this.update(this.startValue);
  }
}

// ---- BACKWARDS COMPATIBILITY & AUTO-INIT ----
// This section keeps the simple declarative usage working.
function initDeclarativeCountUp() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        const options = {
          endValue: parseFloat(el.getAttribute('data-count-up')),
          duration: parseInt(el.getAttribute('data-duration'), 10) || undefined,
          delay: parseInt(el.getAttribute('data-delay'), 10) || undefined,
          format: el.getAttribute('data-format') || undefined,
        };

        if (!isNaN(options.endValue)) {
          new CountUp(el, options).start();
        } else {
          console.error('[CountUp] Invalid data-count-up value on element:', el);
        }
        
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-count-up]').forEach(el => observer.observe(el));
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeclarativeCountUp);
  } else {
    initDeclarativeCountUp();
  }
  window.CountUp = CountUp;
}

export default CountUp;