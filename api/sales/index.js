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
    const collection = db.collection('sales');
    const result = await collection.find().toArray();
    const response = result[0];
    const pageNum = Number(req.query.pageNum) || 1;
    const status = Number(req.query.status) || 0;

    res.json({
      ...response,
      data: {
        ...response.data,
        products: response.data.products
          .filter((product) => product.status === status)
          .slice((pageNum - 1) * 10, pageNum * 10),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
