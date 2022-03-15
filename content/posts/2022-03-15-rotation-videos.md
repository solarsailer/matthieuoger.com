---
date: "2022-03-15"
title: "Pseudo-intelligent rotation lock for videos on iOS"
excerpt: "Use a Shortcut automation to intelligently toggle the rotation lock while playing videos in some apps."
---

iOS is missing one major, albeit a very small one in size, feature.

You can use a rotation lock for your device, which restricts its ability to change orientation. By default, an iPhone senses when it is in landscape or portrait. This was one of the key features during the iPhone introduction (using an accelerometer). It looks very cool, but in reality, it's almost useless on a phone.

Most users are just using the portrait mode all the time, and the landscape orientation is often toggled by accident while in bed or couch.

That's why many users are activating the rotation lock permanently (I'm in this category). This is how it looks like:

<p><img src="/images/posts/2022-03-15-lock.jpg" style="max-width: 300px;" title="Rotation lock" alt="Rotation lock" /></p>

When it's active (like in the screenshot above), your device will never rotate automagically. You can stay in portrait orientation forever.

**This is perfect, except for one thing: videos**. Videos are the only thing you want to see in landscape, not portrait.[^1]

Since tons of videos are consumed through YouTube, the problem is particularly egregious there. Fortunately, YouTube added a way to switch a video to landscape, even when in portrait orientation (by using the fullscreen button), locked or not.

It's not as practical as _physically_ rotating the phone though.

---

A few years ago, iOS' built-in [Shortcuts](https://apps.apple.com/us/app/shortcuts/id915249334)[^2] app added "Automation" triggers.

With this, you can program an action when something happens on your phone. For example, if you open a certain app, you can automatically trigger something… **like enabling or disabling the orientation lock!** You can see where we are going…

1. Open [Shortcuts](shortcuts://) <small>(it should be installed by default now)</small>
2. Go to the Automation tab
3. Create 2 automations:
   1. The first one is for when some apps are opened (**disabling** the rotation lock)
   2. The second does the reverse, when the same apps are closed (**enabling** the rotation lock again)
4. Obviously, set it to YouTube (and any other app necessary)

You should have this by the end:

<p><img src="/images/posts/2022-03-15-automation.jpg" style="max-width: 600px;" title="Automations" alt="Automations" /></p>

Thanks to this automation, I keep the rotation lock activated all the time, but still physically rotate my device to play videos in landscape.

_This trick is not new at all._ It was feasible since iOS 13 or 14, so why am I talking about this? Until now, everytime the trigger would activate, iOS would throw an annoying notification:

<p><img src="/images/posts/2022-03-15-notification.jpg" style="max-width: 300px;" title="Notification" alt="Notification" /></p>

Because of that, I could never recommend this tip to anyone. However, today [Apple released iOS 15.4](https://www.macstories.net/stories/ios-and-ipados-15-4-hands-on-with-universal-control-face-id-with-a-mask-and-more/), which finally **allows an automation to hide its notification**.

<br />Now, let's hope for a real “[Lock orientation except when playing videos](https://twitter.com/laughingquoll/status/1107930149645742080)” setting.

[^1]: Well, portrait videos are becoming a thing thanks to TikTok and modern social networks, but that's another matter.
[^2]: Shortcuts, previously Workflow, was bought by Apple and integrated into the system as its native automation app for power users. It's great.
