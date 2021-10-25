module.exports = function makeCalculateTipAction({
  chalk,
  calculateTip,
  handleError,
}) {
  return async function calculateTipAction(req, res) {
    const place = req.body.place;
    const totalAmount = req.body.totalAmount;
    const tipPercentage = req.body.tipPercentage;
    const userId = req.userDetails.id;

    try {
      const tipAmount = await calculateTip({ place, totalAmount, tipPercentage, userId });

      return res.json({
        status: 'success',
        data: tipAmount,
      });
    } catch (error) {
      console.log(chalk.red(`Error in calculate tip with details ${JSON.stringify(req.body)} of user of id: ${userId}`, error.message));
      console.log({ error });
      return handleError({ error, res });
    }
  }
}