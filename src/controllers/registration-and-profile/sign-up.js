module.exports = function makeSignUpAction({
  fs,
  chalk,
  signUp,
  handleError,
}) {
  return async function signUpAction(req, res) {
    const { name, email, password } = req.body;
    const profilePicture = req.file;

    try {
      const signUpData = await signUp({ name, email, password, profilePicture });

      return res.status(201).json(signUpData);
    } catch (error) {
      console.log(chalk.red(`Error in signUp user with details: ${JSON.stringify(req.body)}`, error.message));
      console.log({ error });

      if (profilePicture) {
        fs.unlinkSync(`${profilePicture.path}`);
      };
      return handleError({ error, res });
    }
  };
}
