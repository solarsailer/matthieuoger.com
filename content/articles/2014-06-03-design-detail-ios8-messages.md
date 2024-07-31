---
date: "2014-06-03"
title: "Design Detail in iOS 8 Messages"
excerpt: "One of the features that I wanted the most in iOS 8 was simple: Add a “Use Last Photo Taken” button in the Messages app."
---

One of the features that I wanted the most in iOS 8 was simple: add a _“Use Last Photo Taken”_ button in the Messages app (along with the current "Take Photo or Video" and "Choose Existing").

---

The idea was originally thought by [Neven Mrgan](http://mrgan.tumblr.com/post/12808983893/tweetbot-adds-last-photo-taken-feature) and later adopted by a lot of apps (Tweetbot, Slack, Droplr, etc.).

<figure>
    <img
    src="/images/posts/2014-06-03-picker-tweetbot.png"
    alt="Use “Last Photo Taken” in the Image Picker of Tweetbot 3"
    title="Use “Last Photo Taken”"
  >
  <figcaption>Example: the Image Picker from Tweetbot 3.</figcaption>
</figure>

But it was still missing in the one place where it would definitely shine: Messages.

**No more.**

---

The way it was added is brilliant. It's so simple that I don't know why it hasn't been done already (it might, I just don't know of an app that have done that).

Here it is:

<figure>
  <img
    src="/images/posts/2014-06-03-picker-8.png"
    alt="Image Picker in iOS 8 Messages app"
    title="iOS 8 Messages"
  >
  <figcaption>It's not a button. It's a grid of three (or more) images.</figcaption>
</figure>

It solves three problems:

1. You can use the last photo. 80% of the time, it's what you (and I) want to do.
2. You can see the last photo and be sure of what you are doing **BEFORE** doing it.

	With a button, the app had to provide a way to check the action.

	In Tweetbot, for example, the compose view shows a small thumbnail of the image.

	In Droplr, it's too late. As soon as you tap the button, the photo is uploaded and you have to delete it to fix your error.

3. You can use the last few photos too. Which might represent 80% of the last remaining use cases.

It's so simple and clever that once you have seen it, you can only think: _"Of course."_.
