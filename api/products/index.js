const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
