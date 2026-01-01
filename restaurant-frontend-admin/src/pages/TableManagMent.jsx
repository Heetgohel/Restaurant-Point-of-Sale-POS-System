import React, { useEffect, useState } from "react";
import API from "../api";
import "../styles/TableManagment.css";

function TablesManagement() {
  const [tables, setTables] = useState([]);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/tables/all");
      setTables(res.data);
    } catch {
      setError("Failed to fetch tables.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTable = async () => {
    if (!newTableNumber.trim()) {
      setActionMessage("Please enter a table number.");
      return;
    }
    try {
      await API.post("/tables/add", { number: newTableNumber.trim() });
      setNewTableNumber("");
      setActionMessage("Table added successfully.");
      fetchTables();
    } catch (err) {
      setActionMessage(err.response?.data?.message || "Failed to add table.");
    }
  };

  const handleRemoveTable = async (tableId) => {
    try {
      await API.delete(`/tables/${tableId}`);
      setActionMessage("Table removed successfully.");
      fetchTables();
    } catch {
      setActionMessage("Failed to remove table.");
    }
  };

  const toggleStatus = async (table) => {
    try {
      const newStatus = table.status === "active" ? "inactive" : "active";
      await API.patch(`/tables/${table._id}`, { status: newStatus });
      setActionMessage(`Table status updated to ${newStatus}.`);
      fetchTables();
    } catch {
      setActionMessage("Failed to update status.");
    }
  };

  if (loading) return <div>Loading tables...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="table-list-container">
      <h2>Manage Tables</h2>

      <div className="input-row">
        <input
          type="text"
          placeholder="New Table Number"
          value={newTableNumber}
          onChange={(e) => setNewTableNumber(e.target.value)}
        />
        <button onClick={handleAddTable}>Add Table</button>
      </div>

      {actionMessage && <div className="action-message">{actionMessage}</div>}

      <div className="table-grid">
        {tables.map((table) => (
          <div
            key={table._id}
            className={`table-card ${table.status === "active" ? "active" : "inactive"}`}
          >
            <div>
              <p><strong>Table:</strong> {table.number}</p>
              <p><strong>Status:</strong> {table.status}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <button
                className={`status-btn ${table.status === "active" ? "active" : "inactive"}`}
                onClick={() => toggleStatus(table)}
              >
                {table.status === "active" ? "Deactivate" : "Activate"}
              </button>

              <button
                className="remove-btn"
                onClick={() => handleRemoveTable(table._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TablesManagement;
