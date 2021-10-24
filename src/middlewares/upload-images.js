module.exports = function makeUploadImages({
  multer,
  config,
}) {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config.image.path);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ".jpg");
    },
  });
  let uploadImage = multer({
    storage: storage
  });

  return uploadImage;
};