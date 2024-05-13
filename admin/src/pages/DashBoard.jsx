//  import React from 'react'
import { BsArrowDownRight } from "react-icons/bs";

import { Table } from "antd";
import {Column} from '@ant-design/plots'

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];
const data1 = [];
for (let i = 1; i < 45; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}
const DashBoard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sept",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
    <h3 className='mb-4'>Dashboard</h3>
    <div className='d-flex justify-content-between align-items-center gap-3'>
      <div className='d-flex flex-grow-1 bg-white p-3 rounded-3 justify-content-between align-items-end dashboard-data'>
        <div>
          <p className='mb-0 desc' >Total</p>
          <h4>$1100</h4>
        </div>
        <div className='d-flex flex-column align-items-end'>
          <h6><BsArrowDownRight />32%</h6>
          <p className='mb-0 desc'>Compared To April 2022</p>
        </div>
      </div>
      <div className='d-flex flex-grow-1 bg-light p-3 rounded-3 justify-content-between align-items-end dashboard-data'>
        <div>
          <p className='mb-0 desc'>Total</p>
          <h4>$1100</h4>
        </div>
        <div className='d-flex flex-column align-items-end'>
          <h6><BsArrowDownRight />32%</h6>
          <p className='mb-0 desc'>Compared To April 2022</p>
        </div>
      </div>
      <div className='d-flex flex-grow-1 bg-white p-3 rounded-3 justify-content-between align-items-end dashboard-data'>
        <div>
          <p className='mb-0 desc'>Total</p>
          <h4>$1100</h4>
        </div>
        <div className='d-flex flex-column align-items-end'>
          <h6 className='green'><BsArrowDownRight />32%</h6>
          <p className='mb-0 desc'>Compared To April 2022</p>
        </div>
      </div>
    </div>
    <div className='mt-3'>
      <h4 className='mb-4'>Income Statistics</h4>
      <div>
        <Column {...config}/>
      </div>
    </div>
    <div className='mt-3'>
      <h3 className='mb-4'>
        Recent Order
        <div className='mt-5'>
          <Table columns={columns} dataSource={data1}/>
        </div>
      </h3>
    </div>
    <div></div>
  </div>
  )
}

export default DashBoard