const express = require('express');
const app = express();
const port = process.env.port || 8000;
const dotenv = require('dotenv').config();
const dbConnect = require('./database/dbConnect');
const cors=require('cors');
const cookieparser=require('cookie-parser');
const bodyParser=require('body-parser')
const morgan=require('morgan')
const {notFound,errorHandler}=require('./middlewares/errorhandler.middleware')
const userRoute=require('./routes/userRoute');
const productRoute=require('./routes/productRoute');
const blogRoute=require('./routes/blogRoute');
const prodCategory=require('./routes/productCategoryRoute');
const blogCategory=require('./routes/blogCategoryRoute');
const coupon=require('./routes/couponRoute');
const enqRouter=require('./routes/enquiryRoute');
dbConnect();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieparser());
app.use('/api/user',userRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/category", prodCategory);
app.use("/api/blogCategory", blogCategory);
app.use("/api/coupon", coupon);
app.use("/api/enquiry", enqRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server Running Successfully ${port}`);
})






