const express = require('express');
const router = require('./routers');

const app = express();

app.use(express.json());
app.use('/products', router.productsRouter);
app.use('/sales', router.salesRouter);

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;