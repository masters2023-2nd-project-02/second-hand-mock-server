import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';

dotenv.config();

const router = express.Router();

async function main() {
  const client = new MongoClient(process.env.MONGO_URL);
  await client
    .connect()
    .then(() => {
      console.log('connected to mongoDB');
    })
    .catch((err) => {
      console.log(err);
    });
  const db = client.db(process.env.DB_NAME);

  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.listen(process.env.PORT, () => {
    console.log('listening on 8080');
  });

  router.get('/', async (req, res) => {
    res.send('Hello World!');
  });

  // NOTE(jayden): 도시 설정 DELETE 코드(수정 필요)
  // app.delete('/towns/:townId', async (req, res) => {
  //   const collection = db.collection('towns/member');
  //   const townId = Number(req.params.townId);
  //
  //   collection.deleteOne({ 'data.town.townId': townId });
  // });

  // NOTE(jayden): mongoDB 통신 예시 코드
  // app.get('/issues', async (req, res) => {
  //   const collection = db.collection('issues');
  //   const result = await collection.find().toArray();
  //   res.json(result);
  // });
}

main();
