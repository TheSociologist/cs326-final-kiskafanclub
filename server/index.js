import express from 'express';
import logger from 'morgan'
import { faker } from '@faker-js/faker';

const app = express();
const port = process.env.PORT || 3000;

// Add Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('combined'));
app.use(express.static('client'));

app.get('/search', async (req, res) => {
  const { query } = req.query
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
  res.send(JSON.stringify(schools));
})

app.post('/post/create', async (req, res) => {
  try {
    const { id, name, content } = req.query;
    const post = await self.db.createPost(id, name, content);
    res.send(JSON.stringify(post));
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/post/read', async (req, res) => {
  try {
    const { id } = req.query;
    const post = await self.db.readPost(id);
    res.send(JSON.stringify(post));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/post/update', async (req, res) => {
  try {
    const { id, name, age } = req.query;
    res.send(JSON.stringify({status: 'successful'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/post/like', async (req, res) => {
  try {
    const { id } = req.query;
    res.send(JSON.stringify({status: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/post/delete', async (req, res) => {
  try {
    const { id } = req.query;
    const post = await self.db.deletePost(id);
    res.send(JSON.stringify(post));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/post/comments', async (req, res) => {
  try {
    const { id } = req.query;
    const comments = []
    for (let i = 0; i < 100; i++) {
      const comment = {
        id: faker.datatype.number(),
        text: faker.lorem.paragraph(),
      }
      comments.push(comment)
    }
    res.send(JSON.stringify(comments));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/post/comments/create', async (req, res) => {
  try {
    
    res.send({
      ...req.body,
      id: faker.datatype.number(),
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/post/comments/delete', async (req, res) => {
  try {
    res.send({status: 'success'});
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/feed', async (req, res) => {
  try {
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
    res.send(JSON.stringify(posts));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/recommended-schools', async (req, res) => {
  try {
    const schools = []
    for (let i = 0; i < 5; i++) {
      const school = {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
      }
      schools.push(school)
    }
    res.send(JSON.stringify(schools));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/recommended-tutors', async (req, res) => {
  try {
    const schools = []
    for (let i = 0; i < 5; i++) {
      const school = {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
      }
      schools.push(school)
    }
    res.send(JSON.stringify(schools));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/ongoing-meetings', async (req, res) => {
  try {
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
    res.send(JSON.stringify(meetings));
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/school', async (req, res) => {

  const school = {
    id: faker.datatype.number(),
    name: faker.commerce.product(),
    banner: faker.image.abstract(),
    icon: faker.image.abstract(),
    description: faker.lorem.paragraph(),
  }
  res.send(JSON.stringify(school));
})

app.get('/schools', async (req, res) => {
  try {
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
    res.send(JSON.stringify(schools));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/ongoing-meetings/create', async (req, res) => {
  try {
    const { id } = req.body;
    res.send(JSON.stringify({value: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/ongoing-meetings/read', async (req, res) => {
  try {
    const ongoingMeetings = []
    for (let i = 0; i < 5; i++) {
      const ongoingMeeting = {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
        university: faker.commerce.product(),
        description: faker.lorem.paragraph(),
        logo: faker.image.abstract(),
        profile: faker.image.abstract(),
        meetingLength: faker.datatype.number(120),
      }
      ongoingMeetings.push(ongoingMeeting);
    }
    res.send(JSON.stringify(ongoingMeetings));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/ongoing-meetings/update', async (req, res) => {
  try {
    const { id, name, university, description, logo, profile, meetingLength } = req.body;
    res.send(JSON.stringify({value: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/ongoing-meetings/delete', async (req, res) => {
  try {
    const { id } = req.query;
    res.send(JSON.stringify({value: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/profile/create', async (req, res) => {
  try {
    const { name, password, email } = req.body;
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
app.post('/profile/read', async (req, res) => {
  try {
    const profile = {
      id: faker.datatype.number(),
      name: faker.commerce.product(),
      university: faker.commerce.product(),
      gradYear: faker.datatype.number(2030),
      major: faker.commerce.product(),
      aboutMe: faker.lorem.paragraph(),
      resume: faker.image.technics(),
    }
    res.send(JSON.stringify(profile));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/profile/update', async (req, res) => {
  try {
    const { id, name, university, gradYear, major, aboutMe, resume } = req.body;
    res.send(JSON.stringify({value: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/profile/delete', async (req, res) => {
  try {
    const { id } = req.query;
    res.send(JSON.stringify({value: 'success'}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/college', (req, res) => {
  const school = {
    id: faker.datatype.number(),
    name: faker.commerce.product(),
    banner: faker.image.abstract(),
    icon: faker.image.abstract(),
    description: faker.lorem.paragraph(),
  }
  res.send(JSON.stringify(school));
})


app.get('/college/posts', async (req, res) => {
  try {
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
    res.send(JSON.stringify(posts));
  } catch (err) {
    res.status(500).send(err);
  }
});



app.post('/sign-in', async(req, res)=>{
  try{
    const{password, email} = req.body;

    res.send(JSON.stringify({value:'success'}));
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
