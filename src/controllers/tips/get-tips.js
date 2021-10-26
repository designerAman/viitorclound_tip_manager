module.exports = function makeGetTipsAction({
  chalk,
  getTips,
  handleError,
}) {
  return async function getTipsAction(req, res) {
    const analyticsType = req.query.analyticsType;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const userId = req.userDetails.id;

    try {
      const tips = await getTips({ analyticsType, startDate, endDate, userId});

      return res.json({
        status: 'success',
        data: tips,
      });
    } catch (error) {
      console.log(chalk.red(`Error in get tips by user of id: ${userId}`, error.message));
      console.log({ error });
      return handleError({ error, res });
    }
  }
}