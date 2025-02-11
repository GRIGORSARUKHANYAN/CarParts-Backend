import express from "express";
import carPartRoutes from "./routes/carPart.routes.js";
// import fs from "fs"
// import path from "path"
// import { parse } from "yaml";
// import swaggerUI from "swagger-ui-express";
import mongoose from 'mongoose';
import cors from 'cors'


const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGOLINK)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
app.use(cors())
app.use("/api", carPartRoutes);
// function setupSwagger() {
//   const fileContents = fs.readFileSync(
//     path.join(path.resolve(), "app.yml"),
//     "utf8"
//   );
//   const doc = parse(fileContents);
//   app.use("/api-docs", swaggerUI.serve, swaggerUI. setup(doc));
// }
// setupSwagger()
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
