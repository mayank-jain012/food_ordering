// import React from 'react'
import { Table } from "antd";
const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    
    {
      title: "Count",
      dataIndex: "count",
    },
   
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
  
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
const ViewOrder = () => {
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource=""/>
      </div>
    </div>
  )
}

export default ViewOrder