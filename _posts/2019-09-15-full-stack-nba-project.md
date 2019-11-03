---
layout: post
title:  "Full Stack NBA Project"
date: 2019-09-15
comments: true
keywords: "blog"
categories: blog
permalink: /:categories/:year/:month/:title
---

[November 2, 2019 - UPDATED BLOG POST](../../../blog/2019/11/updating-my-nba-project)

![Website In Action](/assets/bsq.gif)

[Click here to see it!](https://vandyliu.github.io/boxscorequick)

BoxScoreQ is a website to keep you updated on NBA games and their box scores quickly. Whenever I come home from work or school, I open up and see what NBA games I should tune in to. However, I would always want to look at the box score first to see if there is a particular game that might interest me like a game where Derrick Rose currently has 41 points or a game where Klay Thompson is 6-7 from 3 point range. There wasn’t a quick place to find all the box scores in one place, which is why I made BoxScoreQ.

After getting an internship at Amazon, I started slacking off and thought that I could land any internship with just my ordinary resume with Amazon on it. I applied to a bunch of places and mostly got no answers. I had one interview with a smaller company in Vancouver. They asked me about my projects and my best one was your classic “To-do app”. There were no intricate or complexities with it and I did very poorly on the interview. The interviewer asked me if I knew about REST APIs, React, or SQL and I had to sadly say no. After that interview, I decided I had to actually create something interesting and unique, so I started this.

Some problems that I encountered along the way and how I handled them.
- The NBA stats website would block requests after a couple requests were made in quick succession. This meant that I could not get a lot of NBA box score data, which made the website useless. After some research, I learned I could use a proxy rotator to send requests to the NBA stats website through different proxies to bypass this issue. This made me run into another problem…
- This problem was that the proxies often failed. I would have to go through at least 10 before one worked, but I couldn’t grab every box score for each game on a day with the same proxy. So if there were 6 games on a day, I would probably have to go through 60 proxies to load all that data, and that takes a lot of time. People nowadays don’t have the patience for that, so what I did was everytime a date was processed, I added all that information into a MongoDB database. Requesting from the database is much faster and no proxy is needed.
- Originally I hosted it on Heroku, but because the proxies can take a long time and requests to Heroku are only given 30 seconds then most of the time, the requests would time out. I now host it on PythonAnywhere, which is super easy to use and not too expensive.
- How would I continually update the box score on today's date. Originally used APScheduler to periodically re-request data from the NBA every 5 minutes to keep the data as up to date as possible. PythonAnywhere does not allow for multiple processes but it does have a feature to periodically run scripts, which is where I host those scheduled jobs now
- It's possible for data to be incorrect or inconsistent due to the nature of networks, APIs and computers in general. I have another script that runs periodically that checks and verifies the data for a random date.


Things I considered:
- Frontend: Definitely wanted to do in React
	- Industry standard
	- Used Ant.design for layout and many components
	- Didn't use Redux but hope to implement it (probably in another project though)

- Backend
	- Wanted to interact with existing APIs
		- Discovered NBA_API (Python)
	- Decided to go with flask because it is easy to create Rest APIs with it
	- Considered Django but didn’t want to create the Schemas and Models for a game
	- For a given date, the process looks like this: Grabs all game IDs from NBA API, grabs the box score for each game ID, remove unnecessary data and organize the data into something more readable and useable, and finally adds it to the database

- Database: Using a SQL vs NoSQL database
	- SQL
		- Used in big industries
		- Takes more time to learn
		- Should learn!!!!!!
	- NoSQL
		- Already knew it (had experience with Firebase at a hackathon)
		- Easy to pick up and learn
		- Had to restructure data a little to fit NoSQL better
		- Not much use for relations anyways
		- Cheaper
	- Went with NoSQL (MongoDB)
		- 500MB for free
		- One game is ~32kb
		- 1230 games in a year (Regular season) + 105 (playoffs)
		- 4 MB for a year
		- Can store a lot of games

TechStack: HTML, Python, Flask, React, NBA_API, MongoDB

[Click here to see it!](https://vandyliu.github.io/boxscorequick)