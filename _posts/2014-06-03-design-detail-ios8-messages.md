---
title: Design detail in iOS 8 Messages
---

One of the features that I wanted the most in iOS 8 was simple: _Add a "Use Last Photo Taken" button in the Messages app_ (along with the current "Take Photo or Video" and "Choose Existing").

<br />The idea was originally thought by [Neven Mrgan](http://mrgan.tumblr.com/post/12808983893/tweetbot-adds-last-photo-taken-feature) and later adopted by a lot of apps (Tweetbot, Slack, Droplr, etc.).

An example with Tweetbot 3:

![Use Last Photo Taken](https://farm4.staticflickr.com/3916/14336153925_c93fce6ac5_o.png)

But it was still missing in the one place where it would definitely shine: Messages.

<br />**No more.**

The way it was added is brilliant. It's so simple that I don't know why it hasn't been done already (it might, I just don't know of an app that have done that).

Here it is:

![iOS 8 Messages](https://farm3.staticflickr.com/2940/14149545550_cc16f54a07_o.png)

_It's not a button. It's a grid of three (or more) images._

It solves three problems:

1. You can use the last photo. 80% of the time, it's what you (and I) want to do.
2. You can see the last photo and be sure of what you are doing **BEFORE** doing it.

	With a button, the app had to provide a way to check the action.

	In Tweetbot, for example, the compose view shows a small thumbnail of the image.

	In Droplr, it's too late. As soon as you tap the button, the photo is uploaded and you have to delete it to fix your error.

3. You can use the last few photos too. Which might represent 80% of the last remaining use cases.

It's so simple and clever that once you have seen it, you can only think: _"Of course."_.
