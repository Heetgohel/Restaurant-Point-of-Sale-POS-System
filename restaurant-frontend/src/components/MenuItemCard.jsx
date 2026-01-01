import React from 'react';
import Button from './Button';

function MenuItemCard({ item, onAdd }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#d3d3d3",
        borderRadius: "16px",
        padding: "10px 14px",
        margin: "14px auto",
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        gap: "12px",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          background: "#e53935",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "12px"
          }}
        />
      </div>
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: 0
      }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <span
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "#222",
              fontWeight: 700,
              marginBottom: "2px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {item.name}
          </span>
          {item.jainAvailable && (
            <span
              title="Jain Available"
              style={{
                fontSize: "1.2em",
                marginLeft: "4px"
              }}
            >
              🟢
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            color: "#222",
            marginBottom: "2px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {item.description}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
            color: "#222",
            marginBottom: "0"
          }}
        >
          ₹{item.price.toFixed(2)}
        </div>
      </div>
      {/* Replace the inline button with the reusable Button component */}
      <Button
        onClick={() => onAdd(item.name)}
        className="add-to-cart-btn"  // Optionally, use this class for further styling
      >
        Add
      </Button>
    </div>
  );
}

export default MenuItemCard;
