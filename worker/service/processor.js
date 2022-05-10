const dataSource = require("../dao/db");
module.exports = async (message) => {
  try {
    const urlObj = Object.fromEntries([message[1]]);
    const urlRepo = dataSource.getRepository("urls");
    await urlRepo.save(urlObj);
  } catch (error) {
    console.error(error.message);
  }
};
