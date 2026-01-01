import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import API from '../api';
import './MenuItemCard.css';

function MenuItemCard({ item, onAvailabilityChange, onUpdate, onEdit }) {
  const [availability, setAvailability] = useState(item.availability);

  const toggleAvailability = async () => {
    const newValue = !availability;
    try {
      await API.patch(`/menu/${item._id}/availability`, { availability: newValue });
      setAvailability(newValue);
      onAvailabilityChange?.(item._id, newValue);
    } catch (err) {
      alert("Failed to update availability");
    }
  };

  return (
    <div className="menu-card">
      {item.image && <img src={item.image} alt={item.name} className="menu-img" />}
      <div className="menu-content">
        <h3>{item.name}</h3>
        <p className="menu-description">{item.description}</p>
      </div>

      {item.jainAvailable && <p className="jain">Jain Option Available</p>}

      <div className="card-footer">
        <div className="card-footer-left">
          <div className="toggle-container">
            <label className="switch">
              <input
                type="checkbox"
                checked={availability}
                onChange={toggleAvailability}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <p className="menu-price">₹{item.price}</p>

        <FaPencilAlt className="edit-icon" onClick={onEdit} />
      </div>
    </div>
  );
}

export default MenuItemCard;
