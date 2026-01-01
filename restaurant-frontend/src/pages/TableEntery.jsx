// src/pages/TableEntry.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import API from "../api";

export default function TableEntry() {
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      // const res = await API.get(`/tables/check/${tableNumber}`);
      localStorage.setItem("tableNumber", tableNumber);
      navigate("/menu");
    } catch (err) {
      alert("Invalid or inactive table number.");
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Enter Table Number (simulate QR)</h1>
      <input
        className="border p-2 mr-2"
        type="number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleStart}>
        Start Order
      </button>
    </div>
  );
}
