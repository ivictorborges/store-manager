const errors = {
  INVALID_VALUE: 404,
  'string.min': 422,
  'string.required': 400,
  'any.required': 400,
  'number.min': 422,
  'number.required': 400,
};

const mapType = (type) => errors[type] || 500;

module.exports = mapType;