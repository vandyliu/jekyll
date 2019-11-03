---
layout: post
title:  "Updating my NBA Project"
date: 2019-11-02
comments: true
keywords: "blog"
categories: blog
permalink: /:categories/:year/:month/:title
---

![Website In Action](/assets/bsqv2.gif)

[Click here to see it!](https://vandyliu.github.io/boxscorequick)

If you haven't seen my [other blog post](../../../blog/2019/09/full-stack-nba-project), make sure to read it first.

In the past summer, when I was happy with my project, I decided to host it on heroku and github pages and leave it be until the season started. Once the pre-season started, I noticed a major problem: the boxscores did not update until the game finished. During the game, all the values would be null, making this website incredibly useless.

I knew this was something I needed to fix, but I held it off until after my Microsoft Garage interview. To prepare for my Microsoft interview, I did a few Leetcode questions and prepared a quick powerpoint for my 10 minute presentation. During one of the three interviews I had, one of the interviewers asked me to talk about a project for the entire interview (45 min).

My best project was this one so I talked about it as much as I could. In this interview, I found out that many aspects of my project could have been done much better:
- constantly calling the NBA API endpoint with different proxies is a Denial of Service attack (which is pretty rude by me)
- making requests with different proxies is unsafe
- I could probably find a better API endpoint, which would make things safer and then I would not have to use the proxy rotator
- my React components could be refactored to be more object-oriented and easier to read

After my interview, I was pretty defeated because I didn't think it went so well because almost everything I implemented/designed was questioned, but nevertheless I saw it as a learning opportunity to make something better.

So I got home and started improving it. Here is what has changed:
- designed new components and the table based off the NBA website instead of using Ant.design
- displays ALL games for a given day, regardless if it has started, finished or in-progress
- displays time left for games in-progress
- added photos for players in table
- added ability to sort columns
- hosting on heroku for free now instead of ($5) pythonanywhere, now that I don't have to wait a long time for requests
- removal of proxy rotator, and MongoDB because new endpoint is updated in real-time and is very accessible
- **found a new NBA endpoint that gives realtime data**
- other things that I can't remember

Things I still may add:
- sorting games
- mobile version

[Click here to see it!](https://vandyliu.github.io/boxscorequick)