import "./modal.css"

const Modal = ({ children, onClose }) => {
  return (
    <div className='modal-content' onClick={onClose}>
      <div className='content' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal