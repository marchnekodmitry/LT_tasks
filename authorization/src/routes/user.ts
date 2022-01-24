import fs from 'fs';
import path from 'path';
import { URL } from 'url';

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import DB from '@/database';

import { User } from '@/models/user';

import { PATH_TO_SRC } from '@/utils/paths';
import APIError from '@/utils/error';

import authMiddleware from '@/middlewares/auth';

const userRouter = express.Router();

type RequestData = {
  email: string;
  password: string;
}

userRouter.post('/sign_up', async (req, res, next) => {
  try {
    const { email, password } = req.body as RequestData;

    const user = await DB.user.collection<User>('users').findOne({ email });

    if (user) {
      throw new APIError(409, 'User already exists');
    };

    const salt = bcrypt.genSaltSync(10);

    const hashPassword = bcrypt.hashSync(password, salt);

    DB.user.collection<User>('users').insertOne({
      email,
      password: hashPassword,
    });

    res.send({
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.query as RequestData;

    const user = await DB.user.collection<User>('users').findOne({ email });

    if (!user) {
      throw new APIError(401, 'Email or password is incorrect');
    };

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      throw new APIError(401, 'Email or password is incorrect');
    }

    const key = fs.readFileSync(path.resolve(PATH_TO_SRC, 'keys', 'private-key.pem'));
console.log(Math.round(Math.random() * 30 + 30) * 1000);
    const accessToken = jwt.sign(
      {
        email: user.email,
        type: 'access',
      },
      key,
      {
        expiresIn: Math.round(Math.random() * 30 + 30),
        algorithm: 'RS256',
      },
    );

    const refreshToken = jwt.sign(
      {
        email: user.email,
        type: 'refresh',
      },
      key,
      {
        expiresIn: 60 * 60,
        algorithm: 'RS256',
      },
    );

    res.send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get('/me[0-9]', authMiddleware, async (req, res) => {
  const routeNumber = req.url[req.url.length - 1];
  const email = res.locals.userInfo.email;

  res.send({
    request_num: routeNumber,
    data: {
      username: email,
    },
  });
});

export default userRouter;
