const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const root = require('./api/root');
const products = require('./api/products');
const towns = require('./api/towns');
const townsMember = require('./api/towns/member');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', root);
app.use('/api/products', products);
app.use('/api/towns', towns);
app.use('/api/towns/member', townsMember);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
