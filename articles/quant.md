---
title: "Learning To Be A Quantitative Trader"
cardDescription: I built a full-stack automated trading platform.
cardPageLink: "/articles/quant"
# imagePath: "/assets/images/quant/ticker-reduce.gif"
imagePath: "/assets/images/quant/tickersgreen.gif"
author: Xavier Collantes
dateWritten: 2025-06-25
articleType: BLOG
tagIds:
  - thingsIBuilt
  - kubernetes
  - python
  - k3s
  - trading
  - stocks
  - finance
  - interests
  - automation
  - containers
  - grpc
  - raspberry-pi
---

![Green Forrest {priority}](/assets/images/quant/green.webp)

Since I was 9, I loved watching the green and red arrows on the screen when my dad
would watch Jim Cramer on CNBC. At the time I did not understand what colors
meant but I understood my dad's mood was good when the arrows were green, so I
hoped for green arrows (I still do today).

![Jim Cramer {priority} {h: 400}](/assets/images/quant/madmoney.webp)

###### Jim Cramer's "Mad Money", looking back I'm really not a fan 😂

Over time, I developed my own heuristics in trading stocks. I looked for
certain qualities and metrics in companies and used my savings to trade. After
years of experience as a Software Engineer, I decided to build my own trading
platform.



## Why

### Managing Emotions

> Investing is an easy game if you can manage your emotions.
>
> - Warren Buffett

When I was a child, I could tell how the markets affected my dad's mood. Anyone
who has traded stocks knows what I am talking about. Even if you own a single
share, your eyes are glued to the little line graph praying the price moves in
your favor.

![GOOG {h: 300}](/assets/images/quant/goog.webp)

According to my experience and common trading advice, this behavior is
dangerous. For example, in 2023, I was holding shares of Logitech (LOGI). The
stock dropped ~20% in a single day. An emotionally driven trader would have
sold their shares at a severe loss. But due to experience, I held. I saw the
drop was due to a new CEO which caused a lot of uncertainty. But I had bought
the stock due to above average earnings and a good balance sheet. A couple days
later, LOGI returned to its previous price. If I had sold, I would have missed
the bounce back.

<callout
  type="note"
  description="">
</callout>

### No Monthly Fees

Like many of the things I have built, I built this one for myself because I did
not want to pay for an existing trading platform.

SaaS products such as
[QuantConnect](https://www.quantconnect.com/pricing/?billing=mo)
costs $60 a month with
[StrategyQuant](https://strategyquant.com/pricing/) costing $269 a month.

_I could build software, so why not build my own?_

## Seeking Knowledge

There is an army of engineers who can write code to do exactly what I was
looking for. But the most important aspect of this project was the algorithms
behind the code. Many people can write code, setup infrastructure, and deploy
applications. Fewer people can write algorithms that are profitable. I was
looking for those in between who could do both.

### Experts

As my self-reflection included awareness of human compulsiveness, I also
realized my lack of experience as a trader. It was never my full time job nor
was I an expert. For such a weakness, the best answer is to learn from the best.
I used LinkedIn to find a trading mentor.

![Video Call Learning {h: 300}](/assets/images/quant/videocall.webp)

I did what today's version of cold-calling was which was to cold-message people
on LinkedIn whose profiles said they were trading equities, Quantitative
Analysts, or some variant of the title.

As expected, only a small fraction of the messages I sent were responded to,
about 10% (still pretty good for cold-calling I think). But I found
well-qualified people willing to hop on a call with me.

On the call, I had my questions prepared on different aspects such as capital
preservation, strategy, company valuation, and risk management.

In every case, the person I spoke with thought I was looking to shift my career
to trading. I was not. I was looking to learn from them and build my own
trading platform.

### Life Long Learning

During the Financial Crisis of 2008, one of my parents lost their job. It was a
difficult time for us as a family but we were financially stable because of my
parent's prowess in stock investing. It is this combination of knowledge and
wisdom they passed on to me which I wanted to refine and build on.

From an early age, I had an interest in investing and trading. Some early
inspirations include:

- My parents (despite being non-professional traders)
- [Intelligent
  Investor](https://www.amazon.com/Intelligent-Investor-Definitive-Investing-Essentials/dp/0060555661)
  by Benjamin Graham (very long read, I recommend jumping around)
- Several traders I met during my time at J.P. Morgan
- [Freakonomics](https://www.amazon.com/Freakonomics-Economist-Explores-Hidden-Everything/dp/0060731338)
  by Steven D. Levitt and Stephen J Dubner (I like their approach to measuring
  things)

## Key Features

After taking dozens of pages of notes from my new mentors, system design began.

### Real-time Market Monitoring

Need a source for low-latency market data.

## Architecture and Infrastructural Requirements

### High Dependability

For you SRE nerds out there, the programs running cannot be down for more than 2
minutes. A trading day is 6 hours and 30 minutes, so 7,230 minutes. 2 mins is
0.0027% of the day. So the system needs to have 99.9973% uptime.

To accomplish this, I setup alerts on Grafana to monitor the system.

### Extremely Low Latency

## Future Improvements

- Add more trading algorithms
- Add more notification channels
- Add more portfolio management features
- Add more health monitoring and logging
- Add more deployment benefits
- Add more deployment benefits

![I like the stock GIF {h: 400}](/assets/images/quant/ilikestock.gif)

![Inverse Cramer Meme {h: 600}](/assets/images/quant/pypl.webp)

![Cramer Meme {h: 500}](/assets/images/quant/cramer.webp)
