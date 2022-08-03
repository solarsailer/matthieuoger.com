---
date: "2022-08-03"
title: "Playbooks"
excerptQuote:
  name: "Jacob Kaplan-Moss"
  quote: "Playbooks are the middle ground I reach for [when automating something complex]. When I see a process like this, instead of either doing nothing or just diving in and writing some code, I’ll first write a playbook. A playbook is nothing more than a set of instructions for performing the task – a “recipe” if you will. […] This gets a few steps closer to the goals of automation – consistency, repeatability, reliability – at a fraction of the effort."
---

Gabriel Weatherhead in “[Playbooks Before Automation][article]”:

> I’m not a professional engineer but this is something I naturally do _for anything that takes more than a half dozen steps_. […] While I was toiling away in [Excel] I wrote down what I was doing in a note.
>
> By the time I was done I had repeatable instructions for myself. **Clear steps make automation easier and a lot more fun.**

<small>(Emphasis mine)</small>

I think **Playbook** is a really good word to describe this habit.

I tended to use "[Checklist][checklist]" instead, but I do think **Playbook** encapsulates this concept way better. You are not writing tasks to perform mindlessly, but you are also giving context[^1], warnings and _the story_.[^2]

---

Gabriel is also quoting [another excellent article][article2], by Jacob Kaplan-Moss:

> **Write playbooks before automation** […]
>
> We _know_ that writing some code to automate a process isn’t necessarily as easy as we’d like it to be; but we also _know_ that the process is complex, error-prone, messy, or otherwise not great to leave as a manual process.
>
> **_Playbooks_ are the middle ground I reach for in these circumstances**. When I see a process like this, instead of either doing nothing or just diving in and writing some code, I’ll first write a playbook. A playbook is nothing more than a set of instructions for performing the task – a “recipe” if you will. The key is to be as specific as possible. If this is some sort of task that involves code, you can even include bits of code or shell commands that someone following the playbook could copy and paste.
>
> **This gets a few steps closer to the goals of automation – consistency, repeatability, reliability – at a fraction of the effort**. And, if you later decide that automation is worth the effort, the playbook serves as a detailed specification for your code.

<small>(Emphasis mine)</small>


[^1]: Context.

  It might be one of the words I use the most nowadays. _"Always give the context", "Start with context", "Can you give me the context again?"._

  Why? Because not having the context is like shooting in the dark. You can perform your task, but it will likely be wrong because you don't understand everything around it. If you are interested, [this book is an illuminating read][book] on this topic.

[^2]: When I explain why I do this, I often say "I'm helping _Matthieu-du-futur_". It takes only a few very short seconds now, and saves hours of frustration and guesswork later.

[article]: https://www.macdrifter.com/2021/11/playbooks-before-automation.html
[article2]: https://jacobian.org/2021/oct/20/simple-pm-tricks/
[checklist]: https://matthieuoger.com/2020/04/systemic-actions-automation/
[book]: https://www.amazon.fr/Art-Action-Leaders-between-Actions/dp/1857885597
