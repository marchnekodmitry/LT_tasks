import fs from 'fs';
import path from 'path';

import { RequestHandler } from "express"
import jwt from 'jsonwebtoken';

import { PATH_TO_SRC } from '@/utils/paths';

const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new Error();

    const key = fs.readFileSync(path.resolve(PATH_TO_SRC, 'keys', 'public-key.pem'));

    const userInfo = jwt.verify(token, key, { algorithms: ['RS256'] });

    if (userInfo.exp! < Date.now() / 1000) {
      throw new Error();
    }

    res.locals.userInfo = userInfo;

    next();
  } catch (error) {
    res.status(401).send({
      error: {
        message: 'Unauthorized',
      },
    });
  }
};

export default authMiddleware;
