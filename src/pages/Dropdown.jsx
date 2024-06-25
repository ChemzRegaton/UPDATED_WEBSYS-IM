import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dropdown = () => {
  const [dropdown, setDropdown] = useState(false);
  const [viewSuppliesDropdown, setViewSuppliesDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
    // Close viewSuppliesDropdown when closing main dropdown
    if (!dropdown) {
      setViewSuppliesDropdown(false);
    }
  };

  const handleViewSuppliesDropdown = () => {
    setViewSuppliesDropdown(!viewSuppliesDropdown);
  };

  const closeDropdowns = () => {
    setDropdown(false);
    setViewSuppliesDropdown(false);
  };

  const openViewSuppliesDropdown = () => {
    setDropdown(true);
    setViewSuppliesDropdown(true);
  };

  return (
    <div className='dropdown' onMouseEnter={handleDropdown} onMouseLeave={closeDropdowns}>
      <button className='dropbtn'>
        <FontAwesomeIcon icon={faPlusCircle} /> SUPPLIES
      </button>
      {dropdown && (
        <div className='dropdown-content'>
          <Link to='/suppliers' onClick={closeDropdowns}>SUPPLIERS</Link>
          <Link to='/addrequisition' onClick={closeDropdowns}>REQUISITION</Link>
          <button className='dropbtn-sub' onMouseEnter={openViewSuppliesDropdown}>
            VIEW SUPPLY
          </button>
         
          {viewSuppliesDropdown && (
            <div className='sub-dropdown'>
               <p className='separator'>__________</p>
              <Link to='/surgicalsupplies' onClick={closeDropdowns}>SURGICAL SUPPLIES</Link>
              <Link to='/nonsurgicalsupplies' onClick={closeDropdowns}>NONSURGICAL SUPPLIES</Link>
              <Link to='/pharmaceuticalsupplies' onClick={closeDropdowns}>PHARMACEUTICAL SUPPLIES</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
