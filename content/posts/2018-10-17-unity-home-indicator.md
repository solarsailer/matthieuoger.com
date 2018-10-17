---
date: "2018-10-17"

title: "Unity and iPhone X's home indicator"

excerpt: ""
---

<blockquote class="tldr">
  <p>Check the <code>Bottom</code> option for "Defer system gestures on edges" in the <code>Edit → Project Settings → Player</code> menu of Unity to make the iPhone X's home indicator less visible and obtrusive in a game.</p>
</blockquote>

---

We are porting [Steredenn: Binary Stars](http://steredenn.pixelnest.io/) to iOS right now, and with the port comes the support for the iPhone X new form factor (yes, it's a bit late, I know…).

When trying the game on an iPhone X, I was not happy with the way the home indicator was always visible, distracting the user while playing Steredenn. I looked at other games and saw that it was possible to change its behavior.

However, it was not really clear how to do that with Unity, so I hope this will help others.

## Home indicator?

Since the iPhone X, the mechanism to go back to the home screen has changed on iOS. You have to swipe from the bottom of the screen, which puts the app back inside its icon.

By default, at the bottom (where the chin was), the home indicator is **always visible** in an app. It's the black bar you can see on this screenshot:

![Home indicator default state](/images/posts/2018-10-17/home-indicator.jpg)

For the moment, it's a permanent indicator if the app does not specify a different behavior.[^1]

See what it does in action:

<figure>
  <video src="/images/posts/2018-10-17/action.mp4" width="221.5" height="480" controls muted loop>
    Your browser doesn't support videos. You can download it below.
  </video>
  <figcaption>
    Using the home indicator (<a href="/images/posts/2018-10-17/action.mp4">download video</a>).
  </figcaption>
</figure>

It's a thoughtful UI that follows the finger precisely. With the haptic feedback, it's actually very nice to play with.

## Changing the behavior in Unity

However, this (default) behavior is not great for games. It's too bright and it hides a small portion of the bottom part of the screen. Which can be confusing in games like Steredenn, where many things are displayed at the same time.

![Home indicator in Steredenn](/images/posts/2018-10-17/steredenn.jpg)

Fortunately, Unity (well, technically, it's iOS) provides 2 ways to change the home indicator. Obviously with Unity, the correct one is not the one you would expect.

You can find these settings by following this procedure:

1. Go to `Edit → Project Settings → Player`.

![Open the Player's settings](/images/posts/2018-10-17/unity-01.jpg)

2. Then, click on the iOS tab, and find the "Other Settings" area.

![Find "Other Settings"](/images/posts/2018-10-17/unity-02.jpg)

3. Finally, we are interested in 2 settings: "Hide home button on iPhone X" and "Defer system gestures on edges".

!["Hide home button on iPhone X" and "Defer system gestures on edges"](/images/posts/2018-10-17/unity-03.jpg)

## "Hide home button on iPhone X"

"Hide home button on iPhone X", the one that looks like what we want, is, of course, the _wrong one_.

This setting hides the home indicator after a certain inactivity delay. If the user taps on the screen, the home indicator appears again in its full bright glory. In a game, where you will tap all the time, it's the same as showing the indicator permanently.

Note that this setting can be useful sometimes. For example, if you are doing a video player, or a game that does not require user inputs often, this is what you want. I think there is ways to toggle this behavior when needed.

This is what YouTube does, for example (it's hard to see cos' the home indicator is black here, but look at the bottom):

<figure>
  <video src="/images/posts/2018-10-17/hide.mp4" controls muted loop>
    Your browser doesn't support videos. You can download it below.
  </video>
  <figcaption>
    "Hide home button on iPhone X" (<a href="/images/posts/2018-10-17/hide.mp4">download video</a>).
  </figcaption>
</figure>

## "Defer system gestures on edges"

As you have guessed now, this is the setting we need.

It does two things:

- The home indicator opacity is reduced, which makes it less bright. Perfect.
- To go back to the home screen, you have to do the gesture twice. This is also nice, since it prevents accidental gestures.

The "bottom" checkbox is enough if you only want to change the home indicator behavior. The other checkboxes can be used for Control Center and other gestures on iPad, I think.

This is what Alto's Adventure does, as well as Steredenn:

<figure>
  <video src="/images/posts/2018-10-17/defer.mp4" controls muted loop>
    Your browser doesn't support videos. You can download it below.
  </video>
  <figcaption>
    "Defer system gestures on edges" (<a href="/images/posts/2018-10-17/defer.mp4">download video</a>).
  </figcaption>
</figure>


[^1]:  I think it will be hidden or removed in a future version of iOS when the behavior will be accepted by most people. Currently, it's a nice affordance and the space it takes is necessary while the users are getting used to it.
