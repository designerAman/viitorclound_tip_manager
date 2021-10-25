module.exports = function makeCalculateTip({
  Joi,
  momentTZ,
  tipDb,
  ValidationError,
}) {
  return async function calculateTip({ place, totalAmount, tipPercentage, userId }) {
    await validateInput({ place, totalAmount, tipPercentage, userId });

    await tipDb.addTip({
      tipDetails: {
        userId,
        place,
        totalAmount,
        tipPercentage,
        createdAt: momentTZ.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
      }
    });

    const tipAmount = (+totalAmount / 100) * +tipPercentage;

    return tipAmount.toFixed(2);
  }

  async function validateInput({ place, totalAmount, tipPercentage, userId }) {
    const schema = Joi.object({
      place: Joi.string().required(),
      totalAmount: Joi.number().required(),
      tipPercentage: Joi.number().required(),
      userId: Joi.number().required(),
    });

    const { error } = schema.validate({ place, totalAmount, tipPercentage, userId });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}