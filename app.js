const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./src/routes/index.route");
const { formatResponse } = require("./src/utils/apiResponse");

const app = express();
const port = parseInt(process.env.PORT);

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  formatResponse(res, 200, `App running on ${port}!`, [])
});

app.use("/", routes.todoRoute);

app.listen(port, (err) => {
  if (err) return `Server not running due to ${err.message}`;
  console.log(`Server listening at port ${port}`);
});

// module.exports = app;
