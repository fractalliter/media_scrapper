const cluster = require("cluster");
const os = require("os");
const DataSource = require("./dao/db");

module.exports = DataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch(console.error);

if (cluster.isMaster) {
  // Fork the process for every cpu on the machine with a processIndex environment varaible for every of them
  //for (let i = 0; i < os.cpus().length; i++) cluster.fork({ CPU_INDEX: i });
  cluster.fork({ CPU_INDEX: 1 })
} else {
  require("./service/worker");
}
