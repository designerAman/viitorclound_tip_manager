const path = require('path');

const config = {
  mysql: {
    host: "127.0.0.1",
    db: "viitorcloud_tip_manager",
    user: "root",
    password: "Root@123",
  },
  image: {
    path: path.join(`${__dirname}/../../../assets/uploads`)
  }
};

module.exports = {
  config
};