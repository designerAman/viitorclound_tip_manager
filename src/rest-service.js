module.exports = function makeApiRoutes({ app, controllers, middlewares }) {
  initTestRoutes();
  initRegistrationAndProfileRoutes();

  function initTestRoutes() {
    app
      .route("/test")
      .get(controllers.testMessageAction);
  }

  function initRegistrationAndProfileRoutes() {
    app
      .route("/user/signUp")
      .post(
        middlewares.uploadImages.single('proPic'),
        controllers.registrationAndProfile.signUpAction,
      );
  }
};
