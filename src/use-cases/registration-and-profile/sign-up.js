module.exports = function makeSignUp({
  Joi,
  momentTZ,
  fs,
  userDb,
  validatePassword,
  createStringHash,
  getAccessToken,
  sendEmail,
  ValidationError,
  AlreadyExistsError,
}) {
  return async function signUp({ name, email, password, profilePicture }) {
    await validateInput({ name, email, password, profilePicture });

    const userDetails = (await userDb.searchUserDetails({
      attributes: ['id'],
      filterQuery: {
        email: {
          values: [email]
        },
      },
    }))[0];

    if (userDetails) {
      throw new AlreadyExistsError('User with this email is already signUped');
    }

    password = await createStringHash(password);
    profilePic = profilePicture.filename;

    const registeredUserDetails = await userDb.addUser({
      userDetails: {
        name,
        email,
        password,
        profilePicture: profilePic,
        createdAt: momentTZ.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
      },
    });

    const token = await getAccessToken({ userId: +registeredUserDetails.insertId });

    await userDb.updateUserDetails({
      id: registeredUserDetails.insertId,
      userDetails: {
        profilePicture: `${registeredUserDetails.insertId}.jpg`,
      }
    });

    fs.renameSync(`${profilePicture.path}`, `${profilePicture.destination}/${registeredUserDetails.insertId}.jpg`);

    sendEmail({
      email,
      subject: 'Account Created',
      html: `<p>Congratulations Your account is successfully created in Tip Manager App.</p>`,
    });

    return {
      name,
      token
    };
  }

  async function validateInput({ name, email, password, profilePicture }) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      profilePicture: Joi.object().required(),
    });

    const { error } = schema.validate({ name, email, password, profilePicture });

    if (error) {
      throw new ValidationError(error.message);
    }

    const checkPassword = validatePassword({ password });

    if (!checkPassword.isValidPassword) {
      throw new ValidationError(checkPassword.message);
    }
  }
}