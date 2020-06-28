import {Router} from 'express';
import passport from 'passport';
import {FetchStockService} from './services';

export default class StockRoutes {
  public router: Router;
  public fetchStockService: FetchStockService = new FetchStockService();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/:symbol', passport.authenticate('jwt', {session: false}), this.fetchStockService.execute);
  }
}