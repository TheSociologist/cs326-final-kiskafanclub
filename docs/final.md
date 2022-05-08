# Kiskafan club

## College Match

### Spring(2022)

# Overview: 

Our application helps High school student search up profiles of colleges in a similar fashion to linkedin,
while also having discussion threads about different aspect of college life.

# Database Tables

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
- profile_id int /* id of the user who favorited this (foreign key to profiles primary key) */
- school_id int  /* id of the school being favorited (foreign key to schools primary key) */

posts
- id serial primary key
- school_id int references schools /* id this post belongs to (foreign key to schools primary key) */
- created_at date /* whenever this post was created */
- created_by int /* the id of the user who created this post  */
- title text 
- content text 
- likes int /* number of likes this post has */

comments
- id serial primary key
- post_id int  /* post this comment belongs to (foreign key to posts primary key) */
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

# Team Members:
- Ajan: TheSociologist
- Kays: Kays-L
- Sawyer: sawjji
- Sugun: sugun-yadla

# Division of Labor:

Ajan:
Kays: created wireframes for homepage and search page and created html for each of these pages. 
Sawyer:
Sugun:

# Conclusion:

In the beginning of the project, we struggled to find our footing and in finding a solid idea for our project. 
Using bootstrap for the design process immensely helped us visualize what kinds of designs would and wouldn't work.
We feel that we would have preferred having a better background on the backend side of things as it would have
greatly helped us structure the workflow during backend development. Overall, working on this group project has given us 
experience on how working on a huge project in a group setting is like and it also gave us an idea on how large websites are generally built.
