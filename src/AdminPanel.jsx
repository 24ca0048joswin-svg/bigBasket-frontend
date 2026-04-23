import React from 'react';
import { useState, useEffect } from 'react';
import './AdminPanel.css';
import add from './assets/add.png';
import addGroup from './assets/add-group.png'
import product from './assets/product.png'
import orders from './assets/orders-icon.jpg'
import { Link } from 'react-router-dom';
import AdminNav from './components/AdminNav';

function AdminPanel() {
  return (
    <>
      <AdminNav />
      <div className='main'>
        <Link to="/addProduct" className='link-margin'>
          <button className='add-product'>
            <img src={add} width="170px" />
            Add Product
          </button>
        </Link>
        <Link to="/manageProducts" className='link-margin'>
          <button className='add-product'>
            <img src={product} width="170px" />
            Manage Products
          </button>
        </Link>
        <Link to="/manageUsers" className='link-margin'>
          <button className='add-product'>
            <img src={addGroup} width="170px" />
            Manage Users
          </button>
        </Link>
        <Link to="/adminOrder" className='link-margin'>
          <button className='add-product'>
            <img src={orders} height="170px" width="165px" />
            Manage Orders
          </button>
        </Link>
      </div>
    </>
  )
}

export default AdminPanel