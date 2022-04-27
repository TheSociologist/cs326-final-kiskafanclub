// db config stuff here later...
import { faker } from '@faker-js/faker';

export const searchSchools = async () => {
    const schools = []
    for (let i = 0; i < 5; i++) {
        const school = {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
        banner: faker.image.abstract(),
        icon: faker.image.abstract(),
        description: faker.lorem.paragraph(),
        }
        schools.push(school)
    }
    return schools;
}

export const createPost = async (post) => {
    return post
}

export const getPostById = async (id) => {
    return {
        id,
        title: faker.commerce.product(),
        text: faker.lorem.paragraph(),
        numLikes: faker.datatype.number(),
        liked: faker.datatype.boolean(),
        createdAt: faker.date.recent()
    }
}

export const updatePost = async (id) => {
    
}

export const likePost = async (id, userId) => {
    
}

export const deletePost = async (id, userId) => {
    
}

export const getComments = async (id) => {
    const comments = []
    for (let i = 0; i < 100; i++) {
      const comment = {
        id: faker.datatype.number(),
        text: faker.lorem.paragraph(),
        postId: id
      }
      comments.push(comment)
    }
    return comments
}

export const createComment = async (comment) => {
    return {
        ...comment,
        id: faker.datatype.number(),
    }
}

export const deleteComment = async (id) => {
    
}

export const getFeed = async (userId) => {
    const posts = []
    for (let i = 0; i < 100; i++) {
      const post = {
        id: faker.datatype.number(),
        title: faker.commerce.product(),
        text: faker.lorem.paragraph(),
        numLikes: faker.datatype.number(),
        liked: faker.datatype.boolean(),
        createdAt: faker.date.recent()
      }
      posts.push(post)
    }
    return posts;
}

export const getRecommendedSchools = async () => {
    return searchSchools()
}

export const getRecommendedTutors = async () => {
    const tutors = []
    for (let i = 0; i < 5; i++) {
      const tutor = {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
      }
      tutors.push(tutor)
    }
    return tutors
}

export const getOngoingMeetings = async () => {
    const meetings = []
    for (let i = 0; i < 5; i++) {
      const meeting = {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
        from: faker.date.recent(),
        to: faker.date.recent()
      }
      meetings.push(meeting)
    }
    return meetings;
}

export const getSchoolById = async (id) => {
    return {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
        banner: faker.image.abstract(),
        icon: faker.image.abstract(),
        description: faker.lorem.paragraph(),
    }
}

export const getSchools = async () => {
    return searchSchools()
}

export const createMeeting = async (meeting) => {
    return {
        id: faker.datatype.number(),
        ...meeting
    }
}

export const deleteMeeting = async (id) => {
   
}


export const updateMeeting = async (meeting) => {
   
}

export const verifyCreds = async (email, password) => {
    return true
}

export const getCollegePosts = async (id) => {
    return getFeed()
}

export const deleteAccount = async (id) => {

}

export const updateProfile = async (profile) => {

}

export const getProfile = async (id) => {
    return {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
        university: faker.commerce.product(),
        gradYear: faker.datatype.number(2030),
        major: faker.commerce.product(),
        aboutMe: faker.lorem.paragraph(),
        resume: faker.image.technics(),
    }
}

export const createAccount = (name, email, password) => {

}

let pool, client;
const dburl = process.env.DATABASE_URL;

async function connect() {
    // Create a new Pool. The Pool manages a set of connections to the database.
    // It will keep track of unused connections, and reuse them when new queries
    // are needed. The constructor requires a database URL to make the
    // connection. You can find the URL of your database by looking in Heroku
    // or you can run the following command in your terminal:
    //
    //  heroku pg:credentials:url -a APP_NAME
    //
    // Replace APP_NAME with the name of your app in Heroku.
    pool = new Pool({
      connectionString: dburl,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });

    // Create the pool.
    client = await pool.connect();

    // Init the database.
    await init();
  }

  async function init() {
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
    const res = await client.query(queryText);
  }

  // Close the pool.
  async function close() {
    client.release();
    await pool.end();
  }

  // CREATE a user in the database.
  async function createProfile(id, name, university, description) {
    const queryText =
      'INSERT INTO profiles (id, name, university, description) VALUES ($1, $2, $3, $4) RETURNING *';
    const res = await client.query(queryText, [id, name, university, description]);
    return res.rows;
  }

  // READ a user from the database.
  async function readProfile(id) {
    const queryText = 'SELECT * FROM profiles WHERE id = $1';
    const res = await client.query(queryText, [id]);
    return res.rows;
  }

  // UPDATE a user in the database.
  async function updateProfile(id, name, university, description) {
    const queryText =
      'UPDATE profile SET name = $2, university = $3, description = $4 WHERE id = $1 RETURNING *';
    const res = await client.query(queryText, [id, name, university, description]);
    return res.rows;
  }

  // DELETE a user from the database.
  async function deleteProfile(id) {
    const queryText = 'DELETE FROM profiles WHERE id = $1 RETURNING *';
    const res = await client.query(queryText, [id]);
    return res.rows;
  }

  async function createPost(poster, content) {
    const queryText =
      'INSERT INTO posts (poster, content, likes) VALUES ($1, $2, $3) RETURNING *';
    const res = await client.query(queryText, [poster, content, 0]);
    return res.rows;
  }

  // READ a user from the database.
  async function readPost(id) {
    const queryText = 'SELECT * FROM posts WHERE id = $1';
    const res = await client.query(queryText, [id]);
    return res.rows;
  }

  // UPDATE a user in the database.
  async function updatePost(id, poster, content) {
    const queryText =
      'UPDATE posts SET poster = $2, content = $3 WHERE id = $1 RETURNING *';
    const res = await client.query(queryText, [id, poster, content]);
    return res.rows;
  }

  async function likePost(id) {
    const queryText =
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
    const res = await client.query(queryText, [id]);
    return res.rows;
  }

  // DELETE a user from the database.
  async function deletePost(id) {
    const queryText = 'DELETE FROM posts WHERE id = $1 RETURNING *';
    const res = await client.query(queryText, [id]);
    return res.rows;
  }

  // READ all people from the database.
  async function readAllProfiles() {
    const queryText = 'SELECT * FROM profiles';
    const res = await client.query(queryText);
    return res.rows;
  }

  async function readAllPosts() {
    const queryText = 'SELECT * FROM posts';
    const res = await client.query(queryText);
    return res.rows;
  }