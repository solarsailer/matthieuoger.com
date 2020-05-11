---
date: "2020-05-11"
title: "The Component"
excerptQuote:
  name: "Tom MacWright"
  quote: "The emerging norm for web development is to build a React single-page application, with server rendering."
---

Guillermo Rauch in the “[Vercel](https://rauchg.com/2020/vercel)” announcement (previously _Zeit_):

> Today the most interesting new opportunities for modernization have shifted to the frontend. […]
>
> **Components Are the Right Primitive for the Frontend**
>
> As the demand for richer frontend experiences has grown, the pressure is for teams to deliver component and design systems - coherent frontend experiences across every platform. […]
>
> Not too long ago, people weren’t talking about components, they were talking about selector engines and the DOM. Then React […] introduced this primitive of the component. Other frameworks allow you to define components, but the movement that really pioneered this trend was React.
>
> Years ago, [we] created Next.js because of our belief that React was so powerful it could become the full engine for the frontend. We started Next.js to provide some critical new functionality to make React consumable for everyone who wanted to do **everything** with React, instead of just one specific component. We saw a demand for the component-based React approach to drive the full frontend experience.

I really love small, hyper-optimized websites with just the necessary bits ([I really enjoy reading people](https://macwright.org/2016/05/03/the-featherweight-website.html) [writing about this topic](https://paulstamatiou.com/about-this-website/)). I did that for years. This is how I taugh students.

But using React made me reevaluate my tradeoffs slightly[^1].

**Components** and [**declarative coding**](https://en.wikipedia.org/wiki/Declarative_programming) are such a better _programming model_. React is far from perfect, and some stuffs are way too complicated, but the basis is _right_. The foundations are _correct_.

---

Tom MacWright in “[Second-guessing the modern web](https://macwright.org/2020/05/10/spa-fatigue.html)”:

> The emerging norm for web development is to build a React single-page application, with server rendering. The two key elements of this architecture are something like:
>
> 1. The main UI is built & updated in JavaScript using React or something similar.
> 2. The backend is an API that that application makes requests against.
>
> […] There is a sweet spot of React: in moderately interactive interfaces. […] The high performance parts aren’t React. […] The low performance parts don’t need to be React. […]

<br />Later:

> Don’t read this as anti-React. I still think React is pretty great, and for a particular scope of use cases it’s the best tool you can find. […]
>
> But I’m at the point where you look at where the field is and what the alternatives are – taking a second look at unloved, unpopular, uncool things […] – and think _what the heck is happening_. We’re layering optimizations upon optimizations in order to get the SPA-like pattern to fit every use case, and I’m not sure that it is, well, worth it. […]
>
> Frameworks should lure people into the [pit of success](https://blog.codinghorror.com/falling-into-the-pit-of-success/), where following the normal rules and using normal techniques is the winning approach. […] I don’t think that React, in this context, really is that pit of success. A naïvely implemented React SPA isn’t stable, or efficient, and it doesn’t naturally scale to significant complexity.

Very true, unfortunately.

<br />After:

> I can, for example, guarantee that this blog is faster than any Gatsby blog (and much love to the Gatsby team) because there is nothing that a React static site can do that will make it faster than a non-React static site.

This is true. But perceptually, it's not necessarily the case nor that simple.[^2]

<br />Finally:

> I don’t think that everyone’s using the SPA pattern for no reason. For large corporations, it allows teams to work independently: the “frontend engineers” can “consume” “APIs” from teams that probably work in a different language and can only communicate through the hierarchy. For heavily interactive applications, it has real benefits in modularity, performance, and structure.

If I chose to build my new websites with Next.js or Gatsby, it's because working with styled-components and React is so much better, fun and faster. And the result can be great for the users too, _if done well_.[^3]

In the end, there's no good answer here. There are just many tradeoffs (accessibility, customer experience, speed, team collaboration, developer experience, bandwith, performances, etc.). And, as always in computing, there's no _“ideal solution”_.


[^1]: Not coding in my day-to-day job also changes my priorities. Creating websites is a hobby now (and was not the main focus of Pixelnest anyways), so I value my time and enjoyment much more.
[^2]: For example, this website is heavier, but feels faster than [Pixelnest](https://pixelnest.io/)'s. It's slower on first and initial uncached load, but after, it becomes faster — almost instant.
[^3]: Just imagining having to write BEM classes, put everything in big files, or repeat so much HTML would feel like going back ten years ago.

  I actually did that recently, and it was not horrible. But it becomes a mess much more quickly, especially if you are working with more junior developers. You need even more discipline and rigor. It's possible for a one-man website, but it can break quickly as you add more people on a project if the experience level differs a lot.
