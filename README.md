# @rajatjain/count-up

A zero-dependency, high-performance, and simple vanilla JavaScript utility to animate numbers counting up when they scroll into view.

[![NPM Version](https://img.shields.io/npm/v/@rajatjain/count-up.svg)](https://www.npmjs.com/package/@rajatjain/count-up)
[![License](https://img.shields.io/npm/l/@rajatjain/count-up.svg)](https://github.com/Rajat-XR/npm-count-up/blob/main/LICENSE)
[![Minified Size](https://img.shields.io/bundlephobia/min/@rajatjain/count-up)](https://bundlephobia.com/result?p=@rajatjain/count-up)

## Features

- **Zero Dependencies:** Plain vanilla JavaScript.
- **High-Performance:** Uses `IntersectionObserver` for efficient detection.
- **Declarative & Simple:** Just add a `data-count-up` attribute.
- **Customizable:** Control duration, delay, and format via data attributes.
- **Lightweight:** Less than 1kb minified.

## Installation

Include with a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@rajatjain/count-up@1.0.0/dist/count-up.min.js"></script>
```

Or install via npm:

```bash
npm install @rajatjain/count-up
```

## Usage

```html
<h2>Projects Completed: <span data-count-up="1500">0</span></h2>

<h2>Satisfaction: <span data-count-up="98.7" data-format="decimal">0</span>%</h2>
```

## License

[Apache-2.0](LICENSE)