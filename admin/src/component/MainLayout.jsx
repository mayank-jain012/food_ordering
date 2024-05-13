import React from 'react'
import { useState } from 'react';
import { RxDashboard } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { GrCatalog } from "react-icons/gr";
import { FaProductHunt } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { RiCouponLine } from 'react-icons/ri';
// import { MdBrandingWatermark } from "react-icons/md";
// import { TbBrandD3 } from "react-icons/tb";
import { TbCategory } from "react-icons/tb";
// import { IoIosColorFill } from "react-icons/io";
import { RiOrderPlayFill } from "react-icons/ri";
import { SiMicrodotblog } from "react-icons/si";
import { FaBloggerB } from "react-icons/fa6";
import { FaBlog } from "react-icons/fa6";
import { ImBlog } from "react-icons/im";
import { TbLogicNand } from "react-icons/tb";
import { FaPersonChalkboard } from "react-icons/fa6"
import { Outlet } from 'react-router-dom';
// import { linked } from '../images/linkedin.jpg'
import { IoIosNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
 import { useNavigate } from 'react-router-dom'
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className='text-white fs-5 text-center py-3 mb-0'>
            <span className='sm-logo'>DD</span>
            <span className='lg-logo'>Digital Delights</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => {
            if (key == 'signout') {
            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <RxDashboard className='fs-5' />,
              label: 'Dashboard',
            },
            {
              key: 'customer',
              icon: <IoPerson className='fs-5' />,
              label: 'Customer',
            },
            {
              key: 'Catalog',
              icon: <GrCatalog className='fs-5' />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <FaProductHunt className='fs-5' />,
                  label: 'Product'
                },
                {
                  key: 'product-list',
                  icon: <CiCircleList className='fs-5' />,
                  label: 'Product List'
                },
                 {
                  key: 'category',
                  icon: <TbCategory className='fs-5' />,
                  label: 'Category'
                },
                {
                  key: 'category-list',
                  icon: <CiCircleList className='fs-5' />,
                  label: 'Category List'
                }, 
              ]
            },
            {
              key: 'order',
              icon: <RiOrderPlayFill className='fs-5' />,
              label: 'Order',
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: 'Blogs',
              icon: <SiMicrodotblog className='fs-5' />,
              label: 'Blog',
              children: [
                {
                  key: 'blog-add',
                  icon: <FaBloggerB className='fs-5' />,
                  label: 'Add Blog'
                },
                {
                  key: 'blog-list',
                  icon: <FaBlog className='fs-5' />,
                  label: 'Blog List'
                }
                , {
                  key: 'blog-category',
                  icon: <ImBlog className='fs-5' />,
                  label: 'Blog Category'
                },
                {
                  key: 'add-blog-category',
                  icon: <TbLogicNand className='fs-5' />,
                  label: 'Add Blog Category'
                }
              ]
            },
            {
              key: 'Enquiry',
              icon: <FaPersonChalkboard className='fs-5' />,
              label: 'Enquiry',
            },

          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='d-flex justify-content-between ps-3 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {
            React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )
          }
          <div className='d-flex gap-3 align-items-center'>
            <div className='position-relative'>
              <IoIosNotifications className='fs-5' />
              <span className='badge bg-warning rounded-circle position-absolute p-1'>1</span>
            </div>
            <div className='align-items-center d-flex gap-15 btn-group'>


              <div className="btn btn-secondary dropdown-toggle"
                type="button"

                data-bs-toggle="dropdown"
                aria-expanded="false">
                <h5 className='mb-0'>Mayank jain</h5>
                <p className='mb-0'>mayankjain12feb@gmail.com</p>
              </div>

              <div className="dropdown-menu" >
                <li><Link className="dropdown-item" to="#">Action</Link></li>

              </div>

            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>

  )
}

export default MainLayout