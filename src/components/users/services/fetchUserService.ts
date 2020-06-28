import {Request, Response} from 'express';

export default class FindUserService {
  public async execute(req: Request, res: Response): Promise<void> {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
}