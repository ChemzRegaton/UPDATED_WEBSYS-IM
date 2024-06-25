import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './styles.css';

const AddOutPatient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patientNumber = location.state?.patientNumber; // Retrieve patient number from location state

  const [outPatientData, setOutPatientData] = useState({
    dateDismissed: '',
    bedNumber: '',
    status: '',
    noDays: '',
    paymentStatus: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!patientNumber) {
        throw new Error('Patient number is missing');
      }

      const { data: outPatientDataInserted, error: outError } = await supabase
        .from('outpatient')
        .insert([
          {
            patientnumber: patientNumber,
            datedismissed: outPatientData.dateDismissed,
            bednumber: outPatientData.bedNumber,
            status: outPatientData.status,
            nodays: outPatientData.noDays,
            paymentstatus: outPatientData.paymentStatus,
          },
        ], { returning: 'representation' });

      if (outError) {
        throw outError;
      }

      console.log('Outpatient data inserted successfully:', outPatientDataInserted);
      navigate('/addnextofkin', { state: { patientNumber } });
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  };

  return (
    <div className='title'>
      <div className='common-container2'>
        <h2>Outpatient</h2>
        <div className='inputs'>
          <p className='input-text'>Date Dismissed:</p>
          <input
            className='out_dateDismissed'
            type='text'
            placeholder='YYYY-MM-DD'
            name='dateDismissed'
            value={outPatientData.dateDismissed}
            onChange={handleChange}
          />
          <p className='input-text'>Bed Number:</p>
          <input
            className='out_bedNumber'
            type='text'
            placeholder='Bed Number'
            name='bedNumber'
            value={outPatientData.bedNumber}
            onChange={handleChange}
          />
          <p className='input-text'>Status:</p>
          <input
            className='out_status'
            type='text'
            placeholder='Status'
            name='status'
            value={outPatientData.status}
            onChange={handleChange}
          />
          
        </div>
        <div className='inputs'>
        <p className='input-text'>No. of Days:</p>
          <input
            className='out_noDays'
            type='text'
            placeholder='Number of Days'
            name='noDays'
            value={outPatientData.noDays}
            onChange={handleChange}
          />
          <p className='input-text'>Payment Status:</p>
          <input
            className='out_paymentStatus'
            type='text'
            placeholder='Payment Status'
            name='paymentStatus'
            value={outPatientData.paymentStatus}
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

export default AddOutPatient;
