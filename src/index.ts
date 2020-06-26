import express from 'express';
import {PORT} from './config/constants';

const app: express.Application = express();
app.use(express.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});