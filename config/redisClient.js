const redis = require("redis");
const constants = require("../config/constants");

const redisClient = redis.createClient();

async function get_set_data_redis(key, cb) {
  try {
    await redisClient.connect();
    const value = await redisClient.get(key);
    if (value) {
      await redisClient.quit();
      return {
        message: "Data fetched from Redis!",
        data: JSON.parse(value),
      };
    }
    const newData = await cb();
    await redisClient.setEx(
      key,
      constants.redis_data_exp,
      JSON.stringify(newData)
    );
    await redisClient.quit();
    return {
      message: "No Data in Redis!",
      data: newData,
    };
  } catch (error) {
    return {
      message: "Something went wrong!",
      error: error.message,
      data: [],
    };
  }
}

module.exports = { get_set_data_redis };
