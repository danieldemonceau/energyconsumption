import express, { Response } from "express";
const bodyParser = require("body-parser");
const app = express();
const port = 9000;
import logger from "./logger";

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

require("./routes")(app);

app
  .listen(port)
  .on("listening", () => logger.info(`Server running on port ${port}`));

process.on('unhandledRejection', (error, promise) => {
  logger.error(
    ` Oh Lord! We forgot to handle a promise rejection here: `,
    promise
  )
  logger.error(` The error was: `, error)
});

app.use((err: any, res: Response) => {
  if (err.stack) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
});

export {};
