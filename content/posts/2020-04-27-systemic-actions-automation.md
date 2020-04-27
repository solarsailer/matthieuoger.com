---
date: "2020-04-27"
title: "Systemic Actions through Automation"
excerpt: "Repeatability, robustness, shareability, mastery, documentability. That's automation, although at a bigger scope than just plain computer automation and scripting. That's why I like to be organized and to create systems in my life. It's a way for me to be consistent, coherent, efficient and meticulous. To care about what I do without putting more charge on me."
---

Brett Terpstra in “[Judging the value of automation][article]”:

> I enjoy the process of building automations in myriad contexts, using myriad tools. […]
>
> I often think about the benefits of automation in the context of time savings. It makes things more efficient, removes drudgery. But I’ve realized over time that the _real_ benefit of automation is avoiding mistakes.
>
> When I automate something (anything), I’m defining the steps that need to be included to complete the task. I’m no longer relying on my memory to ensure that every step is complete or the specific ways in which a step should be completed. This is especially useful if it’s something I don’t do very often […] if it helps me do the exact same thing one time a year later, that’s often worth as much as any amount of total time saved in my life.

**Exactly!** Avoiding mistakes is much more important than any time-saving[^1]. Automation removes the need to remember what you need to do, and simplify the sharing of knowledge. It's basically a _self-fulfilling [checklist][book]_ that can be triggered by anybody.

Let me digress a bit with a few examples and principles. I'm by no mean perfect, but this is how I'm trying to improve.

---

