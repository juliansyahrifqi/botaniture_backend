import "reflect-metadata";
import express from "express";
import { myDataSource } from "./app-data-source";

import user from "./routes/user";

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

app.use("/api/v1", user)

app.listen(3005, () => {
  console.log("Server running at port 3005")
});
