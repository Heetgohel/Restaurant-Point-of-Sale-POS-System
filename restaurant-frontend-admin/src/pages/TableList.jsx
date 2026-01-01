import React, { useEffect, useState } from "react";
import API from "../api";
import "../styles/TableList.css";

function TableList() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [servedItems, setServedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchTables() {
      try {
        const response = await API.get("/tables/all");
        const activeTables = response.data.filter(
          (table) => table.status === "active"
        );
        setTables(activeTables);
      } catch (err) {
        setError("Failed to fetch tables");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTables();
  }, []);

  const handleTableClick = async (tableNumber) => {
    try {
      const res = await API.get(`/orders/served/${tableNumber}`);
      const rawItems = res.data.servedItems;

      // Merge items by name
      const merged = rawItems.reduce((acc, item) => {
        if (!acc[item.name]) {
          acc[item.name] = {
            name: item.name,
            itemPrice: item.itemPrice,
            quantity: 0,
          };
        }
        acc[item.name].quantity += 1;
        return acc;
      }, {});

      const mergedItems = Object.values(merged);

      setServedItems(mergedItems);
      setTotalAmount(res.data.totalAmount);
      setSelectedTable(tableNumber);
      setSuccessMessage(""); 
    } catch (err) {
      console.error("Failed to fetch served items:", err);
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmOrder = async () => {
    if (!selectedTable || servedItems.length === 0) return;

    try {
      await API.post("/orderhistory/add", {
        tableNumber: selectedTable,
        items: servedItems,
        totalAmount,
        paymentMethod,
      });

      await API.delete(`/orders/clear/${selectedTable}`);

      // Clear state
      setServedItems([]);
      setTotalAmount(0);
      setSelectedTable(null);
      setSuccessMessage("Order saved and cleared successfully!");
    } catch (err) {
      console.error("Failed to complete order:", err);
    }
  };

  if (loading) return <div>Loading tables...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="table-list-container">
      <h2 style={{ textAlign: "center" }}>All Tables Bill</h2>

      <div className="table-grid">
        {tables.map((table) => (
          <div
            className={`table-card ${
              table.status === "active" ? "active" : "inactive"
            }`}
            key={table._id}
            onClick={() => handleTableClick(table.number)}
          >
            <p>
              <strong>Table:</strong> {table.number}
            </p>
          </div>
        ))}
      </div>

      {selectedTable && (
        <div className="served-items-container">
          <h3>Table {selectedTable} - Total: ₹{totalAmount}</h3>

          <label htmlFor="payment-select" className="payment-label">
            Select Payment Method:
          </label>
          <select
            id="payment-select"
            value={paymentMethod}
            onChange={handlePaymentChange}
            className="payment-select"
          >
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
          </select>

          <div className="item-grid">
            {servedItems.map((item, index) => (
              <div key={index} className="item-card">
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>
                  ₹{item.itemPrice} × {item.quantity} = ₹
                  {(item.itemPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <button className="confirm-button" onClick={handleConfirmOrder}>
            Confirm & Clear
          </button>

          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TableList;
