require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/auction-status', require('./routes/auction-status'));

const port = process.env.PORT || 5010;
app.listen(port, () => {
    console.log('Server started on port 5000');
});