import express from "express";
import { handlerReadiness } from "./handler_readiness.js";
import { middlewareLogResponse, middlewareMetricsInc } from "./middleware.js";
import { handlerMetrics } from "./metrics.js";
import { handlerReset } from "./reset.js";
import { handlerChirpsValidate } from "./chirps.js";

const app = express();
const PORT = 8080;

// Built-in JSON body parsing middleware
app.use(express.json());
app.use(middlewareLogResponse);

app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", handlerReset);
app.get("/api/healthz", handlerReadiness);
app.post("/api/validate_chirp", handlerChirpsValidate);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
