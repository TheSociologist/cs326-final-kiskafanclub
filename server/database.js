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
      email text unique not null,
      password text
    );

    create table if not exists schools (
      id serial primary key,
      name text,
      description text,
      num_students int,
      address text
    );

    create table if not exists favorite_schools (
      profile_id int not null references profiles,
      school_id int not null references profiles,
      constraint favorite_uq unique (profile_id, school_id)
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



export const getSchools = async () => {
  const queryText = 'select * from schools';
  const res = await client.query(queryText);
  return res.rows;
};


// CREATE a user in the database.
export async function createProfile(name, email, password) {
  const queryText = 'INSERT INTO profiles (name, email, password) VALUES ($1, $2, $3) RETURNING *';
  const res = await client.query(queryText, [name, email, password]);
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


export const searchSchools = async (query) => {
  const queryText = 'SELECT * FROM schools where name ilike $1';
  const res = await client.query(queryText, [query]);
  return res.rows;
};

export const getPostById = async id => {
  const queryText = 'SELECT * FROM posts where id = $1';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
};

export const getComments = async id => {
  const queryText = 'SELECT * FROM comments where post_id = $1';
  const res = await client.query(queryText, [id]);
  return res.rows;
};

export const createComment = async comment => {
  const queryText = 'insert into comments (post_id, content) values ($1, $2) returning *';
  const res = await client.query(queryText, [comment.post_id, comment.content]);
  return res.rows[0];
};

export const deleteComment = async id => {
  const queryText = 'delete from comments where id = $1';
  const res = await client.query(queryText, [id]);
  return res.rows[0];

};

export const getFeed = async id => {
  const queryText = `
    select
    *
    from
    posts
    where school_id in (
      select 
      school_id
      from
      favorite_schools
      where
      profile_id = $1
    )
  `;
  const res = await client.query(queryText, [id]);
  return res.rows;
};

export const getRecommendedSchools = async () => {
  
  return await getSchools();
};

export const getRecommendedTutors = async () => {
  const queryText = `
    select
    *
    from
    profiles
  `;
  const res = await client.query(queryText);
  return res.rows;
};

export const getOngoingMeetings = async () => {
  const queryText = `
    select
    *
    from
    meetings
    order by start_date desc
  `;
  const res = await client.query(queryText);
  return res.rows;
};

export const getSchoolById = async id => {
  const queryText = 'select * from schools where id = $1';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
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
  const queryText = 'select * from posts where school_id = $1';
  const res = await client.query(queryText, [id]);
  return res;
};

export const deleteAccount = async id => {};

export const getProfile = async id => {
  const queryText = 'select * from profiles where id = $1';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
};

export const getProfileByEmail = async email => {
  const queryText = 'select * from profiles where email = $1';
  const res = await client.query(queryText, [email]);
  return res.rows[0];
}