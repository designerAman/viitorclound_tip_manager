module.exports = function makeVerifyUserAccessToken({
  chalk,
  userDb,
  AuthorizationError,
  handleError,
}) {
  return async function verifyUserAccessToken(req, res, next) {
    try {
      const token = req.headers.accesstoken;
      if (!token) {
        throw new AuthorizationError('Please provide a access token');
      }

      const userDetails = (await userDb.searchUserDetails({
        attributes: ['id', 'name', 'email', 'accessToken'],
        filterQuery: {
          accessToken: {
            values: [token],
          },
        },
      }))[0];

      if (!userDetails) {
        throw new AuthorizationError('Invalid access token');
      }

      req.userDetails = userDetails;
      return next();
    } catch (error) {
      console.log(chalk.red(`Error in verify access token of user`, error.message));
      console.log({ error });
      return handleError({ error, res });
    }
  }
}