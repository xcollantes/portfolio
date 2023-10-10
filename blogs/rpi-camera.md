---
title: Raspberry Pi motion camera
cardDescription: Homemade internet-of-things private cloud connected motion-detecting camera.
cardPageLink: ""
imagePath: ""
tagIds: ["electronics", "iot", "python"]
---

## A homemade solution

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

## Requirements

My research started with existing platforms and 


## How it works

My solution, MoCam, is an implementation of
[motion-project.github.io](https://motion-project.github.io). I combined the
capabilities of Motion Project to run a camera on a Raspberry Pi or any Linux OS
with Rclone to securely upload videos and images to a encrypted end-to-end cloud
provider.

## GitHub code repository

https://github.com/xcollantes/mocam
