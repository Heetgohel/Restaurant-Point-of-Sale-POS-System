import React from "react";
import "../styles/Dashboard.css";

const itemsSold = [
  { name: "Pizza", quantity: 150 },
  { name: "Burger", quantity: 120 },
  { name: "Pasta", quantity: 90 },
  { name: "Salad", quantity: 70 },
  { name: "Soda", quantity: 50 },
  { name: "Ice Cream", quantity: 30 },
];

const profitByDay = [
  { date: "2025-05-08", amount: 1200 },
  { date: "2025-05-09", amount: 1500 },
  { date: "2025-05-10", amount: 900 },
  { date: "2025-05-11", amount: 1800 },
  { date: "2025-05-12", amount: 1300 },
  { date: "2025-05-13", amount: 1100 },
  { date: "2025-05-14", amount: 2000 },
];

const totalProfit = profitByDay.reduce((sum, day) => sum + day.amount, 0);

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Sales Dashboard</h1>

      <div className="profit-container">Total Profit: ₹{totalProfit}</div>

      <div className="dashboard-lists">
        <div className="list">
          <h3>Items Sold (Most to Least)</h3>
          {itemsSold
            .slice()
            .sort((a, b) => b.quantity - a.quantity)
            .map((item) => (
              <div key={item.name} className="item-container">
                <span>{item.name}</span>
                <span>{item.quantity}</span>
              </div>
            ))}
        </div>

        <div className="list">
          <h3>Profit by Day (Last 7 Days)</h3>
          {profitByDay.map(({ date, amount }) => (
            <div key={date} className="item-container">
              <span>{date}</span>
              <span>₹{amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
