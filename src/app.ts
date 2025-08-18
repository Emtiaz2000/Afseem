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
  res.render('pages/home');
};

app.get('/', getAController);
app.get('/login-store', (req,res)=>{
  res.render('pages/Store/store-login')
});
app.get('/registration-store', (req,res)=>{
  res.render('pages/Store/store-registration')
});
app.get('/store-dashboard', (req,res)=>{
  res.render('pages/Store/store-dashboard')
});
app.get('/store-profile', (req,res)=>{
  res.render('pages/Store/store-profile')
});
app.get('/add-product', (req,res)=>{
  res.render('pages/Store/add-product')
});
app.get('/store-editproduct', (req,res)=>{
  res.render('pages/Store/edit-product')
});

app.get('/admin-storeinfo', (req,res)=>{
  res.render('pages/Admin/admin-storeinfo',{layout:'layouts/admin-layouts'})
});
app.get('/admin-customerinfo', (req,res)=>{
  res.render('pages/Admin/admin-viewcustomer',{layout:'layouts/admin-layouts'})
});
app.get('/admin-newseller', (req,res)=>{
  res.render('pages/Admin/admin-viewnewseller',{layout:'layouts/admin-layouts'})
});
app.get('/admin-sellersubscription', (req,res)=>{
  res.render('pages/Admin/admin-subscriptionapproval',{layout:'layouts/admin-layouts'})
});
app.use(notFound);
app.use(globalErrorHandler);

export default app;
