---
title: Raspberry Pi Motion Camera
cardDescription: Homemade internet-of-things private cloud motion-detecting camera.
cardPageLink: "/articles/rpi-camera"
author: Xavier Collantes
articleType: BLOG
imagePath: "/assets/images/rpi_camera/sample.gif"
tagIds: ["electronics", "iot", "python"]
---

## A homemade solution

![Video sample {priority}](/assets/images/rpi_camera/sample.gif)

_Why not just buy a system?_

I was browsing for a motion detection camera and found products such as the
Amazon Ring, Google Home, and Blink. As a privacy conscious person, I didn't
want to hand over personal home video to large tech companies.

_"I could do that!"_

As I researched the available technologies, I found the challenge interesting.
Homebrew options existed for a motion detection camera but I wanted
functionality close to what existed commercially. The challenge would not be
creating my own software for a motion detector but **integrating** several
existing technologies to achieve my requirements.

![{h: 300}](/assets/images/rpi_camera/zucc.webp)

There were many challenges such as:

- How to make the video application start on Raspberry Pi power up -> By
  creating a cron job to run on startup
- Deciding which cloud storage I trusted enough -> I went with the free tier for
  zero-trust pCloud
- What threshold settings to use -> I experimented with my specfiic setting
  given the lights

![Challenges gif](/assets/images/rpi_camera/blurry.gif)

_Example where video was triggered by movement of the sun. The settings were too
sensitive since the sun's light would change too many pixels which resulted in
triggering the video._

## Requirements

My research started with existing platforms and noting which features I needed.
Then I stack-ranked the functionalities by priority. Here is the final list of
functionalities by priority:

- Must have ability to capture video on motion
  - Continuous capture of video would create massive amounts of video which
    would be difficult to sift through
- Must have zero-knowledge upload of media
  - Data is uploaded, downloaded, and edited with access only to the user
  - The cloud provider has no access to the media stored (Proton.me, ["Zero
    Knowledge Cloud
    Storage"](https://proton.me/article/zero-knowledge-cloud-storage))
- Must be able to run continuously for months
- Should NOT cost more than a conventional system
  - $150 as limit since this would cover monthly costs and initial costs
- Should NOT pay a monthly fee
  - Cloud providers potentially charge a monthly fee but free options exist
- Would be nice to have auto delete of oldest videos
  - Otherwise, videos on cloud provider must be reviewed and deleted manually to
    save space

## How it works

### Software

![{h: 100}](/assets/images/rpi_camera/rclone.svg)

My solution, MoCam, is an implementation of
[motion-project.github.io](https://motion-project.github.io). I combined the
capabilities of The Motion Project to run a camera on a Raspberry Pi or any
Linux OS with [Rclone](https://rclone.org) to securely upload videos and images
to a encrypted end-to-end cloud provider.

GitHub code repository: [github.com/xcollantes/mocam](https://github.com/xcollantes/mocam)

Getting started: [MoCam
README](https://github.com/xcollantes/mocam/blob/master/README.md)

### Hardware

Required hardware is a Raspberry Pi, preferably at least 2 GB of RAM since
processing the video puts strain on the machine. Lower RAM machines were not
tested such as the Raspberry Pico.

![{h: 200}](/assets/images/rpi_camera/rpi.webp)

A camera is also needed. I found the best results with a USB camera since it's
fairly easy to setup as well. There is a Raspberry Pis Module Camera
specifically meant for the Raspberry Pi but I did not have this at the time.
Here's an example of a compatible USB camera on
[Amazon](https://a.co/d/gr5Srno).

In the project, I found some pitfalls with the camera, detailed in ["Common
pitfalls"](https://github.com/xcollantes/mocam/blob/master/README.md#common-pitfalls).
There are some commands needed to find the ID of the camera as this is needed
for the Docker image.

![{h: 200}](/assets/images/rpi_camera/usb_camera.webp)
