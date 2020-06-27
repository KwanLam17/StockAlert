import {Request, Response, NextFunction} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('login', async (error, user, info) => {
      try {
        if(error || !user) {
          const errorMessage = new Error(`An error has occured: ${JSON.stringify(info)}`);
          return next(errorMessage);
        }

        req.login(user, {session: false}, async (error) => {
          if (error) {
            return next(error);
          }

          const body = {_id: user._id, email: user.email};
          const token = jwt.sign({user: body}, 'top_secret');

          return res.json({token});
        })
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
}