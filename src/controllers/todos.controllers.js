const axios = require("axios");
const get_set_data = require("../../config/redisClient").get_set_data_redis;

async function getAllTodos(req, res) {
  try {
    const { req_data } = req.query ? req.query : "todos";
    const todos = await get_set_data(req_data, async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return data;
    });
    return res.status(200).json({
      message: "Data fetched!",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: [],
    });
  }
}

module.exports = { getAllTodos };
