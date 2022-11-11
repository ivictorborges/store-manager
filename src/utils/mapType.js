const errors = {
  INVALID_VALUE: 404,
};

const mapType = (type) => errors[type] || 500;

module.exports = mapType;