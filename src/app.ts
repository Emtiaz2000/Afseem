import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import notFound from './app/middlewares/notFound';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// application routes
// app.use('/api', router);

const getAController = (req: Request, res: Response) => {
  res.send('Hello, E-Commerce TypeScript (^_^)');
};

app.get('/', getAController);
// app.use(notFound);
// app.use(globalErrorHandler);

export default app;
