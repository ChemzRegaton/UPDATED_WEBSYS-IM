import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './styles.css';

const AddInPatient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patientNumber = location.state?.patientNumber;

  const [inPatientData, setInPatientData] = useState({
    wardNumber: '',
    datePlacedOnWaitingList: '',
    bedNumber: '',
    expectedNumberOfStayingDays: '',
    datePlacedInWard: '',
    dateExpectedToLeave: '',
    actualDateOfLeaving: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!patientNumber) {
        throw new Error('Patient number is missing');
      }

      const { data, error } = await supabase
        .from('inpatient')
        .insert([
          {
            patientnumber: patientNumber,
            wardnumber: inPatientData.wardNumber,
            dateplacedonwaitinglist: inPatientData.datePlacedOnWaitingList,
            bednumber: inPatientData.bedNumber,
            expectednumberofstayingdays: inPatientData.expectedNumberOfStayingDays,
            dateplacedinward: inPatientData.datePlacedInWard,
            dateexpectedtoleave: inPatientData.dateExpectedToLeave,
            actualdateofleaving: inPatientData.actualDateOfLeaving,
          },
        ], { returning: 'representation' });

      if (error) {
        throw error;
      }

      console.log('InPatient data inserted successfully:', data);
      navigate('/addnextofkin', { state: { patientNumber } });
    } catch (error) {
      console.error('Error inserting inpatient data:', error.message);
    }
  };

  return (
    <div className='title'>
      <div className='common-container2'>
        <h2>In Patient Details</h2>
        <div className='inputs'>
            <div>
            <p className='input-text'>Ward Number:</p>
          <input
            className='wardNumber'
            type='text'
            placeholder='Ward Number'
            name='wardNumber'
            value={inPatientData.wardNumber}
            onChange={handleChange}
          />
          <p className='input-text'>Date Placed On Waiting List:</p>
          <input
            className='datePlacedOnWaitingList'
            type='text'
            placeholder='YYYY-MM-DD'
            name='datePlacedOnWaitingList'
            value={inPatientData.datePlacedOnWaitingList}
            onChange={handleChange}
          />
          <p className='input-text'>Bed Number:</p>
          <input
            className='bedNumber'
            type='text'
            placeholder='Bed Number'
            name='bedNumber'
            value={inPatientData.bedNumber}
            onChange={handleChange}
          />
          <p className='input-text'>Expected Number Of Staying Days:</p>
          <input
            className='expectedNumberOfStayingDays'
            type='number'
            placeholder='Expected Number Of Staying Days'
            name='expectedNumberOfStayingDays'
            value={inPatientData.expectedNumberOfStayingDays}
            onChange={handleChange}
          />
            </div>
          
          <p className='input-text'>Date Placed In Ward:</p>
          <input
            className='datePlacedInWard'
            type='text'
            placeholder='YYYY-MM-DD'
            name='datePlacedInWard'
            value={inPatientData.datePlacedInWard}
            onChange={handleChange}
          />
          <p className='input-text'>Date Expected To Leave:</p>
          <input
            className='dateExpectedToLeave'
            type='text'
            placeholder='YYYY-MM-DD'
            name='dateExpectedToLeave'
            value={inPatientData.dateExpectedToLeave}
            onChange={handleChange}
          />
          <p className='input-text'>Actual Date Of Leaving:</p>
          <input
            className='actualDateOfLeaving'
            type='text  '
            placeholder='YYYY-MM-DD'
            name='actualDateOfLeaving'
            value={inPatientData.actualDateOfLeaving}
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

export default AddInPatient;
