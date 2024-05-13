import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import  blogCategoriesReducer  from "../features/blogCategory/blogcatSlice";
import blogReducer from '../features/blog/blogSlice'
import pCategoryReducer from '../features/productCategory/productCatSlice'
import productReducer from '../features/product/productSlice'
import couponReducer from '../features/coupon/couponSlice'
import customerReducer from '../features/customers/customerSlice'
import enquiryReducer from '../features/enquiry/enquirySlice'
export const store = configureStore({
    reducer: {
      auth: authReducer,
      bCategory: blogCategoriesReducer,
      blogs: blogReducer,
      pCategory:pCategoryReducer,
      product:productReducer,
      coupon:couponReducer,
      customer:customerReducer,
      enquiry:enquiryReducer
    },
});