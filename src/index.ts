import * as dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    console.info(`Server running in ${process.env.NODE_ENV} mode`);
  }

  console.info(`listening on port ${port} `);
});
