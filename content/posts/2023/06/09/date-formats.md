---
date: "2023-06-09"
title: "Formatting Dates, the Correct Way"
excerpt: "Displaying a date is extremely common in digital products, but using a *clear format* requires a few more considerations."
---

_<small>I'm French and I don't have a lot of experience translating an app in Chinese or Arabic, for example, so take the following tips with a grain of salt in this kind of context. Feel free to contact me if necessary!</small>_<br /><br />

Displaying a date is extremely common in digital products, but using a *clear format* requires a few more considerations.

Here are just a few examples of what is possible:
- `DD-MM-YYYY` → "06-04-2022"
  - Format commonly used in European countries (or its variant `DD/MM/YYYY`)
- `MM-DD-YYYY` → "04-06-2022"
  - Format used by the US, which puts the month first, while the European version puts it second 😵‍💫
- `YYYY-MM-DD` → "2022-04-06"
  - As defined in the [ISO 8601][iso] standard
- `DD Month YYYY` → "06 April 2022"
  - Display the month in text
- `DD Mon YYYY` → "06 Apr 2022"
  - Shorter variant of the previous example
- [And many, many, many more…][dates]

Almost any programming language has a [powerful API][date-fns] to format a date however its developer wants.

Thus, it's easy to use a dozen different formats in a single app if you don't set strict standards and conventions. Moreover, some formats work for some countries but not in others.

**To simplify and clarify things, I highly recommend to only use two formats in the applications I work on.**

# Data-first: YYYY-MM-DD

For technical, compact and/or dense data, I use the ISO 8601 version: `YYYY-MM-DD` → "2022-04-06".

Why?
- This is the only format that can be sorted alphabetically, which is handy for file explorers or data tables
- There is **only one way** to read it: the year first, then the month and finally the day
  - When using the most common alternatives `DD-MM-YYYY` or `MM-DD-YYYY`, you cannot tell if the month or the day is first, except by looking at the current language of the app (and you can still be wrong if you cannot distinguish if it's British or American English)
- The `-` symbol works everywhere, while `/` can be refused by some (old) filesystems

**Note:** I always advise to prefix single-digit months and days by `0` so the format keeps an equivalent visual weight and is easier to parse: `2022-01-01` instead of `2022-1-1`

# Human-first: DD Month YYYY

For dates supposed to be quickly read by humans (in an article or a blog for example), I prefer to use `DD Month YYYY` → "06 April 2022" (with the full name of the month and not a shorter form).

Why?
- There is **no confusion** with this format (the day is two numbers, the month is written in plain text, _et voilà_)
- It's extremely clear and quick to read: you don't have to convert the month number to its actual month name
- It works in all countries
- It's easily translatable

---

Finally, if you only want to display a month (in a dropdown for example), I recommend to always show both the month number **AND** the month name: `01 - January` instead of `January` or `01`.

That way, you can visually search for or type the month name or number, and match any input you have at hand (eg. a credit card's expiration date).


[iso]: https://en.wikipedia.org/wiki/ISO_8601
[dates]: https://docs.oracle.com/cd/E41183_01/DR/Date_Format_Types.html
[date-fns]: https://date-fns.org/v2.29.3/docs/format
