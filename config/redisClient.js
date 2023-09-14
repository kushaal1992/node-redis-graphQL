const redis = require("redis");

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
    await redisClient.setEx(key, 3600, JSON.stringify(newData));
    await redisClient.quit();
    return {
      message: "Data fetched from API !",
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
