const dataSource = require("../dao/db");

const urlRepo = dataSource.getRepository("urls");

module.exports = async (message) => {
  try {
    const urlObj = Object.fromEntries([message[1]]);
    await urlRepo.save(urlObj);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
