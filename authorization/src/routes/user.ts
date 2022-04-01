import fs from "fs";
import path from "path";

import express, { NextFunction, Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "@/models/user";

import { PATH_TO_SRC } from "@/utils/paths";
import APIError from "@/utils/error";

import authMiddleware from "@/middlewares/auth";
import Database from "@/database";
import { Collection } from "mongodb";

type RequestData = {
  email: string;
  password: string;
};

class UsersController {
  public router: Router;
  public users: Collection<User>;
  
  private key = fs.readFileSync(
    path.resolve(PATH_TO_SRC, "keys", "private-key.pem")
  );

  constructor(db: Database) {
    this.users = db.users;

    this.router = express.Router();
    this.router.post("/sign_up", this.signup);
    this.router.post("/login", this.login);
    this.router.get("/me[0-9]", authMiddleware, this.me);
  }

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as RequestData;

      const user = await this.users.findOne({ email });

      if (user) {
        throw new APIError(409, "User already exists");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      this.users.insertOne({
        email,
        password: hashPassword,
      });

      res.send({
        status: "ok",
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.query as RequestData;

      const user = await this.users.findOne({ email });
      if (!user) {
        throw new APIError(401, "Email or password is incorrect");
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        throw new APIError(401, "Email or password is incorrect");
      }

      const accessToken = jwt.sign(
        {
          email: user.email,
          type: "access",
        },
        this.key,
        {
          expiresIn: Math.round(Math.random() * 30 + 30),
          algorithm: "RS256",
        }
      );

      const refreshToken = jwt.sign(
        {
          email: user.email,
          type: "refresh",
        },
        this.key,
        {
          expiresIn: 60 * 60,
          algorithm: "RS256",
        }
      );

      res.send({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

  me = async (req: Request, res: Response) => {
    const routeNumber = req.url[req.url.length - 1];
    const email = req.user!.email;

    res.send({
      request_num: routeNumber,
      data: {
        username: email,
      },
    });
  };
}

export default UsersController;
