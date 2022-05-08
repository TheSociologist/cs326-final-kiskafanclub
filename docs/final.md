# Kiska fan club
 
## Matcher
 
### Spring(2022)
 
# Overview:
 
Our application helps High school student search up profiles of colleges in a similar fashion to linkedin,
while also having discussion threads about different aspect of college life.
 
 
# Team Members:
- Ajan: TheSociologist
- Kays: Kays-L
- Sawyer: sawjji
- Sugun: sugun-yadla
 
# User Interface
 
## Dashboard (Ajan)
### Wireframe
![Dashboard Wireframe](https://drive.google.com/uc?id=14NzhewRhNx9fGtCqOri-ZVTGQZeUllPh)
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
![Menu HTML](https://drive.google.com/uc?id=1KH4Aw7DrCcTTMg2ma2HzZxKgQ33tLG-5)
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
![Profile Wireframe](https://drive.google.com/uc?id=1R0W8EitBXRD2wiVlWrk3RM3C6PUNfqzA)
### HTML Page
![Profile HTML](https://drive.google.com/uc?id=175AlAckd_nHVqH-DgczwXi5Xgaev9dmq)
### Description
The following page is a snapshot of a random user's profile. This page will let high school students learn more about the college student whom they are chatting with and find out more about this student's hobbies, accomplishments, and personal information that they are comfortable sharing.
 
## Ongoing Meetings (Sawyer)
### Wireframe
![Ongoing Wireframe](https://drive.google.com/uc?id=1IE6nf2-VV5W6IYs7RZLPY1P22YeSzww5)
### HTML Page
![Ongoing HTML](https://drive.google.com/uc?id=1FBXeM6Pc4hu0bPLt4muETUh-zYsCChja)
### Description
This page is a dashboard of all ongoing meetings for different colleges. High school students could hop into any random meeting to learn more about that particular college. The filter option at the top allows for students to filter colleges alphabetically or by state.
 
# API Specification:
* /colleges - get a list of colleges
* /colleges/read?college_id - view a single college in more detail
* /college/read/posts?college_id - get all the posts for a college
* /college/favorite?college_id - favorite a college to get its posts to show up on dashboard
 
* /post/delete?post_id - delete a post
* /post/like?post_id - like a post
* /post/update?post_id - edit a post
* /post/create - create a post
 
* /post/comments?postId - get post comments: answers, replies
* /post/comments/create?postId - comment on a post
* /post/comments/delete?commentId - delete a comment 
 
* /feed - get a list of posts from favorited colleges and users
 
* /profile/create - create a new account same as registering
* /profile/update?userId - settings for user changes
* /profile/delete?userId - in settings to delete your account
* /profile?userId - get user details for account information and profiles
* /profile/follow?userId - follow a user
 
* /search?query - search for schools using string
 
* /ongoing-meetings/read - get all ongoing meetings
* /meetings/create?meetingId - create a new meeting
* /meetings/delete?meetingId - delete a meeting
 
# Database
 
profiles
- id serial primary key
- name text /* Name of the user */
- university text
- major text
- description text
- email text unique not null
- password text
- yog text /* User's year of graduation */
 
schools
- id serial primary key
- name text
- description text
- num_students int /* number of students in the college */
- address text
- banner text /* banner image of given school */
- icon text /* icon image of given school */
 
favorite_schools
- profile_id int /* id of the user who favorited this */
- school_id int  /* id of the school being favorited */
 
posts
- id serial primary key
- school_id int references schools /* id this post belongs to */
- created_at date /* whenever this post was created */
- created_by int /* the id of the user who created this post  */
- title text
- content text
- likes int /* number of likes this post has */
 
Posts are many-to-one with colleges. They are one-to-many with users who create them. 

comments
- id serial primary key
- post_id int  /* post this comment belongs to  */
- created_by int /* the id of the user who created this comment  */
- created_at date /* whenever this post was created */
- content text
- likes int /* how many likes this comment received */
 
meetings
- id serial primary key
- title text
- link text /* the link to this meeting */
- description text
- created_by int
- start_date /* when this meeting starts */
- end_date /* when this meeting ends */
 
 
# URL Routes/Mappings
/profile: edit your own profile information and view other users
/dashboard: get recommended posts, tutors, and schools
/home: the promotional homepage for the website
/sign-in: sign in to an existing account
/sign-up: sign up for a new account
/ongoing-meetings: view and create new meetings
/settings: change your notification and other settings
/colleges: see a list of colleges
 
# Authentication/Authorization
Users sign up using the sign up page. They are then redirected to the sign in page where they use their previously entered credentials to log in. They now have the ability to perform most create, update, and delete operations including posts, comments, meetings, and being able to join or favorite a school. Users are only allowed to edit their own profiles and posts and they are unable to edit the details of schools. The dashboard is inaccessible until a user signs in but all other pages are available for non-authenticated users.
 
# Division of Labor
Ajan: Handled post, feed, and comments backend routes and frontend operations. Created the dashboard and colleges page, and the menu bar. 
Kays: Developed initial server which included basic crud operations for dealing with profile and post information. Also implemented database code that handle profile and post crud using sql. Created the home page, search results page
Sugun: Worked on the sign in and sign up pages and including the front-end and back-end CRUD operations. Created the sign up page and settings page. 
Sawyer: Created CRUD operations for ongoing meetings and profile sign up, along with CRUD operations for the edit profile page. Did all the UI/UX stuff. Created the ongoing meetings page and the profile page. 
 
# Conclusion
 
In the beginning of the project, we struggled to find our footing and in finding a solid idea for our project.
Using bootstrap for the design process immensely helped us visualize what kinds of designs would and wouldn't work.

# Rubric
- login/register - 30 pts
- make a post - 20 pts
- comment on a post - 20 pts
- create a meeting - 20 pts
- search for a college - 10 pts
