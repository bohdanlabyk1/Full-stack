import React from 'react'

const Shopinmodal = ({ children, onClose }) => {
  return (
   <div className='modal-content' onClick={onClose}>
      <div className='content' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Shopinmodal