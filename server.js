require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.use('/user', require('./routes/users.routes.js'));
app.use('/user/id', require('./routes/products.routes.js'));
app.use('/user/id/:id/product/:productId/bid', require('./routes/orders.routes.js'));

app.listen(port, () => {
    console.log('Server started on port ' + port);
});