module.exports = function makeApiRoutes({ app, controllers, middlewares }) {
  initTestRoutes();
  initRegistrationAndProfileRoutes();
  initTipRoutes();

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

    app
      .route("/user/login")
      .post(
        controllers.registrationAndProfile.loginAction,
      );
  }

  function initTipRoutes() {
    app
    .route("/tip/calculate")
    .post(
      middlewares.verifyUserAccessToken,
      controllers.tips.calculateTipAction,
    );
  }
};
