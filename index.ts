import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import documentRoutes from "./routes/documentRoutes";
import bodyParser from "body-parser";
import sequelize from "./database/database";
import cors from "cors";

dotenv.config();
sequelize.sync().then(() => console.log("sucess"));
const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", documentRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
