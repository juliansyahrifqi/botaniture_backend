import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { myDataSource } from "./app-data-source";

import swaggerUI from 'swagger-ui-express'
import swaggerJSdoc from 'swagger-jsdoc'

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

// swagger definition
const swaggerSpec = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Botaniture API',
          version: '1.0.0',
      },
      servers: [
          {
              url: `http://localhost:${process.env.PORT}/api/v1`,
          }
      ]
  },
  apis: ['src/routes/*.ts'],
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('uploads'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSdoc(swaggerSpec)));
app.use("/api/v1", Object.values(routes));

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
});
