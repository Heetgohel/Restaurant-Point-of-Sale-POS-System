import React from 'react';

function Button({ children, onClick, style = {}, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`custom-btn ${className}`}
      style={{
        padding: "8px 24px",         // Adjusted padding
        background: "#ffb703",       // Match the "Back to Menu" button color
        color: "#fff",               // White text
        border: "none",
        borderRadius: "10px",        // Match rounded corners
        fontSize: "1rem",            // Font size adjustment for consistency
        cursor: "pointer",
        fontWeight: "bold",
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;