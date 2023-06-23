const sales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const wrongSales = [
  {
    productId: 999,
    quantity: 10,
  },
  {
    productId: 1000,
    quantity: 30,
  },
];

const sale = [{
  "productId": 1,
  "quantity": 1
}];

const returnUpdated = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 1,
    }
  ],
};

const itemsToUpdate = [
  {
    productId: 1,
    quantity: 30,
  },
  {
    productId: 2,
    quantity: 60,
  },
];

const products = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

module.exports = {
  sales,
  wrongSales,
  sale,
  returnUpdated,
  itemsToUpdate,
  products,
};