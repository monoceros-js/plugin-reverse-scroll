# @monoceros/plugin-reverse-scroll

> Plugin that reverses the scroll direction within a monoceros container

* * *

## Table of contents

- [Install](#install)
  - [NPM](#npm)
- [Usage](#usage)
  - [HTML setup](#html-setup)
- [License](#license)

## Install

### NPM

```bash
npm install @monoceros/plugin-reverse-scroll
```

* * *

## Usage

```js
import Monoceros from 'monoceros'
import ReverseScrollPlugin from '@monoceros/plugin-reverse-scroll'
Monoceros
  .use(ReverseScrollPlugin)
  .init()
```

### HTML setup

- `[data-monoceros-reverse]` <sup>(required)</sup> - Reverse scroll container. Must be placed within a `[data-monoceros-container]` element.

> **Note**: To truly see the reverse scroll effect, elements within the `[data-monoceros-reverse]` element should be larger than 100vh combined.

```html
<style>
  section {
    height: 100vh;
  }
</style>
<body>
  <div data-monoceros-viewport>
    <section>Before reverse scroll</section>

    <div data-monoceros-container>
      <div data-monoceros-reverse>
        <section>End reverse scroll</section>
        <section>Just a little further....</section>
        <section>Keep scrolling...</section>
        <section>Start reverse scroll</section>
      </div>
    </div>

    <section>After reverse scroll</section>
  </div>
</body>
```

* * *

## License

[MIT](license) @ [Folkert-Jan van der Pol](https://folkertjan.nl)
