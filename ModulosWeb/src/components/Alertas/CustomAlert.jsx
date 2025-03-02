import React, { useState } from "react";
import "./CustomAlert.css";

function CustomAlert({ type, title, message, onConfirm }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onConfirm();
    }, 300);
  };

  const icon = {
    success:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="64" height="64">
    <circle cx="12" cy="12" r="12" fill="#4CAF50"/>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#fff"/>
  </svg>, 
    error:
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="64" height="64">
    <circle cx="12" cy="12" r="12" fill="#F44336"/>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#fff"/>
  </svg>  
  ,  
  }[type];

  const color = {
    success: "#28a745", 
    error: "#dc3545", 
  }[type];

  return (
    <div className="custom-modal-overlay">
      <div className={`custom-modal ${isExiting ? "exiting" : ""}`} style={{ borderTop: `5px solid ${color}` }}>
        <div className="modal-icon" style={{ color }}>
          {icon}
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={handleClose} style={{ backgroundColor: color }}>
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default CustomAlert;