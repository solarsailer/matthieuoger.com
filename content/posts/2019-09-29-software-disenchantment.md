---
date: "2019-09-29"
title: "Software Disenchantment"
excerptQuote:
  name: "Nikita"
  quote: "So everything is just a pile of barely working code added on top of previously written barely working code. It keeps growing in size and complexity, diminishing any chance for a change. To have a healthy ecosystem you need to go back and revisit. You need to occasionally throw stuff away and replace it with better stuff."
---

Nikita in “[Software disenchantment](https://tonsky.me/blog/disenchantment/)”:

> So everything is just a pile of barely working code added on top of previously written barely working code. It keeps growing in size and complexity, diminishing any chance for a change.
>
> To have a healthy ecosystem you _need_ to go back and revisit. You _need_ to occasionally throw stuff away and replace it with better stuff.

<small>See also: “[The Sad State Of Web App Deployment](https://matthieuoger.com/2015/10/sad-state-web-deployment/)” and “[Something Slightly Less Terrible](https://matthieuoger.com/2015/01/something-slightly-less-terrible/)”.</small>

---

I think the article is a bit short-sighted, and even wrong on some points: there's a difference between today's software and the one from 10 or 15 years ago — we **do** have progress. _But the overall sentiment is fundamentally correct._

Something is broken, and that's probably because we are [still using code to build software](https://matthieuoger.com/2019/09/what-will-happen-to-code/).

There's also a slight contradiction when he says we need to delete code, but still need to be able to run things from twenty years ago. If we were more thoughtful with what we build, it could be possible, but to keep a sane and manageable codebase in our current world, we need to accept that we will lose compatibility and devices over time.[^1]

---

> That is not engineering. That’s just lazy programming. Engineering is understanding performance, structure, limits of what you build, deeply. Combining poorly written stuff with more poorly written stuff goes strictly against that. To progress, we need to understand what and why are we doing.

I'm also guilty of that. Look, this website uses [Gatsby](https://www.gatsbyjs.org) to generate a few static pages, and this requires 242M of dependencies to build it (not run it, hopefully).

However, the result is extremely fast and satisfying for the user, and the developer experience is top-notch, at the expense of an increase in size of the exported bundle on initial (and uncached) load. Is this a reasonable tradeoff?

---

At the end:

> Business won’t care. Neither will users. They are only learned to expect what we can provide. We (engineers) say every Android app takes 350 MB? Ok, they’ll live with that. We say we can’t give them smooth scrolling? Ok, they’ll live with a phone that stutter. We say “if it doesn’t work, reboot”? They’ll reboot. After all, they have no choice.
>
> There’s no competition either. Everybody is building the same slow, bloated, unreliable products. Occasional jump forward in quality does bring competitive advantage (iPhone/iOS vs other smartphones, Chrome vs other browsers) and forces everybody to regroup, but not for long.
>
> So it’s our mission as engineers to show the world what’s possible with today’s computers in terms of performance, reliability, quality, usability. If we care, people will learn. And there’s nobody but us to show them that it’s very much possible. If only we care.

On this, I don't completely agree. Yes, in general, people are mostly stuck with what we provide, but users are way too forgiving, and most of the time, don't even see the quality problem[^2] — only a fraction perceives it.[^3] Even engineers working on products don't necessarily see that something's wrong. How many engineers don't care about design, visual consistency, coherence, and speed, for example?[^4] How many don't see that their users are struggling?

But there's a choice to be made by users: choose carefully, invest and learn, accept to spend a bit more on something better and more durable, change less often, and don't restrict yourself to the most ugly and cheap solution all the time, just because that was the first and easy choice.

[^1]: That's a shame and such a waste, though. I don't know if we can do better with our current tools.
[^2]: Case in point: Windows is still a complete mess — the average bar of software quality on this platform is abysmal, and most people are completely okay with that — they don't even care. The only thing that raised the bar on Windows is Electron apps, and these came with their own set of tradeoffs, and are almost universally considered as subpar and second-tier citizens on other OSes. _It's a vicious cycle: if the platform owner doesn't care, the developers won't care, thus the users too._
[^3]: This, though, poses another question: should we care about high quality if it doesn't matter for 80% of the users? I do think we should and I'm happy we still have craftsmanship in this world, but maybe it's only us, designers and nerds, that spend too much time pondering about that.
[^4]: And it's a bit easy to say this without knowing the business constraints. Our society pushes for fast at the expense of doing things right and correctly — by _taking the time_. This gives us progress at an incredible and ruthless pace, but also a ton of waste.
