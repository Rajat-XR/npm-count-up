# @rajatjain/count-up

A lightweight, high-performance, and dependency-free vanilla JavaScript library for animating numbers. Animate numbers counting up or down on scroll, or control the animation programmatically with a powerful and easy-to-use API.

[![NPM Version](https://img.shields.io/npm/v/@rajatjain/count-up.svg)](https://www.npmjs.com/package/@rajatjain/count-up)
[![Minified Size](https://img.shields.io/bundlephobia/min/@rajatjain/count-up)](https://bundlephobia.com/result?p=@rajatjain/count-up)
[![License](https://img.shields.io/npm/l/@rajatjain/count-up.svg)](https://github.com/Rajat-XR/npm-count-up/blob/main/LICENSE)

---

## ✨ Features

- **✅ Dual API:** Use with simple HTML `data-*` attributes for automatic scroll-based animations, or use the JavaScript API for full programmatic control.
- **⏯️ Manual Controls:** Start, pause, resume, and reset your animations whenever you want.
- **🪝 Lifecycle Hooks:** Execute custom code at key moments with `onStart`, `onUpdate`, and `onComplete` callbacks.
- **💰 Advanced Formatting:** Provide your own function to format the output exactly as you need (e.g., add currency symbols, use custom separators).
- **⬆️⬇️ Counts Up or Down:** Seamlessly animates from any start number to any end number, whether it's an increase or decrease.
- **🚀 High-Performance:** Built with `IntersectionObserver` and `requestAnimationFrame` for buttery-smooth animations that don't bog down your site.
- **💡 Zero Dependencies:** Incredibly lightweight and dependency-free.

---

## 💾 Installation

#### CDN (Recommended for quick use)
Include this script tag right before your closing `</body>` tag.

```html
<script src="https://cdn.jsdelivr.net/npm/@rajatjain/count-up@1.1.0/dist/count-up.min.js"></script>
```

#### NPM (For use in a build process)
```bash
npm install @rajatjain/count-up
```

Then, import it into your project:
```javascript
import CountUp from '@rajatjain/count-up';
```

---

## 🚀 Quick Start (Automatic Scroll Animation)

For the simplest use case, add a `data-count-up` attribute to any HTML element. The animation will trigger automatically when the element scrolls into view.

```html
<h3>Projects Completed</h3>
<h2 data-count-up="1842">0</h2>

<h3>Average Rating</h3>
<p><span data-count-up="4.7" data-format="decimal">0</span> / 5</p>

<h3>Client Satisfaction</h3>
<p><span data-count-up="99" data-duration="3000" data-delay="500">0</span>%</p>
```

---

## 🛠️ Advanced Usage (JavaScript API)

For full control over your animations, use the `CountUp` class.

#### Basic Initialization

```javascript
const myCounterElement = document.getElementById('my-counter');

// The only required option is endValue
const options = {
  endValue: 2048
};

// Create a new instance
const myCounter = new CountUp(myCounterElement, options);

// Start the animation manually
myCounter.start();
```

#### API Options

You can pass an options object as the second argument to the constructor to customize behavior.

| Option       | Type      | Description                                                                     | Default |
|--------------|-----------|---------------------------------------------------------------------------------|---------|
| `endValue`   | `Number`  | **Required.** The final number to animate to.                                   | `0`     |
| `startValue` | `Number`  | The number to start animating from. If not set, it uses the element's text content. | `0`     |
| `duration`   | `Number`  | The animation duration in milliseconds.                                         | `2000`  |
| `delay`      | `Number`  | The wait time in milliseconds before the animation starts.                      | `0`     |
| `format`     | `String` or `Function` | Either `'int'` / `'decimal'`, or a custom function for advanced formatting. | `'int'` |
| `onStart`    | `Function` | A callback function that runs when the animation begins.                       | `()=>{}`|
| `onUpdate`   | `Function` | A callback that runs on every animation frame, receiving the current value.     | `()=>{}`|
| `onComplete` | `Function` | A callback that runs when the animation finishes.                               | `()=>{}`|

#### API Methods

Once you have an instance, you can control it with these methods:

- **`.start()`**: Begins the animation from the start value.
- **`.pause()`**: Stops the animation at the current value.
- **`.resume()`**: Continues a paused animation.
- **`.reset()`**: Resets the element to the start value and stops the animation.

### 📚 Recipes & Examples

#### 1. Counting Down from a Value

The library automatically handles counting down if the `endValue` is lower than the start value.

```html
<h2 id="countdown">10</h2>
```
```javascript
const countdownEl = document.getElementById('countdown');
const countdown = new CountUp(countdownEl, { endValue: 0, duration: 10000 }); // 10 seconds
countdown.start();```

#### 2. Advanced Formatting (e.g., Currency)

Provide a custom function to the `format` option for complete control.

```html
<h3>Total Revenue</h3>
<h2 id="revenue">0</h2>
```
```javascript
const revenueEl = document.getElementById('revenue');
const revenueCounter = new CountUp(revenueEl, {
  endValue: 52489.55,
  duration: 4000,
  format: (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
});
revenueCounter.start();
```

#### 3. Manual Control with Buttons

Hook up API methods to user interactions like button clicks.

```html
<h2 id="manual-counter">0</h2>
<button id="start-btn">Start</button>
<button id="pause-btn">Pause</button>
```
```javascript
const manualCounterEl = document.getElementById('manual-counter');
const counter = new CountUp(manualCounterEl, { endValue: 100, duration: 5000 });

document.getElementById('start-btn').addEventListener('click', () => counter.start());
document.getElementById('pause-btn').addEventListener('click', () => {
  if (counter.paused) {
    counter.resume();
    document.getElementById('pause-btn').textContent = 'Pause';
  } else {
    counter.pause();
    document.getElementById('pause-btn').textContent = 'Resume';
  }
});
```

---

## 💼 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📜 License

[Apache-2.0](LICENSE)