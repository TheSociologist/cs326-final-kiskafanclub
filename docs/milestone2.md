# Team Name
Kiska Fan club

# Web Application Name
Matcher

# API Specification
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

# Labor Division Breakdown

* Sugun: Handled sign up and sign in
* Sawyer: Handled profle and meeting-related
* Kays: Set up boilerplate code for server and database files
* Ajan: Handled post, feed, and comments

# User Interface

## Posts

{Post w/ comments Image}

{Post being edited image}

Users can view, create, edit, and delete posts. They can also view, create, and delete comments by clicking on the corresponding button. 

## Profile

{Profile page}

{Profile editing menu}

Users can view, create (through sign up), update, and delete (through account deletion) their profiles for external display. 

# Heroku Application URL
[Matcher](https://kiska-fan-club-1.herokuapp.com)