import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import blogRoutes from "./blogs/blogs.routes";
import authRoutes from "./auth/auth.routes";

require("./auth/auth.google.middleware");

const app = express();
app.disable("x-powered-by");

app.use(helmet({
    xFrameOptions: { action: 'deny' },
    xContentTypeOptions: true,
    referrerPolicy: { policy: 'no-referrer' },
    hidePoweredBy: true
}));

app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);

let corsOptions = {
  origin: ["https://taveralabs.com", "https://preview.taveralabs.com", "https://accounts.google.com"],
  optionsSuccessStatus: 200, // For legacy browser support
};

if (process.env.NODE_ENV === "development") {
  corsOptions.origin.push("http://localhost:9002");
}

app.use(cors(corsOptions));

app.use(
  express.json({
    limit: "20mb",
  })
);

app.use("/api", blogRoutes);
app.use("/api", authRoutes);

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Content not found");
});

// Centralized error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

export default app;
