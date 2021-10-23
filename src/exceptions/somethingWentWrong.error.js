class SomethingWentWrongError extends Error {
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SomethingWentWrongError);
    }

    this.name = "SomethingWentWrongError";
    // Custom debugging information
    this.httpStatusCode = 500;
    this.date = new Date();
  }
}

module.exports = SomethingWentWrongError;
