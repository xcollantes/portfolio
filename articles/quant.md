---
title: "Quantitative Trading Platform: Engineered by Me"
cardDescription: I built an automated trading platform.
cardPageLink: "/articles/quant"
# imagePath: "/assets/images/quant/ticker-reduce.gif"
imagePath: "/assets/images/quant/tickersgreen.gif"
author: Xavier Collantes
dateWritten: 2025-08-25
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
---

![]()

Since I was 10, I loved watching the pretty colors on the screen when my dad
would watch Jim Cramer on CNBC. At the time I did not understand what the green
and red arrows meant but the experience left a lasting impression.

I developed an automated trading notification system that monitors market
conditions and sends real-time alerts for trading opportunities. The system is
containerized and deployed on a lightweight K3S Kubernetes cluster for
scalability and reliability. I also built a web app to manage the system.

## Why

Like many of the things I have built, I built this one for myself because I did
not want to pay for an existing trading platform.

StrategyQuant — Starter $119 per month or $1,290 one-time; Professional $139 per month or $1,490 one-time; Ultimate $269 per month or $2,900 one-time. Official: StrategyQuant pricing.

## People First

I quickly realized my weakness in lack of experience as a trader. I used
LinkedIn to find a trading mentor.

I also realized that I needed to learn more about the stock market. I started
reading books and watching videos.

## Key Features

- **Real-time Market Monitoring**: Continuous tracking of market data and
  trading signals
- **Automated Notifications**: Smart alerts based on customizable trading criteria
- **Portfolio Tracking**: Monitor positions and performance metrics
- **K3S Deployment**: Lightweight Kubernetes deployment for efficient resource usage
- **Scalable Architecture**: Containerized microservices for easy scaling

## Technical Stack

- **Backend**: Python trading algorithms and notification services
- **Container Orchestration**: K3S (lightweight Kubernetes)
- **Deployment**: Docker containers with Kubernetes manifests
- **Monitoring**: Health checks and performance metrics
- **Notifications**: Multiple delivery channels (email, webhook, mobile)

## Architecture

The system runs as a distributed application on K3S with separate services for:

- Market data ingestion
- Signal processing and analysis
- Notification delivery
- Portfolio management
- Health monitoring and logging

## Deployment Benefits

Using K3S provides several advantages:

- **Lightweight**: Minimal resource overhead compared to full Kubernetes
- **Easy Management**: Simple installation and maintenance
- **Production Ready**: Suitable for edge computing and IoT deployments
- **Cost Effective**: Runs efficiently on modest hardware resources

## Future Improvements

- Add more trading algorithms
- Add more notification channels
- Add more portfolio management features
- Add more health monitoring and logging
- Add more deployment benefits
- Add more deployment benefits
