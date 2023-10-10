---
title: Raspberry Pi motion camera
cardDescription: Homemade internet-of-things private cloud connected motion-detecting camera.
cardPageLink: "/blogs/rpi-camera"
imagePath: ""
tagIds: ["electronics", "iot", "python"]
---

## A homemade solution

_Why not just buy a system?_

I was browsing for a motion detection camera and found products such as the
Amazon Ring, Google Home, and Blink. As a privacy conscious person, I didn't
want to hand over personal home video to large tech companies.

\# TODO: Add video screenshot

![{priority}]()

_"I could do that!"_

As I researched the available technologies, I found the challenge interesting.
Homebrew options existed for a motion detection camera but I wanted
functionality close to what existed commercially. The challenge would not be
creating my own software for a motion detector but **integrating** several
existing technologies to achieve my requirements.

![](/blogs/images/rpi_camera/zucc.webp)

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
    Storage"](https://proton.me/blog/zero-knowledge-cloud-storage))
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

![](/blogs/images/rpi_camera/rclone.svg)

My solution, MoCam, is an implementation of
[motion-project.github.io](https://motion-project.github.io). I combined the
capabilities of The Motion Project to run a camera on a Raspberry Pi or any
Linux OS with [Rclone](https://rclone.org) to securely upload videos and images
to a encrypted end-to-end cloud provider.

### Hardware

![](/blogs/images/rpi_camera/rpi.webp)

## GitHub code repository

[github.com/xcollantes/mocam](https://github.com/xcollantes/mocam)

Getting started: [MoCam README](https://github.com/xcollantes/portfolio/blob/main/README.md)
