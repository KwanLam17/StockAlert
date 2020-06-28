import {Request, Response} from 'express';
import fetchQuote from '../../../utils/finnhub/fetchQuote';

export default class FindStockService {
  public async execute(req: Request, res: Response): Promise<void> {
    const {params: {symbol}} = req;

    const data = await fetchQuote(symbol);

    res.json({data});
  }
}