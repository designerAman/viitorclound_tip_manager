module.exports = function makeLogin({
  Joi,
  userDb,
  verifyHashedString,
  getAccessToken,
  ValidationError,
  NotFoundError,
  AuthorizationError,
}) {
  return async function login({ email, password }) {
    await validateInput({ email, password });

    const user = (await userDb.searchUserDetails({
      attributes: ['id', 'password', 'name', 'email'],
      filterQuery: {
        email: {
          values: [email]
        },
      },
    }))[0];

    if (!user) {
      throw new NotFoundError('Invalid email');
    }

    const isCorrectedPassword = verifyHashedString({
      string: password,
      hash: user.password,
    });

    if (!isCorrectedPassword) {
      throw new AuthorizationError('Password is incorrect');
    }

    const token = await getAccessToken({
      userId: user.id,
    });

    delete user.password;
    user.token = token;

    return {
      message: "Successfully LoggedIn",
      data: user,
    };
  }

  async function validateInput({ email, password }) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ email, password });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
}