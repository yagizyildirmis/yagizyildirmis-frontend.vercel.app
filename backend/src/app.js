import cors from "cors";
import express from "express";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501007",
  });
});

app.use("/events", eventRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ error: { message: "Invalid JSON body" } });
  }

  console.error(error);
  return res.status(500).json({ error: { message: "Internal server error" } });
});

export default app;
