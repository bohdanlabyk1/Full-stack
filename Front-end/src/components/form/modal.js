import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose, className = "" }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-content ${className}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
