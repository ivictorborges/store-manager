const productsList = [
  {
    id: 1,
    name: 'Martelo do Thor',
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

const successfulList = { type: null, message: productsList };

const successfulId = { type: null, message: productsList[0] };

const productMock = { name: 'New product' };

const productPosted = { type: null, message: productMock };

const productPutted = { type: null, message: { name: 'Martelo do Batman', id: 1 } }

module.exports = {
  successfulList,
  successfulId,
  productPosted,
  productPutted,
};