import express from "express";
import { handlerReadiness } from "./handler_readiness.js";
import {
  errorMiddleWare,
  middlewareLogResponse,
  middlewareMetricsInc,
} from "./middleware.js";
import { handlerMetrics } from "./metrics.js";
import { handlerReset } from "./reset.js";
import { handlerChirpsValidate } from "./chirps.js";

const app = express();
const PORT = 8080;

// Built-in JSON body parsing middleware
app.use(express.json());
app.use(middlewareLogResponse);

app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", (req, res, next) => {
  Promise.resolve(handlerReadiness(req, res)).catch(next);
});
app.get("/admin/metrics", (req, res, next) => {
  Promise.resolve(handlerMetrics(req, res)).catch(next);
});
app.post("/admin/reset", (req, res, next) => {
  Promise.resolve(handlerReset(req, res)).catch(next);
});

app.post("/api/validate_chirp", (req, res, next) => {
  Promise.resolve(handlerChirpsValidate(req, res)).catch(next);
});

app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
