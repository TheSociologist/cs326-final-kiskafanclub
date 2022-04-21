# Team Name
Kiska Fan club

# Web Application Name
Matcher

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

# IMAGES:
## Profiles:
![image](https://github.com/TheSociologist/cs326-final-kiskafanclub/blob/main/docs/Screen%20Shot%202022-04-20%20at%202.27.17%20PM.png)
View a student profile. Includes their basic information and resume

## Edit Data:
![image](https://github.com/TheSociologist/cs326-final-kiskafanclub/blob/main/docs/Screen%20Shot%202022-04-20%20at%202.31.06%20PM.png)
Can update user profile data here

## Home Page:
![image](https://github.com/TheSociologist/cs326-final-kiskafanclub/blob/main/docs/Screen%20Shot%202022-04-20%20at%202.31.59%20PM.png)
Can navigate the entire web app from here. Can view some featured student profiles, sign in/up, and view top notifcations/announcements and ongoing meetings

## Search results:
![image](https://github.com/TheSociologist/cs326-final-kiskafanclub/blob/main/docs/Screen%20Shot%202022-04-20%20at%202.34.36%20PM.png)
Provides search which include most relevant student profiles, posts, and universities

## Explore Colleges:
![image](https://github.com/TheSociologist/cs326-final-kiskafanclub/blob/main/docs/Screen%20Shot%202022-04-20%20at%202.34.57%20PM.png)
Allows you to search for colleges based on certain criteria including state or program

## Posts

{Post being edited image}

Users can view, create, edit, and delete posts. They can also view, create, and delete comments by clicking on the corresponding button. 

## Profile

{Profile page}

{Profile editing menu}

Users can view, create (through sign up), update, and delete (through account deletion) their profiles for external display. 


## URL: 
https://kiska-fan-club-1.herokuapp.com/

# Distribution of labor:

- Kays: Developed initial server which included basic crud operations for dealing with profile and post information. Also implemented database code that handle profile and post crud using sql.

* Ajan: Handled post, feed, and comments backend routes and frontend operations 

- Sawyer: Created CRUD operations for ongoing meetings and profile sign up, along with CRUD operations for the edit profile page. 

- Sugun: Worked on the sign in and sign up pages and including the front-end and back-end CRUD operations.
