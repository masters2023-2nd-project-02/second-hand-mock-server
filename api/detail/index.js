const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

router.get('/:id', async (req, res) => {
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
    const { id } = req.params;
    console.log(req.params.id);
    res.json({
      status: 200,
      message: `product id: ${id}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

module.exports = router;