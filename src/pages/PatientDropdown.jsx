import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PatientDropdown = () => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const closeDropdown = () => {
    setDropdown(false);
  };

  return (
    <div className='dropdown' onMouseEnter={handleDropdown} onMouseLeave={closeDropdown}>
      <button className='dropbtn'>
        <FontAwesomeIcon icon={faUser} /> PATIENT
      </button>
      {dropdown && (
        <div className='dropdown-content'>
          <Link to='/patients' onClick={closeDropdown}>All Patients</Link>
          <Link to='/inpatient' onClick={closeDropdown}>In-Patients</Link>
          <Link to='/outpatient' onClick={closeDropdown}>Out-Patients</Link>
        </div>
      )}
    </div>
  );
};

export default PatientDropdown;
