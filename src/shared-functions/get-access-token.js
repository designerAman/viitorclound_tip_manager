module.exports = function makeGetAccessToken({
  Joi,
  uuid,
  userDb,
  ValidationError,
}) {
  return async function getAccessToken({ userId }) {
    console.log({userId});
    await validateInput({ userId });


    const accessToken = uuid.v4();

    await userDb.updateUserDetails({
      id: userId,
      userDetails: {
        accessToken,
      }
    });

    return accessToken;
  }

  async function validateInput({ userId }) {
    const schema = Joi.object({
      userId: Joi.number().required(),
    });

    const { error } = schema.validate({ userId });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}