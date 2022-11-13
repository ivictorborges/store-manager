const validations = require('./validations/schemas');
const mapType = require('../utils/mapType');

const saleVerifier = async (req, res, next) => {
  const sales = req.body;
  const { error } = validations.salesValidator(sales);
  if (error) {
    return res.status(mapType(error.details[0].type))
      .json({ message: error.details[0].message });
  }

  next();
};

module.exports = saleVerifier;