import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { MongoError } from 'mongodb';
import * as mongoose from 'mongoose';
import { Mongoose } from 'mongoose';
import * as logger from 'morgan';
import * as passport from 'passport';

// Import Config
import { coreConfig } from './config/keys';
import { Request, Response } from 'express';
import TodoRoutes from './routes/TodoRoutes';

// import Routes

// App Class
class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config(): void {
    // Mongoose Connection
    (<Mongoose>mongoose).Promise = global.Promise;
    mongoose
      .connect(coreConfig.mongoURI, { useMongoClient: true })
      .then(() => console.log(`Connected to database`))
      .catch((error: MongoError) =>
        console.log(`Error connecting to database: ${error}`)
      );

    // CORS MW
    this.app.use(cors());
    this.app.options("*", cors());

    // Logger
    this.app.use(logger("dev"));

    // Bodyparser
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
        limit: "5mb",
        parameterLimit: 5000
      })
    );

    // Passport MW
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    // Static
    this.app.use(express.static(path.join(__dirname, 'public')));

    // Catch all routes
    this.app.all('*', (req: Request, res: Response) => {
      res.sendFile(__dirname, 'public/index.html');
    });
  }

  public routes(): void {
    let router: express.Router;
    router = express.Router();

    router.get('/', (req: Request, res: Response) => {
      res.send('Testing Index');
    });

    this.app.use('/', router);
    this.app.use('/api/todos', TodoRoutes);
  }
}

export default new App().app;