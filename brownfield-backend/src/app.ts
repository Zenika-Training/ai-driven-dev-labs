import "reflect-metadata";
import cors from "cors";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { initializeDatabase } from "./database";
import { petRouter } from "./pet/petRouter";
import { vetRouter } from "./vet/vetRouter";
import { visitRouter } from "./visit/visitRouter";
import { invoiceRouter } from "./invoice/invoiceRouter";

export const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["*"],
    credentials: true,
  }),
);
app.use(express.json());

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pet Clinic API",
      version: "1.0.0",
      description: "Brownfield Pet Clinic API",
    },
  },
  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/pets", petRouter);
app.use("/api/v1/vets", vetRouter);
app.use("/api/v1/visits", visitRouter);
app.use("/api/v1/invoices", invoiceRouter);

const PORT = process.env.PORT ?? 8080;

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
