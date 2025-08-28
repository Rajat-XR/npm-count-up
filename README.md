# @rajatjain/count-up

A lightweight, zero-dependency, high-performance, and simple vanilla JavaScript utility to animate numbers counting up when they scroll into view.

[![NPM Version](https://img.shields.io/npm/v/@rajatjain/count-up.svg)](https://www.npmjs.com/package/@rajatjain/count-up)
[![License](https://img.shields.io/npm/l/@rajatjain/count-up.svg)](https://github.com/Rajat-XR/npm-count-up/blob/main/LICENSE)
[![Minified Size](https://img.shields.io/bundlephobia/min/@rajatjain/count-up)](https://bundlephobia.com/result?p=@rajatjain/count-up)

## Features

- **Zero Dependencies:** Written in plain vanilla JavaScript.
- **High-Performance:** Uses `IntersectionObserver` for efficient detection and `requestAnimationFrame` for smooth animations.
- **Declarative & Simple:** Just add a `data-count-up` attribute to your HTML. No JavaScript configuration required.
- **Customizable:** Control speed, delay, and number formatting directly from your HTML.
- **Lightweight:** Less than 1kb minified and gzipped.

## Installation

The easiest way to use the package is to include it from a CDN right before your closing `</body>` tag. Remember to check for the latest version number.

```html
<script src="https://cdn.jsdelivr.net/npm/@rajatjain/count-up@1.0.0/dist/count-up.min.js"></script>
```

Or, you can install it into your project using npm:

```bash
npm install @rajatjain/count-up
```

And then import it into your main JavaScript file:

```javascript
import '@rajatjain/count-up';
```

## Usage

Using the library is designed to be as simple as possible. Just add the `data-count-up` attribute to any HTML element. The script will automatically find it and animate it when it scrolls into view.

The initial number inside the element (like the `0` below) will be used as the starting point for the animation.

#### Basic Example (Whole Number)
```html
<h2>Projects Completed</h2>
<h3 data-count-up="1842">0</h3>
```

#### Basic Example (Decimal Number)
To count a number with a decimal point, you must also add `data-format="decimal"`.

```html
<h2>Average Rating</h2>
<p><span data-count-up="4.7" data-format="decimal">0</span> / 5</p>
```

## Customization & Options

You can easily customize the animation behavior for each element by adding these optional `data-*` attributes.

| Attribute         | Description                                                                     | Default | Example                                            |
|-------------------|---------------------------------------------------------------------------------|---------|----------------------------------------------------|
| `data-count-up`   | **Required.** The final number to count up to.                                  | -       | `data-count-up="2024"`                             |
| `data-duration`   | The total animation speed in milliseconds (1000ms = 1 second).                  | `2000`  | `data-duration="3500"` (animates for 3.5 seconds)  |
| `data-delay`      | The wait time in milliseconds before the animation starts after being seen.     | `0`     | `data-delay="500"` (waits for half a second)       |
| `data-format`     | The number format. Use `int` for whole numbers and `decimal` for decimal numbers. | `int`   | `data-format="decimal"`                            |

### Advanced Example

Here is an example that combines all the customization options for a more advanced effect.

```html
<h3>Money Raised for Charity</h3>
<h2>
  $<span 
    data-count-up="52489.55" 
    data-duration="3000"
    data-delay="250"
    data-format="decimal"
  >0</span>
</h2>
```

This counter will:
1.  Trigger when it scrolls into view.
2.  Wait for 250 milliseconds (`data-delay`).
3.  Animate from 0 up to 52,489.55 over a period of 3 seconds (`data-duration`).
4.  Display the number with decimal points (`data-format`).

## License

[Apache-2.0](LICENSE)
