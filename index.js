const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const practice = require('./api/practice');
const products = require('./api/products');
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('api/practice', practice);
app.use('/products', products);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
