const express = require("express");
const cors = require("cors");

const routes = require("./src/routes/index.route");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Default route!",
    data: [],
  });
});

app.use("/", routes.todoRoute);

app.listen(8000, (err) => {
  if (err) return `Server not running due to ${err.message}`;
  console.log(`Server listening at port 8000`);
});

// module.exports = app;
