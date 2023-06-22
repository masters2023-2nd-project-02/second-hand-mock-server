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
    const collection = db.collection('like');
    const result = await collection.find().toArray();
    const response = result[0];
    const pageNum = Number(req.query.pageNum) || 1;
    const categoryId = Number(req.query.categoryId) || 0;
    const getCategoryIds = response.data.products.map(
      (productInfo) => productInfo.categoryId,
    );

    res.json({
      ...response,
      data: {
        ...response.data,
        categoryIds: Array.from(new Set(getCategoryIds)).sort((a, b) => a - b),
        products:
          categoryId === 0
            ? response.data.products
            : response.data.products
                .filter((product) => product.categoryId === categoryId)
                .slice((pageNum - 1) * 10, pageNum * 10),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
