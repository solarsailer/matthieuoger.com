---
date: "2018-07-20"
title: "Reboot"
excerpt: "I have redesigned Solar Sailer, making the home page the most important one and refocusing this site as a way to find me on Internet. The blog is relegated to a secondary part of the website. I still plan to publish articles, but the focus of Solar Sailer is to quickly know who I am, what I've done and where you can find me. The rest is a bonus."
---

It's been a long time since my last post (more than two years, in fact). And the reason is absurd.

**tl;dr**: I have redesigned Solar Sailer, making the [home page](/) the most important one and refocusing this site as a way to find me on Internet. The blog is relegated to a secondary part of the website. I still plan to publish articles, but the focus of Solar Sailer is to quickly know who I am, what I've done and where you can find me.

The rest is a bonus. However, I'm still planning to expand this website in new ways — adding a portfolio and a resume, most notably.

[ ![New redesign and home page](/images/posts/2018-07-20-reboot.jpg) ](/)

If you want to read more about why it took so long, continue. Otherwise, you know everything. 😉

---

I was using [Jekyll][jekyll] to generate this blog and hosting it with [GitHub Pages](https://pages.github.com) (Jekyll is maintained by GitHub, so the workflow to publish a Jekyll site on GitHub is dead simple if you accept their dependencies and constraints). Then, one day, GitHub said that they were deprecating the Markdown engine that I was using, affecting a few posts I wrote.

I wanted to redesign this site for a long time, so instead of just updating the posts, I decided to rewrite the whole blog (like every developer do each time they have a small change to do — it's our curse).

I experimented. I designed 6 or 8 layouts. I was never happy, and I never gave me the time to finish it properly. When I started to implement a new design, I let it wither for a few months. And when I came back, I just ditched it all. Again. And again. And again.

I moved the blog to [Hugo][hugo]. Then I came back to Jekyll once more. I modernized everything. Then I was fed up with Jekyll again, so I tried [Gatsby][gatsby]. And I did other things, abandoning the redesign once again. Meanwhile, and even if I had dozens of drafts, I couldn't update the old blog with new articles. So it languished there, in its infamous uglyness (something I was not proud of, calling myself a _designer_).

And finally, I retried Gatsby recently and completed a new design. It's not perfect. It's not well tested on older browsers. But it works, in a good enough way for me — I have already spent too much time on it.

I've also cut the dependency I had on GitHub Pages. I'm still using GitHub to host this website, but the workflow is separated and I'm free to use what I want.

**It's time to ship.**

---

More than just a simple redesign, I wanted to reboot the site to add a **portfolio**, a **resume**, a **documentation·codex·tutorials**, as well as a **photo** and **automation** sections. Of course, if I wanted to do it all, I would never have finished anything, so I just focused on a simple redesign at the time being, keeping in mind that the site would be expanded later.

The goal, in the end, is to do all that — if I'm motivated enough. A good start would be to publish new articles with a regular schedule.

---

Another thing that was ticking for this website was the "deprecation" of [HTTP by Chrome in an upcoming update](https://security.googleblog.com/2018/02/a-secure-web-is-here-to-stay.html). By deprecation, I mean that Chrome will show an "Unsecure" flag on non-HTTPS websites. HTTP will always work, but it will be relegated to a legacy protocol that nobody should continue to use.

I was in a hurry to complete this reboot before this update. I soft-launched the new site a few weeks ago, and tweaked it since. And now it's official.

---

To be a little bit exhaustive:

- I have 6 designs in Sketch files, plus a few more that I did directly in the browser.
- I did more than 50 logos. And I'm still not satisfied by the one I use now (it's not the best that I did, but I think it fits better with the layout and what I wanted to do). It's so hard to capture the essence of something personal. It's a blank canvas without any constraints.
- I tried 4 or 5 blog engines ([Jekyll][jekyll], [Metalsmith][metalsmith], [Gatsby][gatsby], [Hugo][hugo] and others). I even toyed with the idea of creating my own.

I'm so exhausted by this whole process and that's mainly why I'm so long to end this blog post. 😇

---

I hope you'll like it.

## Update <span class="more">18 October 2018</span>

I've renamed the site to simply "Matthieu Oger". The "brand" I was trying to create with the "Solar Sailer" name was not working at all. It's better to just drop it and use my name as of now. If you encounter a broken link somewhere, please [contact me](/about/).


[jekyll]: http://jekyllrb.com
[hugo]: https://gohugo.io
[metalsmith]: http://www.metalsmith.io
[gatsby]: https://www.gatsbyjs.org
