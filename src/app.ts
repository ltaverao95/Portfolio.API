import express from "express";
import cors from "cors";
import helmet from "helmet";

import blogRoutes from "./blogs/blogs.routes";
import authRoutes from "./auth/auth.routes";

const app = express();
app.disable("x-powered-by");

app.use(helmet({
    xFrameOptions: { action: 'deny' },
    xContentTypeOptions: true,
    referrerPolicy: { policy: 'no-referrer' }
}));

let corsOptions = {
  origin: ["https://taveralabs.com"],
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
app.use("/api/auth", authRoutes);

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Content not found");
});

export default app;
