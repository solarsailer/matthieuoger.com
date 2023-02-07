---
date: "2023-02-07"
title: "Alpha Value in CSS Color Properties"
excerpt: "You can use `/ alpha` in `hsl` and `rgb` functional notations inside CSS color properties."
---

Today[^1], I [learned][mdn1] [that][mdn2] that you could use a `/ alpha` value in CSS color property functions (`hsl`, `rgb`, etc.).[^2]

It looks like this:

```css
color: hsl(0 0% 0% / 0.5);
color: rgb(0 0 0 / 0.5);
```

Where the `alpha` value is a number between `0` (full opacity) and `1` (no opacity).

Previously, you had to use a function variant to change the alpha:[^3]

```css
color: hsla(0, 0%, 0%, 0.5);
color: rgba(0, 0, 0, 0.5);
```

<small>(Note the `a` at the end of each function, ie. `rgb` → `rgba`.)</small>

This is really handy, because you can change the content of the function without changing the function name itself. Which is more practical when using React and CSS-in-JS libraries. I know I would have use that a few times already if I was aware of this small spec change.

The [support][mdn-support] [is pretty good][caniuse-support] (more than 92%), so it's mostly safe to use on modern websites.


[^1]: It's not really new anymore, but I don't code that much nowadays. That was a small nice surprise. ;)
[^2]: I (and [others][hsl]) still recommend to use the `hsl` function instead of `rgb` or hex values. It's more powerful and as soon as you grasp how the model works, it's easier and quicker to manipulate. Especially for variables and theming purposes.
[^3]: The old notation still works, but it's considered legacy.

  The _commas are also optional_ now (and considered legacy as well).

  AND there is another syntax using commas **and** an alpha value (`hsl(0, 0%, 0%, 0.5)` / `hsla(0, 0%, 0%, 0.5)`) or an alpha percentage (`hsl(0, 0%, 0%, 50%)` / `hsla(0, 0%, 0%, 50%)`).

  Basically, you can do anything you want, but using the `/ alpha` syntax without commas and `a` suffix in the function name is the proper and preferred way. 🥴

[mdn1]: http://developer.mozilla.org/en-US/docs/Web/CSS/color_value
[mdn2]: http://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl
[hsl]: https://www.sarasoueidan.com/blog/hex-rgb-to-hsl/
[mdn-support]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl#browser_compatibility
[caniuse-support]: https://caniuse.com/?search=hsl%20alpha
