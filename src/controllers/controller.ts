import {Request, Response, NextFunction} from 'express';

export abstract class Controller {
  public abstract create(req: Request, res: Response, next: NextFunction): Promise<void>;
  public abstract read(req: Request, res: Response, next: NextFunction): Promise<void>;
  public abstract update(req: Request, res: Response, next: NextFunction): Promise<void>;
  public abstract delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}