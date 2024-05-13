import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import MainLayout from './component/MainLayout'
import DashBoard from './pages/DashBoard'
import Enquiry from './pages/Enquiry';
import BlogList from './pages/BlogList';
import BlogCatList  from './pages/BlogCatList';
import Order from './pages/Order';
import Customer from './pages/Customer';
import Product from './pages/Product';
import Category from './pages/Category';
import AddBlog from './pages/AddBlog';
import AddBlogCat from './pages/AddBlogCat';
import AddProductCat from './pages/AddProductCat';
import AddProduct from './pages/AddProduct';
import ViewOrder from './pages/ViewOrder'
import ViewEnq from './pages/ViewEnq';
import AddCoupon from './pages/AddCoupon';
import CouponList from './pages/CouponList';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<MainLayout />}>
          <Route path='/admin' element={<DashBoard />}/>
          <Route path='product' element={<AddProduct />}/>
          <Route path='product/:id' element={<AddProduct />}/>
          <Route path='enquiry' element={<Enquiry />}/>
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path='customer' element={<Customer />}/>
          <Route path='blog-list' element={<BlogList />}/>
          <Route path='blog-add' element={<AddBlog />}/>
          <Route path='blog-add/:id' element={<AddBlog />}/>
          <Route path='add-blog-category' element={<AddBlogCat />}/>
          <Route path='add-blog-category/:id' element={<AddBlogCat />}/>
          <Route path='blog-category' element={<BlogCatList />}/>
          <Route path='order' element={<Order />}/>
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path='product-list' element={<Product />}/>
          <Route path='category-list' element={<Category />}/>
          <Route path='category' element={<AddProductCat />}/>
          <Route path='category/:id' element={<AddProductCat />}/>
          <Route path='coupon' element={<AddCoupon />} />
          <Route path='coupon/:id' element={<AddCoupon />} />
          <Route path='coupon-list' element={<CouponList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
