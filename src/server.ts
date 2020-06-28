import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import {PORT, MONGO_URL} from './config/constants';
import {UserRoutes} from './components/users';
import {StockRoutes} from './components/stocks';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.mongo();
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`API is running at http://localhost:${this.app.get('port')}`)
    })
  }

  private config(): void {
    this.app.set('port', PORT);
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(compression());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use('/user', new UserRoutes().router);
    this.app.use('/stock', new StockRoutes().router);
  }

  private mongo() {
    const {connection} = mongoose;

    connection.on('connected', () => {
      console.log('Mongo Connection Establiashed');
    })
    connection.on('reconnected', () => {
      console.log('Mongo Connection Reestabliashed');
    })
    connection.on('disconnected', () => {
      console.log('Mongo Connection Disconnected');
      console.log('Trying to reconnect to Mongo...');
      setTimeout(() => {
        mongoose.connect(MONGO_URL, {
          autoReconnect: true,
          keepAlive: true,
          socketTimeoutMS: 3000,
          connectTimeoutMS: 3000
        });
      }, 3000);
    })
    connection.on('close', () => {
      console.log('Mongo Connection Closed');
    });
    connection.on('error', (error: Error) => {
      console.log(`Mongo Connection Error: ${error}`);
    });
    const run = async () => {
      await mongoose.connect(MONGO_URL, {
        autoReconnect: true,
        keepAlive: true
      });
    };
    run().catch(error => console.error(error));
  }
}

export default Server;