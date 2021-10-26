module.exports = function makeGetTipsAction({
  Joi,
  tipDb,
  ValidationError,
}) {
  return async function getTips ({ analyticsType, startDate, endDate, userId }) {
    await validateInput({ analyticsType, startDate, endDate, userId });

    const tips = await tipDb.searchTipDetails({
      analyticsType,
      startDate,
      endDate,
      userId,
    });

    return tips;
  }

  async function validateInput({ analyticsType, startDate, endDate, userId }) {
    const schema = Joi.object({
      analyticsType: Joi.string().valid(),
      startDate: Joi.date().iso(),
      endDate: Joi.date().iso(),
      userId: Joi.number().required(),
    });

    const { error } = schema.validate({ analyticsType, startDate, endDate, userId });
    if (error) {
      throw new ValidationError(error.message);
    }

    console.log(new Date(startDate), new Date(endDate));

    if(new Date(startDate) > new Date(endDate)) {
      throw new ValidationError('Start date cannot be greater than end date')
    }
  }
}