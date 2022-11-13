const Joi = require('joi');

const nameSchema = Joi.object({ name: Joi.string().min(5).required() });

const saleSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const salesValidator = (sales) => sales.reduce((prev, sale) => {
  if (prev) return prev;
  const validateResult = saleSchema.validate(sale);
  if (validateResult.error) return validateResult;
  return undefined;
}, undefined) || { error: null };

module.exports = {
  nameSchema,
  salesValidator,
};