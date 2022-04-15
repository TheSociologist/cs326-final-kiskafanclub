import express from 'express';
import { Database } from './db.js';

class Server {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.post('/profile/create', async (req, res) => {
      try {
        const { id, name, university, description } = req.query;
        const profile = await self.db.createProfile(id, name, university, description);
        res.send(JSON.stringify(profile));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/profile/read', async (req, res) => {
      try {
        const { id } = req.query;
        const profile = await self.db.readProfile(id);
        res.send(JSON.stringify(profile));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.put('/profile/update', async (req, res) => {
      try {
        const { id, name, university, description } = req.query;
        const profile = await self.db.updateProfile(id, name, university, description);
        res.send(JSON.stringify(profile));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.delete('/profile/delete', async (req, res) => {
      try {
        const { id } = req.query;
        const profile = await self.db.deleteProfile(id);
        res.send(JSON.stringify(profile));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/profiles', async (req, res) => {
      try {
        const profiles = await self.db.readAllProfiles();
        res.send(JSON.stringify(profiles));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.post('/post/create', async (req, res) => {
      try {
        const { id, name, content } = req.query;
        const post = await self.db.createPost(id, name, content);
        res.send(JSON.stringify(post));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/post/read', async (req, res) => {
      try {
        const { id } = req.query;
        const post = await self.db.readPost(id);
        res.send(JSON.stringify(post));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.put('/post/update', async (req, res) => {
      try {
        const { id, name, age } = req.query;
        const post = await self.db.updatePost(id, name, age);
        res.send(JSON.stringify(post));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.put('/post/like', async (req, res) => {
      try {
        const { id } = req.query;
        const post = await self.db.likePost(id);
        res.send(JSON.stringify(post));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.delete('/post/delete', async (req, res) => {
      try {
        const { id } = req.query;
        const post = await self.db.deletePost(id);
        res.send(JSON.stringify(post));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/posts', async (req, res) => {
      try {
        const posts = await self.db.readAllPosts();
        res.send(JSON.stringify(posts));
      } catch (err) {
        res.status(500).send(err);
      }
    });
  }

  async initDb() {
    this.db = new Database(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`PeopleServer listening on port ${port}!`);
    });
  }
}

const server = new Server(process.env.DATABASE_URL);
server.start();