When I was developing a new website for [Pixelnest Studio](https://pixelnest.io/), the first step was setuping the project, and automating the deployment, so that I could come back 6 months later and still be able to deploy easily without reading the README or the code.

For [Steredenn](http://steredenn.pixelnest.io), I created a lot of scripts to automate the release pipeline (building the game, packaging it, creating the different changelogs for the multiple platforms, etc.). This took me a non-negligible amount of time, but when I needed to do a new release after a long hiatus, it was a breeze and such a relief. Bonus: my associate could also do it in case I was not here, without having to dive in the code or knowing the full process.[^2] In the game itself, [Damien](https://dmayance.com/) spent time creating little tools and helpers to go to a specific part of the game easily, so we could test different configurations and situations at will. _The result? A better, more stable game. Less mistakes. More time._

I maintain a personal repository with [most of my non-app scripts](https://github.com/solarsailer/dotfiles/) on GitHub, and one of my most treasured part is a procedure to boostrap a new macOS installation in a semi-automated fashion. I don't do that often, but I know that I can confidently reproduce a new environment (in case of loss or theft) without a lot of struggle.

I tried to put most of the settings of my apps (Alfred, iTerm2, Dash, etc.) on a cloud provider, so that I can share them between computers and have a backup (it's actually one of my selection criteria when I try a new tool — "can I sync the settings easily?"). The tools are tailored to my use, and I don't have to customize them again.

I automated and documented our servers installation so that I could nuke and reinstantiate them easily. I'm not an experienced sysadmin at all, so having this ability to restart from scratch was a godsend to me.

It's not pure automation, but it falls in the same ballpark for me. **It's emptying your brain so that you can focus on what you care.** _And, bonus, it's fun to do!_

---

As a different example: I scan and store all my documents online (pro or perso). When I'm asked for something (passport? last phone bill?), I take my phone, get the document and send it or print it directly.

It's a really simple process: when I receive a paper, I quickly look at the document, _decide if I keep it or not_ (if not, it's direct in the trash), then launch Scanbot, OCR it and boom it's stored in the right place. It has just become automatic for me now. It takes me literally 10s. And this has saved me so. much. time, as well as prevented the loss of important stuffs. _It would have been easier to just put that doc on a shelf and never care about it anymore_, sure. But then, when you search for a new flat, and need to find those twenty docs, you will thank yourself.

It was **always more effort initially**, and we, humans, don't like effort. _But being a good slacker is not about doing nothing, it's actually doing more at the beginning, so you can do less later._ And that's what computers are good at too!

---

That's also a reason why I love checklists so much. **Checklists are the manual version of automation**: you write it, you duplicate it, you cross it, and you forget it.

Checklists are _also cheap and easy-to-write documentation_ — for you, your family, your friends, your coworkers.[^3]

---

In computing (and life in general), there are a few principles that I consider extremely important:

- **Repeatability**: repeat a task in a predictable manner and efficiently without dreading it;
- **Robustness**: ensure you are doing the right steps and actions all the time, consistently;
- **Shareability**: share information painlessly with other people, and more importantly, your future-self;[^4]
- **Mastery**: learn your tools, the shortcuts, and the customization points. Dive in the menus, try everything. This is physical automation: you train your body to repeat stuffs quickly without thinking about it.[^5] You save time, you reduce mistakes, you get better;
- **Documentability**: enrich your knowledge base constantly - that is vitally important. Document what you do and why.[^6] Take notes, create a task in your todo apps to not forget something important. Offload your mind and find any information in no time.[^7]

That's automation, although at a bigger scope than just plain computer automation and scripting. That's why I like to be organized and to create systems[^8] in my life[^9] (and not only on my computers). It's a way for me to be consistent, coherent, efficient and meticulous. To care about what I do without putting more charge on me.

_And to be able to **lose my time** on the areas where it provides me joy._


[article]: https://brettterpstra.com/2020/03/16/judging-the-value-of-automation/
[book]: http://atulgawande.com/book/the-checklist-manifesto/

[^1]: Which is still a really nice perk — we shouldn't diminish that property.
[^2]: Don't get me wrong: it was not perfect. Some steps were still manual and I could have automated them, but there's a point where a good ol' checklist is enough and automating becomes a burden. However, if it's manual, **it needs to be documented**. Hence, generally, a checklist.
[^3]: You go on a trip? Write your packing checklist. Quickly scan it before leaving a place — you won't lose anything.
[^4]: That can be a script, a documentation, or a process. That's why, when I find an important information, I store it ASAP in my Dropbox so I can come back to it later. That's also why I'm blogging: to keep the relevant articles I found right at my fingertips. That's, finally, why I love scripting: I don't want to memorize how I need to execute an action — it's more mistakes later, and less predictability. It's also a source of examples for future-me.
[^5]: That's why automation-freaks enjoy [text expansion](https://textexpander.com/) so much. But it can also be optimizing your commute route, or always putting stuffs at the same place in your flat so you don't have to think to locate them.
[^6]: This article showed that I like anecdotes. Here's another: when you have a company in France, you need to do something called "l'approbation des comptes" every year. It's boring, complex, and prone to mistakes. The first time I did it, I noted all the steps I needed to do while I was learning to do it. The next year, it — obviously — happened again, and I didn't have any clue about what I did. I remembered taking the notes, look at them, and in almost no time, was able to do it again. I could have learned once more, but this would have been a big waste a time, and a big chore. Instead, it was just a minor annoyance.
[^7]: If I hear someone talking about a thing they like, I note it. Later, when I need to find a gift, I can look at the list and pick there. It is not always useful, nor something you can do rightaway… but people are so happy when you give them something they actually truly wanted. It's also less waste.
[^8]: [Tim Urban](https://youtu.be/lIW5jBrrsS0?t=857):
  > This also just speaks to the power of habits, because, changing a habit is like overwriting your current software, and if you do it enough time, what's cool about your brain is, it rewrites it to accommodate the new behaviour. You're saying "oh, I guess we are doing this everyday now?".
[^9]: Or as someone said: "have a reset button for my apartment". Everything has a spot, and in the mornings, when you wake up, you put everything back to its rightful place. It's always the same, it's easy to clean, it's easy to find if something's missing. **It does not preclude change, but change should be desired and aware, not the byproduct of chaos.**
