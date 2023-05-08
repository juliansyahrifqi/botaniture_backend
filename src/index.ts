import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { myDataSource } from "./app-data-source";

import routes from "./routes";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data source has been initialized")
  })
  .catch((error) => {
    console.log("Error during Data Source initialization", error);
  })

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/static', express.static('uploads'))

app.use("/api/v1", Object.values(routes));

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
});
