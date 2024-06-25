import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './styles.css';

const AddNextOfKin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patientNumber = location.state?.patientNumber; // Retrieve patient number from location state

  const [nextOfKinData, setNextOfKinData] = useState({
    fullname: '',
    address: '',
    relationship: '',
    telephonenumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNextOfKinData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!patientNumber) {
        throw new Error('Patient number is missing');
      }

      const { data: nextOfKinDataInserted, error: kinError } = await supabase
        .from('nextofkin')
        .insert([
          {
            patientnumber: patientNumber,
            fullname: nextOfKinData.fullname,
            address: nextOfKinData.address,
            relationship: nextOfKinData.relationship,
            telephonenumber: nextOfKinData.telephonenumber,
          },
        ], { returning: 'representation' });

      if (kinError) {
        throw kinError;
      }

      console.log('Next of kin data inserted successfully:', nextOfKinDataInserted);
      navigate('/patientmedication', { state: { patientNumber } });
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  };

  return (
    <div className='title'>
      <div className='common-container2'>
        <h2>Next of Kin</h2>
        <div className='inputs'>
          <p className='input-text'>Full Name:</p>
          <input
            className='next_fullname'
            type='text'
            placeholder='Full Name'
            name='fullname'
            value={nextOfKinData.fullname}
            onChange={handleChange}
          />
          <p className='input-text'>Address:</p>
          <input
            className='next_address'
            type='text'
            placeholder='Address'
            name='address'
            value={nextOfKinData.address}
            onChange={handleChange}
          />
          <p className='input-text'>Relationship:</p>
          <input
            className='next_relationship'
            type='text'
            placeholder='Relationship to Patient'
            name='relationship'
            value={nextOfKinData.relationship}
            onChange={handleChange}
          />
          <p className='input-text'>Telephone Number:</p>
          <input
            className='next_telephonenumber'
            type='tel'
            placeholder='Telephone Number'
            name='telephonenumber'
            value={nextOfKinData.telephonenumber}
            onChange={handleChange}
          />
        </div>
        <div className='actions'>
          <button className='cancel' type='button' onClick={() => navigate('/addpatients')}>
            Back
          </button>
          <button className='submit' type='button' onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNextOfKin;
