const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const Logger = require('./utils/logger');

let server;
mongoose.connect(config.mongoose.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        Logger.log("Connected to MongoDB", "info"); 
        server = app.listen(config.port, () => {
            Logger.log(`Listening to port ${config.port}`, "info");
        });
    });

const exitHandler = () => {
    if (server) {
        server.close(() => {
            Logger.log("Server closed", "info");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }

}

const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    Logger.log("SIGTERM received", "info");
    if (server) {
        server.close();
    }
})