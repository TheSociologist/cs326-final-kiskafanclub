# Team Name
Kiska Fan club

# Web Application Name
Matcher

# Team Overview
- Sawyer Ji: sawjji
- Ajan Prabakar: TheSociologist
- Kays Laouar: Kays-L
- Sugun Yadla: sugun-yadla

# Innovative Idea
App where high school students seek information/advice about colleges and the college application process. High school students are connected to college student volunteers. Can motivate college students to volunteer with some sort of ranking system (most hours volunteered, most students helped). May also try to incentivize participation with ad revenue. College student volunteers may offer one on one help (college essays, more information about extracurriculars, a specific school, a specialty), or group QA sessions. We’ll try to find some zoom API for meetings and maybe some kind of LinkedIn API so high school students can view college student profiles and see who they want to meet with. Can also expand the idea to job search (college students to employees of companies where employees are the volunteers). 

Also if volunteers set up profiles on the app or connect their linkedins, (and high school students do the same), we could use some kind of stable matching to match students with volunteers based on profile data. 

# Important Components
- High Schools
- Colleges
Students will say what high school and college they're a part of so the website can match them. 

- Q&A Posts
Can ask specific open questions about college or college applications. 

- Likes
Can like posts to increase their visibility and ranking.

- Comments
Can comment to respond to Q&A and other posts. 

- Media (images and documents)
Can share images and documents like syllabi, campus photos, etc.

- Courses
Can list popular courses


# Pages

## Dashboard (Ajan)
### Wireframe
![Dashboard](https://drive.google.com/uc?id=1Vx-OqdgTTQOv5hWXIR9g_pv-rfod8iPF)
### HTML Page
![Dashboard](https://drive.google.com/uc?id=1wAX1cj3uNoAPSmCloc0tquYkW5Z7nnKr)
### Description
The dashboard provides users with a list of recent and trending question and answer posts from the colleges they're following. Within the desktop view, there are sidebar elements that provide quick links to recommended and ongoing content. On the left this includes a list of recommended colleges based off the user's followed colleges. We can implement a basic query to match tags and certain stats about colleges to come up with recommendations. Additionally, there are a list of recommended q&a posts from colleges the user is not following. This can be found using similar systems as before. On the right are quick links to currently live zoom sessions. We can use HTTP long polling or websockets to keep this list consistently updating or just fallback to the stated times for the meetings.

## Colleges (Ajan)
### Wireframe
![Colleges Wireframe](https://drive.google.com/uc?id=188oIGxsA6p5Q9Z62fy4dakU79lhg4cSv)
### HTML Page
![Colleges HTML](https://drive.google.com/uc?id=1Uhq6UOPirTkfKU1Kxcx4z1CwjrGx0Urn)
### Description
The colleges page gives users the ability to discover and compile colleges using filters and sorts. We hope this provides a more fine-grained way to look for colleges according to user preferences. Right now our ideas for filters include admission difficulty, majors required, sorting based on rankings according to US news or other sources, and location. We may add more if time allows. 

## Menu Bar (Ajan)
### Wireframe
![Menu Wireframe](https://drive.google.com/uc?id=1x_6v5_q-oSddlnM0QtPAUyusvfGKucAA)
### HTML Page
![Menu HTML](https://drive.google.com/uc?id=1t4TiDaFKqpgk96Zu2cRRm0Im8jYu1WZC)
### Description
The menu bar is the top-most website navigation system on the platform. It includes website details including an icon and title and links to each top-level page including home, collges, and the signed in user's profile and settings (within a dropdown). There's also a searchbar on the right that can be used to look for colleges, other users, questions, and meetings.

## Home page (Kays)
### Wireframe
![Home Wireframe](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### HTML Page
![Home HTML](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### Description

## Search results page (Kays)
### Wireframe
![Search Wireframe](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### HTML Page
![Search HTML](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### Description

## Sign up page (Sugun)
### Wireframe
![Sign up Wireframe](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### HTML Page
![Sign up HTML](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### Description


## Settings (Sugun)
### Wireframe
![Settings Wireframe](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### HTML Page
![Settings HTML](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### Description

## Profile (Sawyer)
### Wireframe
![Profile Wireframe](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### HTML Page
![Profile HTML](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### Description

## Ongoing Meetings (Sawyer)
### Wireframe
![Ongoing Wireframe](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### HTML Page
![Ongoing HTML](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### Description
