const sales = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-17T15:06:24.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-17T15:06:24.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-11-17T15:06:24.000Z"
  }
]

const sale = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-17T15:06:24.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-17T15:06:24.000Z"
  }
]

const newSales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const newSale = {
  "productId": 1,
  "quantity": 1
}

const updateSales = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]

const updateSale = {
  "productId": 1,
  "quantity": 10
}

const id = { id: 1 }

module.exports = {
  sales,
  sale,
  newSale,
  newSales,
  id,
  updateSale,
  updateSales,
}