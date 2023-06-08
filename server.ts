import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';

dotenv.config();

async function main() {
  const client = new MongoClient(process.env.MONGO_URL as string);
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

  app.get('/', async (req, res) => {
    res.send('Hello World!');
  });

  // NOTE(jayden): mongoDB 통신 예시 코드
  // app.get('/issues', async (req, res) => {
  //   const collection = db.collection('issues');
  //   const result = await collection.find().toArray();
  //   res.json(result);
  // });
}

main();
