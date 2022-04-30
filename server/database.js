import { faker } from '@faker-js/faker';
import PG from 'pg'

const Pool = PG.Pool

const connectionString = process.env.DATABASE_URL
const client = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
})

// set up db tables, remove -- in first line if you need to drop all tables (BE CAREFUL!!!)
client.query(
  `
    -- drop table if exists comments, schools, profiles, posts, meetings; 
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    create table if not exists profiles (
      id serial primary key,
      name text,
      university text,
      major text,
      description text,
      email text,
      password text
    );

    create table if not exists schools (
      id serial primary key,
      name text,
      description text,
      num_students int,
      address text
    );

    create table if not exists posts (
      id serial primary key,
      school_id int references schools,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by int references profiles,
      content text,
      likes int
    );
    
    create table if not exists comments (
      id serial primary key,
      post_id int references posts,
      created_by int references profiles,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      content text,
      likes int
    );

    create table if not exists meetings (
      id serial primary key,
      title text,
      created_by int references profiles,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      start_date TIMESTAMPTZ,
      end_date TIMESTAMPTZ
    );
  `
  , 
  (err) => err ?  console.log(err) : console.log('DB initialized')
)

// CREATE a user in the database.
export async function createProfile(id, name, university, description) {
  const queryText = 'INSERT INTO profiles (id, name, university, description) VALUES ($1, $2, $3, $4) RETURNING *';
  const res = await client.query(queryText, [id, name, university, description]);
  return res.rows[0];
}

// READ a user from the database.
export async function readProfile(id) {
  const queryText = 'SELECT * FROM profiles WHERE id = $1';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
}

// UPDATE a user in the database.
export async function updateProfile(id, name, university, description) {
  const queryText = 'UPDATE profile SET name = $2, university = $3, description = $4 WHERE id = $1 RETURNING *';
  const res = await client.query(queryText, [id, name, university, description]);
  return res.rows[0];
}

// DELETE a user from the database.
export async function deleteProfile(id) {
  const queryText = 'DELETE FROM profiles WHERE id = $1 RETURNING *';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
}

export async function createPost(poster, content) {
  const queryText = 'INSERT INTO posts (poster, content, likes) VALUES ($1, $2, $3) RETURNING *';
  const res = await client.query(queryText, [poster, content, 0]);
  return res.rows[0];
}

// READ a user from the database.
export async function readPost(id) {
  const queryText = 'SELECT * FROM posts WHERE id = $1';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
}

// UPDATE a user in the database.
export async function updatePost(id, poster, content) {
  const queryText = 'UPDATE posts SET poster = $2, content = $3 WHERE id = $1 RETURNING *';
  const res = await client.query(queryText, [id, poster, content]);
  return res.rows[0];
}

export async function likePost(id) {
  const queryText = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
}

// DELETE a user from the database.
export async function deletePost(id) {
  const queryText = 'DELETE FROM posts WHERE id = $1 RETURNING *';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
}

// READ all people from the database.
export async function readAllProfiles() {
  const queryText = 'SELECT * FROM profiles';
  const res = await client.query(queryText);
  return res.rows;
}

export async function readAllPosts() {
  const queryText = 'SELECT * FROM posts';
  const res = await client.query(queryText);
  return res.rows;
}


export const searchSchools = async () => {
  const schools = [];
  for (let i = 0; i < 5; i++) {
    const school = {
      id: faker.datatype.number(),
      name: faker.commerce.product(),
      banner: faker.image.abstract(),
      icon: faker.image.abstract(),
      description: faker.lorem.paragraph()
    };
    schools.push(school);
  }
  return schools;
};

export const getPostById = async id => {
  return {
    id,
    title: faker.commerce.product(),
    text: faker.lorem.paragraph(),
    numLikes: faker.datatype.number(),
    liked: faker.datatype.boolean(),
    createdAt: faker.date.recent()
  };
};

export const getComments = async id => {
  const comments = [];
  for (let i = 0; i < 100; i++) {
    const comment = {
      id: faker.datatype.number(),
      text: faker.lorem.paragraph(),
      postId: id
    };
    comments.push(comment);
  }
  return comments;
};

export const createComment = async comment => {
  return {
    ...comment,
    id: faker.datatype.number()
  };
};

export const deleteComment = async id => {};

export const getFeed = async userId => {
  const posts = [];
  for (let i = 0; i < 100; i++) {
    const post = {
      id: faker.datatype.number(),
      title: faker.commerce.product(),
      text: faker.lorem.paragraph(),
      numLikes: faker.datatype.number(),
      liked: faker.datatype.boolean(),
      createdAt: faker.date.recent()
    };
    posts.push(post);
  }
  return posts;
};

export const getRecommendedSchools = async () => {
  return searchSchools();
};

export const getRecommendedTutors = async () => {
  const tutors = [];
  for (let i = 0; i < 5; i++) {
    const tutor = {
      id: faker.datatype.number(),
      name: faker.commerce.product()
    };
    tutors.push(tutor);
  }
  return tutors;
};

export const getOngoingMeetings = async () => {
  const meetings = [];
  for (let i = 0; i < 5; i++) {
    const meeting = {
      id: faker.datatype.number(),
      name: faker.commerce.product(),
      from: faker.date.recent(),
      to: faker.date.recent()
    };
    meetings.push(meeting);
  }
  return meetings;
};

export const getSchoolById = async id => {
  return {
    id: faker.datatype.number(),
    name: faker.commerce.product(),
    banner: faker.image.abstract(),
    icon: faker.image.abstract(),
    description: faker.lorem.paragraph()
  };
};

export const getSchools = async () => {
  return searchSchools();
};

export const createMeeting = async meeting => {
  return {
    id: faker.datatype.number(),
    ...meeting
  };
};

export const deleteMeeting = async id => {};

export const updateMeeting = async meeting => {};

export const getCollegePosts = async id => {
  return getFeed();
};

export const deleteAccount = async id => {};

export const getProfile = async id => {
  return {
    id: faker.datatype.number(),
    name: faker.commerce.product(),
    university: faker.commerce.product(),
    gradYear: faker.datatype.number(2030),
    major: faker.commerce.product(),
    aboutMe: faker.lorem.paragraph(),
    resume: faker.image.technics()
  };
};

export const getProfileByEmail = async email => {
  const queryText = 'select * from profiles where email = $1';
  const res = await client.query(queryText, [email]);
  return res.rows[0];
}