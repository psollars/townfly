# Explore.  Experience.  TownFly.
Looking for something to do tonight?  Maybe spend some time with friends or family this upcoming weekend?  You *could* get lost shuffling through the interwebs looking for something interesting to do.  Or you could try a fun and novel approach!

![wireframe](http://www.slothwerks.com/dev/grand-circus/townfly/work-files/readme-banner.jpg)

## Initial Concept
Our app accesses the Google and Facebook API's to find public events within a certain distance of a given location.  The app will then serve up a random event for the user to consider.  If the user is interested, he or she can access the event page on Facebook for further details.  If not, the user may instead discard the suggested event and move on to the next.

![wireframe](http://www.slothwerks.com/dev/grand-circus/townfly/work-files/initial-planning.jpg)

## MVP (Minimum Viable Product)
- "Tinder" style UI
- Search by ZIP code
- Sort results by date/time
- Filter by category (Education, Fitness, Hotel, Food and Beverage, et cetera)
- String search (filter results by keyword)
- Access Facebook event page for further details

## Stretch Goals
- Detect user location
- Dynamic distance (find events within 1K, 5K, 10K+ of current location)
- Use interactive Google Map to pinpoint location
- Facebook login vs. account-free access
- "Bucketing" of events (save interesting events for later recall)

![wireframe](http://www.slothwerks.com/dev/grand-circus/townfly/work-files/final-code-crunch.jpg)

## Public Launch
TownFly was launched on December 8th at a public event hosted by Start Garden in Grand Rapids, Michigan.

### Introduction
TownFly is a local event finder app for people interested in doing something spontaneous.  For example:  you're at a conference in Chicago, have some downtime in the evening, and want to find a local bar with live music.  Or perhaps your niece is visiting this weekend and you want to find something fun and kid friendly to do.  Maybe you're simply trying to break out of your social circles and meet new people in your city.  Regardless of your situation, TownFly helps you find the events you're looking for out of the box and runs on any device.

### The Technology
TownFly was built with a React/Redux front-end with mobile-first
design and a clean, intuitive visual layout.

We built an Express API that makes multiple calls to both the Facebook
and Google APIs - gathering multiple sets of data, merging that
information, and sending it back to our application.

All of this information is available to you with no downloads and no
logins.  With a click of a button,  you have visibility to a wealth of
public events all pulled directly from Facebook.

![wireframe](http://www.slothwerks.com/dev/grand-circus/townfly/work-files/launch-slide1.jpg)

### The User Journey
Your journey with TownFly begins when you enter your desired city or ZIP code.  From there, you may select distance and time parameters as well as categories of spcific types of activities you might be interested in.  So if our niece is now in town, we might select today and a distance of five miles to locate fun things to do in Grand Rapids.  We'll then click "Search Events" and TownFly will do its magic!

![wireframe](http://www.slothwerks.com/dev/grand-circus/townfly/work-files/launch-slide2.jpg)

On a mobile device, TownFly will show us the first of the several events it has found that matches our search parameters.  We can then swipe through each event, checking out just the basic information, until we find one that interests us.  We can then click "view more" to read a full description, get a map to the venue, and acquire directions.  If the event happens to be later in the week, we can click a calendar icon to add a reminder on our digital calendar.  We can also launch to Facebook proper to see if any of our friends might be attending.

If our search pulled up a large number of events or if we're looking for something specific, we can filter our results using key words.  For example, we might enter "free" and "family" to locate free, kid-friendly events while our niece is in town for the weekend.  This search occurs in real time as we type, and we will see the number of results update as TownFly locates all events with a description which includes our key words.

![wireframe](http://www.slothwerks.com/dev/grand-circus/townfly/work-files/launch-slide3.jpg)

## The Team
| Name | LinkedIn |
| --- | --- |
| Brennan Martin | https://www.linkedin.com/in/itsbrennan/ |
| Jillane Cook | https://www.linkedin.com/in/jillanecook/ |
| Patrick Sollars | https://www.linkedin.com/in/patricksollars/ |
| Sloth I | https://www.linkedin.com/in/slothwerks/ |