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

const successful = { id: 3, itemsSold: sales };

const deletedSuccessful = { type : null, message: 'Sale 1 successfully deleted' };

const itemsToUpdate = [ { productId: 1, quantity: 10 } ];

const updatedSucessful = { type: null, message: 'Sale 1 successfully updated' };

const fail = { type: 'INVALID_VALUE', message: 'Product not found' };

module.exports = {
  sales,
  successful,
  deletedSuccessful,
  itemsToUpdate,
  updatedSucessful,
  fail,
};