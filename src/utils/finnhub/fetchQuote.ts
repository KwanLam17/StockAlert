import axios from 'axios';
import {FINNHUB_API} from '../../config/constants';

export default async function(symbol: String) {
  const {data} = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API}`);

  return data;
}