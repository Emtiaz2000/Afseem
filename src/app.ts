import express, {
  Application,
  Request,
  Response,
  static as static_,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';
import { join } from 'path';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(static_(join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', join(__dirname, 'views')); //get views directory
app.set('layout', 'layouts/layout');

// application routes
app.use('/api', router);

const getAController = (req: Request, res: Response) => {
  console.log("This is from Emtiaz");
  //this is a comment
  // console.log(__dirname)
  res.send('Hello, E-Commerce TypeScript (^_^)');
  // res.render('pages/home', {
  //   welcomedata: 'Hello, E-Commerce TypeScript (^_^)',
  // });
};

app.get('/', getAController);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
