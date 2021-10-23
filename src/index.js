const express = require("express");
const cors = require("cors");

const controllers = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const makeApiRoutes = require("./rest-service");
makeApiRoutes({
  app,
  controllers,
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});