import { faker } from '@faker-js/faker';
import PG from 'pg'
import fetch from 'node-fetch'
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
      password text,
      yog text
    );

    create table if not exists schools (
      id serial primary key,
      name text,
      description text,
      num_students int,
      address text,
      banner text,
      icon text
    );

    create table if not exists favorite_schools (
      profile_id int not null references profiles,
      school_id int not null references schools,
      constraint favorite_uq unique (profile_id, school_id)
    );

    create table if not exists posts (
      id serial primary key,
      school_id int references schools,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by int references profiles,
      title text,
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
      link text,
      description text,
      created_by int references profiles,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      start_date TIMESTAMPTZ,
      end_date TIMESTAMPTZ
    );
  `
  , 
  async (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('DB initialized')
      client.query(
        `select count(*) from schools`,
        (err, res) => {
          const count = parseInt(res.rows[0]?.count)
          if (err) {
            console.log('colleges setup failed', err)
          } else if (count === 0) {
            console.log('adding colleges')
            fetch(
              'https://parseapi.back4app.com/classes/University?limit=100&include=state&keys=name,state,state.name',
              {
                headers: {
                  'X-Parse-Application-Id': 'Ipq7xXxHYGxtAtrDgCvG0hrzriHKdOsnnapEgcbe', // This is the fake app's application id
                  'X-Parse-Master-Key': 'HNodr26mkits5ibQx2rIi0GR9pVCwOSEAkqJjgVp', // This is the fake app's readonly master key
                }
              }
            ).then((resp) => resp.json().then(({results}) => {
              results.forEach(({name, state}) => {
                const queryText = 'insert into schools (name, address, banner, icon, description) values ($1, $2, $3, $4, $5)';
                client.query(queryText, [name, state, faker.image.abstract(), faker.image.abstract(), faker.lorem.paragraph()]);
              })
            }))
          } else {
            console.log('colleges set up')
          }
        }
      )
    }
  }
  
)

export const toggleFavoriteSchool = async (userId, schoolId) => {
  if (userId && schoolId) {
    let queryText = 'select * from favorite_schools where profile_id = $1 and school_id = $2';
    const params = [parseInt(userId), parseInt(schoolId)]
    let res = await client.query(queryText, params);
    const favorite = res.rows[0]
    if (favorite) {
      queryText = 'delete from favorite_schools where profile_id = $1 and school_id = $2';
    } else {
      queryText = 'insert into favorite_schools (profile_id, school_id) values ($1, $2)';
    }
    res = await client.query(queryText, params);
  }
}


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
export async function updateProfile(userId, {name, university, description, yog, major}) {
  console.log(description)
  const queryText = 'UPDATE profiles SET name = $2, university = $3, description = $4, yog = $5, major = $6 WHERE id = $1 RETURNING *';
  const res = await client.query(queryText, [userId, name, university ? university : '', description ? description : '', yog ? yog : '', major ? major : '']);
  return res.rows[0];
}

// DELETE a user from the database.
export async function deleteProfile(id) {
  const queryText = 'DELETE FROM profiles WHERE id = $1 RETURNING *';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
}

export async function createPost(userId, post) {
  console.log(userId, post)
  if (!userId && !post) {
    return null;
  } else {
    const queryText = 'INSERT INTO posts (created_by, title, content, school_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const res = await client.query(queryText, [userId, post.title, post.content, post.schoolId]);
    return res.rows[0];
  }
  
}

// READ a user from the database.
export async function readPost(id) {
  const queryText = 'SELECT * FROM posts WHERE id = $1';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
}

// UPDATE a user in the database.
export async function updatePost(id, post) {
  const queryText = 'UPDATE posts SET title = $2, content = $3 WHERE id = $1 RETURNING *';
  const res = await client.query(queryText, [id, post.title, post.content]);
  return res.rows[0];
}

export async function likePost(id) {
  const queryText = 'UPDATE posts SET likes = coalesce(likes, 0) + 1 WHERE id = $1 RETURNING *';
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
  const queryText = `SELECT * FROM schools where name ilike '%${query}%'`;
  const res = await client.query(queryText);
  console.log(res.rows  )
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

export const createComment = async (userId, comment) => {
  if (userId) {
    const queryText = 'insert into comments (post_id, content, created_by) values ($1, $2, $3) returning *';
    const res = await client.query(queryText, [comment.post_id, comment.content, userId]);
    return res.rows[0];
  } else {
    return null
  }
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
  
  return (await getSchools()).slice(0, 5);
};

export const getRecommendedTutors = async () => {
  const queryText = `
    select
    *
    from
    profiles
    limit 5
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

export const getSchoolById = async (userId, schoolId) => {
  const queryText = 'select * from schools left join favorite_schools on favorite_schools.school_id = schools.id and favorite_schools.profile_id = $2 where id = $1';
  const res = await client.query(queryText, [schoolId, userId]);
  return res.rows[0];
};
export const createMeeting = async (userId, {title, link, startDate, endDate, description}) => {
  startDate = Date.parse(startDate)
  endDate = Date.parse(endDate)

  console.log(startDate, endDate)
  startDate = startDate ? startDate : new Date()
  endDate = endDate ? endDate : new Date()
  
  console.log(startDate, endDate)

  const queryText = 'insert into meetings (title, link, start_date, end_date, created_by, description) values ($1, $2, to_timestamp($3), to_timestamp($4), $5, $6) returning *';
  const res = await client.query(queryText, [title, link, startDate, endDate, userId, description]);
  return res.rows[0];
};

export const deleteMeeting = async id => {
  const queryText = 'delete from meetings where id = $1 returning *';
  const res = await client.query(queryText, [id]);
  return res.rows[0];
};

export const updateMeeting = async ({id, title, startDate, endDate}) => {
  const queryText = 'update meetings set title = $1, start_date = $2, end_date = $3 where id = $4 returning *';
  const res = await client.query(queryText, [id, title, startDate, endDate]);
  return res.rows[0];
};

export const getCollegePosts = async id => {
  const queryText = 'select * from posts where school_id = $1';
  const res = await client.query(queryText, [id]);
  return res.rows;
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