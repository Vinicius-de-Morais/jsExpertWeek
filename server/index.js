import server from "./server.js";
import { logger } from "./utils.js"
import config from "./config.js"

server.listen(config.port)
.on('listening', () => logger.info(`server running at ${config.port}`))
// impede a aplicação cair caso um erro não trado aconteça
// uncaughtException == throw
// unhandledRejection == Promisses
process.on("uncaughtException", error => logger.error(`uncaughtException happened: ${error.stack || error}`))
process.on("unhandledRejection", error => logger.error(`unhandledRejection happened: ${error.stack || error}`))