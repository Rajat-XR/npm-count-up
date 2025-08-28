/**
 * @license @rajatjain/count-up | Apache-2.0 License | https://github.com/Rajat-XR/npm-count-up
 * Copyright (c) 2024 rajatjain
 */
(function() {
  'use strict';
  function initCountUp() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const targets = document.querySelectorAll('[data-count-up]');
    targets.forEach(target => observer.observe(target));
  }
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        animateCountUp(targetElement);
        observer.unobserve(targetElement);
      }
    });
  }
  function animateCountUp(el) {
    const endValue = parseFloat(el.getAttribute('data-count-up'));
    const duration = parseInt(el.getAttribute('data-duration'), 10) || 2000;
    const delay = parseInt(el.getAttribute('data-delay'), 10) || 0;
    const format = el.getAttribute('data-format') || 'int';
    if (isNaN(endValue)) {
      el.textContent = 'Error!';
      console.error('Invalid data-count-up value on element:', el);
      return;
    }
    const startTime = performance.now();
    function frame(currentTime) {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < delay) {
        requestAnimationFrame(frame);
        return;
      }
      const timeAfterDelay = elapsedTime - delay;
      const progress = Math.min(timeAfterDelay / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      let currentValue = easedProgress * endValue;
      const formattingOptions = { minimumFractionDigits: 0, maximumFractionDigits: (format === 'int' ? 0 : 2) };
      el.textContent = currentValue.toLocaleString(undefined, formattingOptions);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = endValue.toLocaleString(undefined, formattingOptions);
      }
    }
    requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountUp);
  } else {
    initCountUp();
  }
})();