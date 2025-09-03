import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from 'cors';
import cron from "node-cron";
import { sellerSchema } from './app/modules/shop/shopSchema.js';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';
import { join,dirname } from 'path';
import { fileURLToPath } from 'url';
import storeRoute from './app/routes/store-route.js';
import mongoose from 'mongoose';
import methodOverride  from 'method-override'
import userRoute from './app/routes/user-route.js'
import AdminRoute from './app/routes/admin-route.js'
//flash 
import session from "express-session";
import flash from "connect-flash";
//getting user from jwt
import {attachUser} from './app/middlewares/roleBaseMenu.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectDB = async()=>{
  await mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,
      useUnifiedTopology: true,tls: true,}).then(()=>{
    console.log('Database is Connected!')
  })
}
connectDB()
//parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use('/uploads',express.static(join(__dirname, 'uploads')));

app.use(cors());
app.use(cookieParser());
app.use(attachUser);//getting user and user role for all 
app.use(methodOverride('_method'))//method override for put and delete 
// Session middleware
app.use(
  session({
    secret: process.env.FLASH_SECRET,  // change to something strong
    resave: false,
    saveUninitialized: false,
  })
);
//view engine

app.set("trust proxy", true);// for getting location access
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', join(__dirname, 'views')); //get views directory
app.set('layout', 'layouts/layout');
// Flash middleware
app.use(flash());

// Make flash messages available in all EJS views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use('/',storeRoute)//store route
app.use('/',userRoute)//user route
app.use('/',AdminRoute)//user route

//homepage
const getAController =  (req, res) => {
  let pathfind = join(__dirname, 'uploads')
  //console.log(pathfind)
  res.render('pages/home');
};
//home page route
app.get('/', getAController);

// ✅ Cron job runs every midnight
cron.schedule("0 0 * * *", async () => {
  await sellerSchema.updateMany(
    { subscriptionexpireAt: { $lt: new Date() } },
    { $set: { subscription: false,subscriptionplan:'free' } }
  );
  console.log("Expired sellers updated (midnight check)");
});

// 404 Handler
app.use((req, res, next) => {
  res.render('pages/404',{msg:"no data found!"})
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.render('pages/500',{msg:err.message})
});

app.listen(process.env.PORT,()=>{
  console.log('app is listening')
})
