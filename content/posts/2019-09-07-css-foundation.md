---
date: "2019-09-07"
title: "Solid CSS Foundation"
excerpt: ""
---

<blockquote class="tldr">
  Link to repo
</blockquote>

Over the years, I constructed a sane set of defaults for my CSS. It's not a lot of code, but this gives me a solid foundation for the actual application code. I don't say that this is the perfect CSS to start with — I'm sure many people won't agree with my choices — but this is something that worked flawlessly for me in the last years. I did not invent anything here, but carefully put together pieces that I learned in other articles and codebases.

I'll start with basic CSS and I will add the CSS Variables, Sass and Styled-Components versions after. With these libraries, we will add variables that will help configure the system without touching the files.

_NB: I am not using prefixes in the CSS code below. No human should prefix manually, so use [Autoprefixer](https://github.com/postcss/autoprefixer) and forget about it._

# 1) Normalize.css

[Normalize.css][normalize] is the first import you should add to your CSS. It evens out all browsers inconsistencies and gives the same default styles to each native element.

[Normalize.css][normalize] is not as useful as it has been in the past, but I still continue to use it. It's really small, and help for compatibility with older browser. I use the [version 5](https://github.com/necolas/normalize.css/releases/tag/5.0.0) personally. There was some issues with the next few versions (removing unopinionated styles which I didn't want to) and I never tried the last ones since then.

# 2) Base.css

Base.css is my "sane defaults" CSS sheet:

```css
/* Box Model */

html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

/* Typographic System */

html {
  font: 62.5%/1.4 Verdana, sans-serif;
}

body {
  font-size: 1.5em;
}

/* Viewport */

body {
  position: relative;
  min-height: 100vh;
  margin: 0;
}

/* Colors */

html {
  color: black;
  background: tomato;
}

body {
  background: white;
}

::selection {
  color: white;
  background: tomato;
}
```

Let's look block by block.

## Box Model

```css
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
```

This part is probably the most crucial one. The default CSS box model ([`content-box`](https://jsfiddle.net/matthieuoger/3jv6ycn7/1/)) is, unfortunately, not the correct one. To make it simple, the Content Box model makes the width independent from the border and padding. If you have `20px` padding, `20px` border and `100px` width, your box will have a total width of `140px`, not `100px`.

With the [`border-box`](https://jsfiddle.net/matthieuoger/m9sj5p4n/) model, the total width will include the border and padding. So, with `20px`, `20px` border and `100px` width, your total width will still be `100px`. This model is predictable and intuitive, and do what the human mind thinks when it writes CSS.

This block is fixed: nothing needs to be modified.

## Typographic grid system

```css
html {
  font: 62.5%/1.4 Verdana, sans-serif;
}

body {
  font-size: 1.5em;
}
```

These two lines are so simple and yet so powerful. It's the basis of a powerful and consistent unit and typographic system.

Each value should be configured to adapt to your need:

- `font` in `html`
  - Grid system: the first value of `font` is your grid system. `62.5%` is a 10px grid system, while `50%` is an [8px grid system](https://spec.fm/specifics/8-pt-grid).
  - Line height: setting the correct `line-height` is required to have a good typography. The [basic rule of thumb](https://practicaltypography.com/summary-of-key-rules.html) is to have a `line-height` between `120%` (`1.2`) and `145%` (`1.45`) of your `font-size`.
  - Font stack: the final values are for the font stack that you will use. Here, I use `Verdana, sans-serif`, which is a completely safe font stack that will work on any brother, but which is also boring and really not stylish. You should spend time finding the correct font stack for your website, and be sure to have correct fallbacks if your main choice is not available.
- `font-size` in `body`
  - Even if we



[normalize]: https://necolas.github.io/normalize.css/
