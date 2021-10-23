module.exports = function makeTestMessage({
  testDb
}) {
  return async function testMessage() {
    const message1 = await testDb.testMessage();
    const message = `ViitorCloud Tip Manager app ${process.env.NODE_ENV || 'development'} server is running`;
    return message1 ? message: `Something went wrong in ViitorCloud Tip Manager ${process.env.NODE_ENV || 'development'} server`;
  };
};