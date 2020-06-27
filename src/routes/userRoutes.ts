import {Router} from 'express';
import passport from 'passport';
import '../middlewares/auth';
import {UserController} from '../controllers/userController';
import {AuthController} from '../controllers/authController';

export class UserRoutes {
  public router: Router;
  public userController: UserController = new UserController();
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/signup', passport.authenticate('signup', {session: false}), this.userController.create);
    this.router.post('/login', this.authController.login);
    this.router.get('/profile', passport.authenticate('jwt', {session: false}), this.userController.read);
  }
}