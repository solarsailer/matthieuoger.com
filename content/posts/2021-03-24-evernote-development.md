---
date: "2021-03-24"
title: "Notes from Evernote Early-Development"
excerptQuote:
  name: "Phil Libin"
  quote: "How fast can you do each iteration? […] We could make a product pretty good faster than I ever thought possible before. […] Very few people can articulate and have the power of imagination to envision what they actually want. […] We don't ask customers what they want, we ask customers to respond to what we are giving them. […] What is too much to build and what is just the right amount? How do we know?"
---

I was recently listening to [an interview of Phil Libin][podcast], co-founder of Evernote. [Tonsky wrote a recap][tonsky] covering the best parts (notably about the startup model, culture and diversity issues), that I recommend.

In addition, focusing on the product management side of the interview, I wanted to highlight a few paragraphs.[^1]

## Iterations

::: blockquote transcript
We kind of figured out what really felt like a cheat code. […]

Let's say it takes 10.000 iterations to make a product great. You have to keep polishing, to keep refining and it takes around 10.000 iterations. **The whole point is: how fast can you do each iteration?**

At my previous company [dealing with security software, bank, government, etc.] _it would literally take a year and a half to do an iteration_. [You were making] some software, [sell it to an entity], deploy it, [deal with pilots], have a formal feedback. If it's gonna take a year and a half to make improvements to the product and you need to make 10.000 iterations, it's **fifteen thousand years** to make a great product. You just don't have this kind of time.

At Evernote […] an iteration was twenty minutes, because we would just make something — and then, if we were honest with ourselves —, we could say "does this feel better or worse than it did twenty minutes ago?". And so, by having this really fast, really tight iteration loops […] we could just move really really quickly. **We could make a product pretty good faster than I ever thought possible before.**
:::

And, as a consequence, the time to make a product _great_ (not just "pretty good") is also reduced.

One note though: we need to be careful not to confuse "speed of iteration" with "velocity". 

"Iteration" is your ability to experiment and refine a feature. You can iterate a lot but just release a very few impactful features (which is good). To the contrary, you can iterate slowly and output a lof of very low value, unpolished and mediocre features.[^2]

Speed of iteration is important.[^3] Meaningless velocity is not. It's more debt, it's harder to maintain, and it results in more complex products for users.

See “[Stop Obsessing Over Development Velocity, Focus on This Instead][velocity]” for a good "factual" overview.

## User feedback

::: blockquote transcript
It isn't so much that we didn't listen to our users. We listened to our users very carefully but in a very specific way. We listened to how they were reacting to what we were putting in front of them. We **weren't** asking them about what they wanted. […]

If you ask users what they want, they are not gonna tell you what they want because they don't know. **Very few people can articulate and have the power of imagination to envision what they actually want.**

If you ask customers or prospective customers what they want, they'll tell you the stuff that they expect… and _very rarely will that actually be what they want_. [Then, he quotes Henry Ford famous line: “If I had asked people what they wanted, they would have said faster horses.”]. We don't ask customers what they want, we ask customers to respond to what we are giving them. Because then, it's much more useful: you can tell when people are confused, when they are happy, when they are satisfied and then we can decide who to ignore, which opinion to take seriously, etc.
:::

This is one of the topics I'm coming back to frequently in my job. 

How can you gather as much feedback as possible, while not becoming crushed by its weight or clients' expectations?

Moreover, collecting the feedback is only one side of the coin (and the easy one). The second side is _how to digest it properly_. There, you discover that the product manager's toolkit is, unfortunately, very empty.[^4]

Users feedback are _critically important insights_, but it should be seen as an additional knowledge base for future decisions and hypotheses. Not as something you must respond to — or worse, act on — constantly.[^5]

See also “[Build with users][linear]” from the Linear method.

## Building the right set of functionalities

::: blockquote transcript
[About Evernote] I think we just did too much stuff. There's always this balance of “what's the right amount of focus?”.

It's hard to know in the moment… you can only do that in hindsight — if you succeed, you had the right amount of focus. If you don't, then you are either doing too much stuff, and you didn't have that focus, or not enough stuff, and you weren't thinking big enough or whatever.

We always struggle with that balance. What is too much to build and what is just the right amount? How do we know? […] In hindsight, I would have worked for longer on some specific things before moving on to introduce [new features].
:::

This reminds me of a comment made by a candidate during an interview: _“One crucial part of a product manager's job is not about which features should be included, but which one should be removed or ignored”_ (paraphrasing).


[^1]: I slightly edited Phil Libin's speech to make it more readable in a written form. Emphasis is also mine.
[^2]: Unfortunately, most agile teams using Scrum are optimised toward extreme-velocity instead of their ability to experiment and iterate quickly. Which is not what agile was about initially. I blame consulting firms.
[^3]: It's why we need to be able to deploy often, quickly, automatically, and confidently. It's also why the [_development pipeline loop_][iop] should be as short as possible, between typing the code and observing the results.
[^4]: I've searched for many, _many_ tools to handle feedback. I didn't find one that was 100% satisfying. At this point, I'm considering there is no "right" solution to this problem.

  The most adequate tool is probably a generic data-visualisation or log processing platform like Kibana or Datadog. Tools that were not conceived for this problem specifically, but instead to digest, process, present and search raw data in quantity. Which is what user feedback is: information logs, but provided by users instead of machines.

  See it similarly to an analytics tool: you would consult the platform everyday to have an overview of your users, how they feel about your product, and what they expect. Use that as additional data for experiments and ideas. When you look at analytics, you don't act immediately, and you cannot answer questions there. You use this trove of data to refine your hypotheses. Feedback should be seen the same way.
  
  Using this approach would also remove the emotion from the equation. It would allow the product manager to take a step back and look at all this knowledge objectively… like analytics. 
  
  And for qualitative measures? Just run some real-life user tests and sessions.
[^5]: I think there's something profoundly wrong in the B2B (less so in B2C) world, where clients expect to have answers to everything they ask or want.


[podcast]: https://www.inc.com/christine-lagorio/phil-libin-evernote-what-i-know-podcast.html
[tonsky]: https://tonsky.me/blog/phil-libin/
[velocity]: https://itamargilad.com/velocity-vs-impact/
[iop]: https://www.youtube.com/watch?v=PUv66718DII
[linear]: https://linear.app/method/build-with-users