const express = require("express");
const cors = require("cors");
const path = require("path");

const controllers = require("./controllers");
const middlewares = require("./middlewares");

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public/user", express.static(path.join(__dirname + "/../assets/uploads")));

const makeApiRoutes = require("./rest-service");
makeApiRoutes({
  app,
  controllers,
  middlewares,
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});