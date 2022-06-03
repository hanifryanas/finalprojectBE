require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/user', require('./routes/users.routes.js'));
app.use('/user/id', require('./routes/products.routes.js'));
// app.use('/auction-status', require('./routes/auction-status'));

const port = process.env.PORT || 5010;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});