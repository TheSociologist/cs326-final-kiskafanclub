import 'dotenv/config';
 import { Pool } from 'pg';

 export class Database {
   constructor(dburl) {
     this.dburl = dburl;
   }

   async connect() {
     // Create a new Pool. The Pool manages a set of connections to the database.
     // It will keep track of unused connections, and reuse them when new queries
     // are needed. The constructor requires a database URL to make the
     // connection. You can find the URL of your database by looking in Heroku
     // or you can run the following command in your terminal:
     //
     //  heroku pg:credentials:url -a APP_NAME
     //
     // Replace APP_NAME with the name of your app in Heroku.
     this.pool = new Pool({
       connectionString: this.dburl,
       ssl: { rejectUnauthorized: false }, // Required for Heroku connections
     });

     // Create the pool.
     this.client = await this.pool.connect();

     // Init the database.
     await this.init();
   }

   async init() {
     const queryText = `
       create table if not exists profiles (
         id varchar(30) primary key,
         name varchar(30),
         university varchar(30),
         major varchar(30),
         description varchar(200)
       );

       create table if not exists posts (
         id varchar(30) primary key,
         poster varchar(30),
         content varchar(200),
         likes int
       );`
     const res = await this.client.query(queryText);
   }

   // Close the pool.
   async close() {
     this.client.release();
     await this.pool.end();
   }

   // CREATE a user in the database.
   async createProfile(id, name, university, description) {
     const queryText =
       'INSERT INTO profiles (id, name, university, description) VALUES ($1, $2, $3, $4) RETURNING *';
     const res = await this.client.query(queryText, [id, name, university, description]);
     return res.rows;
   }

   // READ a user from the database.
   async readProfile(id) {
     const queryText = 'SELECT * FROM profiles WHERE id = $1';
     const res = await this.client.query(queryText, [id]);
     return res.rows;
   }

   // UPDATE a user in the database.
   async updateProfile(id, name, university, description) {
     const queryText =
       'UPDATE profile SET name = $2, university = $3, description = $4 WHERE id = $1 RETURNING *';
     const res = await this.client.query(queryText, [id, name, university, description]);
     return res.rows;
   }

   // DELETE a user from the database.
   async deleteProfile(id) {
     const queryText = 'DELETE FROM profiles WHERE id = $1 RETURNING *';
     const res = await this.client.query(queryText, [id]);
     return res.rows;
   }

   async createPost(id, poster, content) {
     const queryText =
       'INSERT INTO posts (id, poster, content, likes) VALUES ($1, $2, $3, $4, $5) RETURNING *';
     const res = await this.client.query(queryText, [id, poster, content, 0]);
     return res.rows;
   }

   // READ a user from the database.
   async readPost(id) {
     const queryText = 'SELECT * FROM posts WHERE id = $1';
     const res = await this.client.query(queryText, [id]);
     return res.rows;
   }

   // UPDATE a user in the database.
   async updatePost(id, poster, content) {
     const queryText =
       'UPDATE posts SET poster = $2, content = $3 WHERE id = $1 RETURNING *';
     const res = await this.client.query(queryText, [id, poster, content]);
     return res.rows;
   }

   async likePost(id) {
     const queryText =
       'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
     const res = await this.client.query(queryText, [id]);
     return res.rows;
   }

   // DELETE a user from the database.
   async deletePost(id) {
     const queryText = 'DELETE FROM posts WHERE id = $1 RETURNING *';
     const res = await this.client.query(queryText, [id]);
     return res.rows;
   }

   // READ all people from the database.
   async readAllProfiles() {
     const queryText = 'SELECT * FROM profiles';
     const res = await this.client.query(queryText);
     return res.rows;
   }

   async readAllPosts() {
     const queryText = 'SELECT * FROM posts';
     const res = await this.client.query(queryText);
     return res.rows;
   }
 }