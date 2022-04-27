import express from 'express';
import logger from 'morgan'
import { createPost, updatePost, likePost, deletePost, deleteComment, updateProfile, getFeed, createAccount, createComment, createMeeting, deleteAccount, deleteMeeting, getCollegePosts, getComments, getOngoingMeetings, getPostById, getProfile, getRecommendedSchools, getRecommendedTutors, getSchoolById, getSchools, verifyCreds } from './database.js';

const app = express();
const port = process.env.PORT || 3000;
let db = undefined;

// Add Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('combined'));
app.use(express.static('client'));

app.get('/search', async (req, res) => {
  const { query } = req.query
  const schools = await searchSchools()
  res.send(JSON.stringify(schools));
})

app.post('/post/create', async (req, res) => {
  try {
    const post = await createPost(req.body)
    res.send(JSON.stringify(post));
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/post/read', async (req, res) => {
  try {
    const { id } = req.query;
    const post = await getPostById(id)
    res.send(JSON.stringify(post));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/post/update', async (req, res) => {
  try {
    await updatePost(req.body)
    res.send(JSON.stringify({status: 'successful'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/post/like', async (req, res) => {
  try {
    const { id } = req.query;
    const userId = 2;
    await likePost(id, userId)
    res.send(JSON.stringify({status: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/post/delete', async (req, res) => {
  try {
    const { id } = req.query;
    await deletePost(id);
    res.send(JSON.stringify({status: 'deleted successfully'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/post/comments', async (req, res) => {
  try {
    const { id } = req.query;
    const comments = await getComments(id)
    res.send(JSON.stringify(comments));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/post/comments/create', async (req, res) => {
  try {
    const comment = await createComment(req.body)
    res.send(comment);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/post/comments/delete', async (req, res) => {
  try {
    const {commentId} = req.query;
    await deleteComment(commentId)
    res.send({status: 'success'});
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/feed', async (req, res) => {
  console.log('over here')
  try {
    const posts = await getFeed()
    console.log(posts)
    res.send(JSON.stringify(posts));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/recommended-schools', async (req, res) => {
  try {
    const schools = await getRecommendedSchools()
    res.send(JSON.stringify(schools));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/recommended-tutors', async (req, res) => {
  try {
    const tutors = await getRecommendedTutors()
    res.send(JSON.stringify(tutors));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/schools', async (req, res) => {
  try {
    const schools = await getSchools()
    res.send(JSON.stringify(schools));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/ongoing-meetings/create', async (req, res) => {
  try {
    const meeting = createMeeting(req.body)
    res.send(JSON.stringify(meeting));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/ongoing-meetings/read', async (req, res) => {
  try {
    const ongoingMeetings = await getOngoingMeetings()
    res.send(JSON.stringify(ongoingMeetings));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/ongoing-meetings/update', async (req, res) => {
  try {
    await updateMeeting(req.body)
    res.send(JSON.stringify({value: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/ongoing-meetings/delete', async (req, res) => {
  try {
    const { id } = req.query;
    await deleteMeeting(id)
    res.send(JSON.stringify({value: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/profile/create', async (req, res) => {
  try {
    const { name, password, email } = req.body;
    await createAccount(name, email, password)
    res.send(JSON.stringify({value: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

//make fetch to this route and get object with all profile info fields
//document.getelementbyid each element from the server
//save data im fetching from server using variable, let profile
//every time i make fetch to backend for profile i set that variable equal to what i get from the server
//create a function that handles variable to field mapping
app.get('/profile/read', async (req, res) => {
  try {
    const profile = await getProfile()
    res.send(JSON.stringify(profile));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/profile/update', async (req, res) => {
  try {
    await updateProfile(req.body)
    res.send(JSON.stringify({value: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/profile/delete', async (req, res) => {
  try {
    const { id } = req.query;

    await deleteAccount(id)
    res.send(JSON.stringify({value: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/college', async (req, res) => {
  const college = await getSchoolById(req.query.id)
  res.send(JSON.stringify(college));
})

app.get('/college/posts', async (req, res) => {
  try {
    const posts = await getCollegePosts(req.query.id)
    res.send(JSON.stringify(posts));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/sign-in', async(req, res)=>{
  try{
    const {password, email} = req.body;
    const result = await verifyCreds(email, password);
    if (result) {
      res.send(JSON.stringify({value: 'success'}));
    } else {
      res.status(403).send(JSON.stringify({value: 'failure'}));
    }
    
    } catch(err){
      res.status(500).send(err);
    }
});

app.all('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

async function initDb() {
  db = new PeopleDatabase(process.env.DATABASE_URL);
  await db.connect();
}

async function start() {
  await initDb();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`PeopleServer listening on port ${port}!`);
  });
}

start();