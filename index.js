const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const practice = require('./api/practice');
const products = require('./api/products');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/practice', practice);
app.use('/api/products', products);
app.use('/api/towns', products);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
