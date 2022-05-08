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

# Labor Breakdown

- Sugun: Final markdown file, sign up improvements and school queries
- Sawyer: Finished up meetings, cleaned up code and added more styling
- Kays: Set up backend database skeleton code and posts/profile queries
- Ajan: Finished up school, post queries 