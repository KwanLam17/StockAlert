import {Request, Response, NextFunction} from 'express';
import {Controller} from './controller';

export class UserController extends Controller {
  public async read(req: Request, res: Response): Promise<void> {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }

  public async create(req: Request, res: Response): Promise<void> {
    const {user} = req;

    res.json({status: res.status, data: user});
  }

  public update(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public delete(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}