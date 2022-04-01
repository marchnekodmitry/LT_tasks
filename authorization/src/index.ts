import express from "express";
import bodyParser from "body-parser";
import userRouter from "@/routes/user";
import errorMiddleware from "@/middlewares/error";
import Database from "./database";
import UsersController from "@/routes/user";

const app = express();
const PORT = 3100;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorMiddleware);

const main = async () => {
  const db = await Database.init();
  const uc = new UsersController(db)

  app.use(uc.router);
  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
};

main();
