import React, { useState } from "react";
import "./AddCategoryModal.css";

function AddCategoryModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    displayName: "",
    icon: "",
    isVisible: true,
    sortOrder: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h3>Add New Category</h3>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="displayName"
          placeholder="Display Name"
          value={formData.displayName}
          onChange={handleChange}
        />

        <input
          name="icon"
          placeholder="Icon (optional)"
          value={formData.icon}
          onChange={handleChange}
        />

        <input
          name="sortOrder"
          type="number"
          placeholder="Sort Order"
          value={formData.sortOrder}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="isVisible"
            checked={formData.isVisible}
            onChange={handleChange}
          />
          Visible
        </label>

        <div className="modal-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryModal;
