import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { myDataSource } from "./app-data-source";

import routes from "./routes/index";

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

app.use("/api/v1", routes.servicesRoute);
app.use("/api/v1", routes.contactRoute);
app.use("/api/v1", routes.paymentMethodRoute);
app.use("/api/v1", routes.productCategoryRoute);
app.use("/api/v1", routes.productRoute);

const PORT = process.env.PORT || 3010;


app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
});
