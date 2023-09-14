const express = require("express");
const ctrls = require("../controllers/index.controller");

const router = express.Router();

router.get("/todos", ctrls.todoCtrl.getAllTodos);

module.exports = router;
