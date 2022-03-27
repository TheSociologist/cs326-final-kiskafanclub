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
- Q&A Posts
- Likes
- Comments
- Media (images and documents)
- Courses

# Data Interactions
This program is a service for high school students who want to learn more about different colleges from college students who have experienced life at these schools. The college students will apply to be a mentor with their school email, and our website will create a meeting link where these college students can host info sessions for high school students. There will be a Q&A section where students can ask specific and open questions about these colleges, or the general college application process. There will be a “upvote” system where likes will increase posts’ visibility and ranking. College students can also respond to Q&A’s with their own experiences. We will also implement different features for popular course listings. College students can share images and documents like the syllabus, campus photos, etc.

# Pages

## Dashboard (Ajan)
### Wireframe
![Dashboard Wireframe](https://drive.google.com/uc?id=13ORH7GNKiVq-rJAlADE4t5bVPEJxTL0y)
### HTML Page
![Dashboard HTML](https://drive.google.com/uc?id=1NAnpjbLSlse-5S3QdWNcZen0uaB8c6jX)
### Description
The dashboard provides users with a list of recent and trending question and answer posts from the colleges they're following. Within the desktop view, there are sidebar elements that provide quick links to recommended and ongoing content. On the left this includes a list of recommended colleges based off the user's followed colleges. We can implement a basic query to match tags and certain stats about colleges to come up with recommendations. Additionally, there are a list of recommended q&a posts from colleges the user is not following. This can be found using similar systems as before. On the right are quick links to currently live zoom sessions. We can use HTTP long polling or websockets to keep this list consistently updating or just fallback to the stated times for the meetings.

## Colleges (Ajan)
### Wireframe
![Colleges Wireframe](https://drive.google.com/uc?id=13ORH7GNKiVq-rJAlADE4t5bVPEJxTL0y)
### HTML Page
![Colleges HTML](https://drive.google.com/uc?id=1qdROLITCAu7lyNkfHV1_esqfZAIdIRDe)
### Description
The colleges page gives users the ability to discover and compile colleges using filters and sorts. We hope this provides a more fine-grained way to look for colleges according to user preferences. Right now our ideas for filters include admission difficulty, majors required, sorting based on rankings according to US news or other sources, and location. We may add more if time allows. 

## Menu Bar (Ajan)
### Wireframe
![Menu Wireframe](https://drive.google.com/uc?id=1x_6v5_q-oSddlnM0QtPAUyusvfGKucAA)
### HTML Page
![Menu HTML](https://drive.google.com/uc?id=1NAnpjbLSlse-5S3QdWNcZen0uaB8c6jX)
### Description
The menu bar is the top-most website navigation system on the platform. It includes website details including an icon and title and links to each top-level page including home, collges, and the signed in user's profile and settings (within a dropdown). There's also a searchbar on the right that can be used to look for colleges, other users, questions, and meetings.

## Home page (Kays)
### Wireframe
![Home Wireframe](https://drive.google.com/uc?id=133F475jqW_SiPKXYvxtMY_SyIYpVndvW)
### HTML Page
![Home HTML](https://drive.google.com/uc?id=1qPUQtGrz1liz7CgyH9z8iev3HnnqnNpV)
### Description
Nice layout with login and signup buttons, menu/nav bar (shows up on all pages), a preview of college volunteer/mentor profiles, a search bar, and some images. Also have a mission statement/about us button for users to read more about the platform.

## Search results page (Kays)
### Wireframe
![Search Wireframe](https://drive.google.com/uc?id=1-Vv0JraGRewfOL4_W7KHVuvjyWuV_3Vu)
### HTML Page
![Search HTML](https://drive.google.com/uc?id=15NSIcyHB8LwAU61YgsLUIxFo4y2JcUxp)
### Description
Displays profiles of users given keywords that were searched for. Key words may include majors, EC activities, or specific universities. App will search for profiles that best match the request.

## Sign up page (Sugun)
### Wireframe
![Sign up Wireframe](https://drive.google.com/uc?id=1MopKViwcG6O3M_At2QtHTAJnSNusaF1Y)
### HTML Page
![Sign up HTML](https://drive.google.com/uc?id=1DAL1l7kJaFFPxxadBpVxycSDT9l8_a-A)
### Description
The above image is a screenshot of where you will be prompted to either login to your account using your email and password. If you don't have one, it then prompts you to create an account using your email address.(for sing-in.html)


## Settings (Sugun)
### Wireframe
![Settings Wireframe](https://drive.google.com/uc?id=1qwUO5_XiYEB6pa8D2IyAgRez6b0HlsCq)
### HTML Page
![Settings HTML](https://drive.google.com/uc?id=1dKH829oJ_hUZal9GGf4F7rRtkUtHYerh)
### Description
The above image is a screenshot of the page where you can edit your profile information. The information here will be visible to other users. There are text boxes for first name, last name and a short description of yourself. Below that, you can link any url to your linkedin or portfolios or websites that you have created. You can also add your current location or where you may be generally located.(for settings.html)

## Profile (Sawyer)
### Wireframe
![Profile Wireframe](https://drive.google.com/uc?id=12nLYCVMbUpSijU13yFv4z0NXbQJOxMTO)
### HTML Page
![Profile HTML](https://drive.google.com/uc?id=175AlAckd_nHVqH-DgczwXi5Xgaev9dmq)
### Description
The following page is a snapshot of a random user's profile. This page will let high school students learn more about the college student whom they are chatting with and find out more about this student's hobbies, accomplishments, and personal information that they are comfortable sharing.

## Ongoing Meetings (Sawyer)
### Wireframe
![Ongoing Wireframe](https://drive.google.com/uc?id=1IE6nf2-VV5W6IYs7RZLPY1P22YeSzww5)
### HTML Page
![Ongoing HTML](https://drive.google.com/uc?id=1qdROLITCAu7lyNkfHV1_esqfZAIdIRDe)
### Description
This page is a dashboard of all ongoing meetings for different colleges. High school students could hop into any random meeting to learn more about that particular college. The filter option at the top allows for students to filter colleges alphabetically or by state.
