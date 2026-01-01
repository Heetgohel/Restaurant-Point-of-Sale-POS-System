import React, { useState, useEffect } from 'react';
import '../styles/OrderByTable.css';
import API from '../api';

function OrdersByTable() {
  const [ordersByTable, setOrdersByTable] = useState({});

  useEffect(() => {
   
    API.get('/orders/by-table')
      .then((response) => {
        console.log(response.data);
        setOrdersByTable(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="orders-by-table">
      <h1>Pending Orders by Table</h1>
      {Object.keys(ordersByTable).length === 0 ? (
        <p>No pending orders found.</p>
      ) : (
        Object.keys(ordersByTable).map((tableNumber) => (
          <div key={tableNumber} className="table-section">
            <h2>Table {tableNumber}</h2>
            <ul>
              {ordersByTable[tableNumber].map((order, index) => (
                <li key={index} className="order-item">
                
                  <p><strong>Timestamp:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
                  <ul>
                    {order.orders.map((entry, index) => (
                      <li key={index}>
                        <p><strong>Order placed at:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                        <p className='price'><strong>Price: ${entry.price}</strong> </p>
                        <ul>
                          {entry.items.map((item, index) => (
                            item.status === 'pending' && (
                              <li key={index}>
                                <span className='item-name'>{item.quantity} x {item.name} ({item.status})</span>
                              </li>
                            )
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersByTable;
