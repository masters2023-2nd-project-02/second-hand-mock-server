import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { DeleteOptions, MongoClient } from 'mongodb';

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

  app.get('/products', async (req, res) => {
    const collection = db.collection('products');
    const result = await collection.find().toArray();
    const response = result[0];
    const pageNum = Number(req.query.pageNum) || 1;
    // TODO(jayden): townId, categoryId 필터링한 로직 작성하기
    const townId = Number(req.query.townId) || 1;
    const categoryId = Number(req.query.categoryId) || 1;

    res.json({
      ...response,
      data: {
        ...response.data,
        products: response.data.products.slice(
          (pageNum - 1) * 10,
          pageNum * 10,
        ),
      },
    });
  });

  app.get('/towns/member', async (req, res) => {
    const collection = db.collection('towns/member');
    const result = await collection.find().toArray();
    const response = result[0];
    res.json(response);
  });

  app.get('/towns', async (req, res) => {
    const collection = db.collection('towns');
    const result = await collection.find().toArray();
    const response = result[0];
    res.json(response);
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
