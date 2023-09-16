const axios = require("axios");
const get_set_data = require("../../config/redisClient").get_set_data_redis;
const { formatResponse } = require("../utils/apiResponse");

async function getAllTodos(req, res) {
  try {
    const { key } = req.query ? req.query : "todos";
    const todos = await get_set_data(key, async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return data;
    });
    return formatResponse(res, 200, "Data fetched!", todos);
  } catch (error) {
    return formatResponse(res, 500, error.message, []);
  }
}

module.exports = { getAllTodos };
