import React, { useState } from 'react';
import { supabase } from '../client';
import './styles.css';
import { useLocation, useNavigate } from 'react-router-dom';

const PatientMedication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patientNumber = location.state?.patientNumber;

  const [medicationData, setMedicationData] = useState({
    drugname: '',
    unitsperday: '',
    methodofadministration: '',
    startdate: '',
    finishdate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicationData((prevData) => ({
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
        .from('patientmedication')
        .insert([
          {
            patientnumber: patientNumber,
            drugname: medicationData.drugName,
            unitsperday: medicationData.unitsPerDay,
            methodofadministration: medicationData.methodOfAdministration,
            startdate: medicationData.startDate,
            finishdate: medicationData.finishDate,
          },
        ]);
  
      if (error) {
        throw error;
      }
  
      console.log('Medication data inserted successfully:', data);
      navigate('/patients');
    } catch (error) {
      console.error('Error inserting medication data:', error.message);
      // Handle the error appropriately (e.g., display error message)
    }
  };
  
  return (
    <div className='title'>
      <div className='common-container3'>
      <h2>Patient Medication</h2>
        <div>
          <div className='inputs'>
            <p className='input-text'>Drug Number:</p>
            <input
              className='drugName'
              type='text'
              placeholder='Drug Name'
              name='drugName'
              value={medicationData.drugName}
              onChange={handleChange}
            />
            <p className='input-text'>Units Per Day:</p>
            <input
              className='unitsPerDay'
              type='text'
              placeholder='Units Per Day'
              name='unitsPerDay'
              value={medicationData.unitsPerDay}
              onChange={handleChange}
            />
            <p className='input-text'>Method of Administration:</p>
            <input
              className='methodOfAdministration'
              type='text'
              placeholder='Method of Administration'
              name='methodOfAdministration'
              value={medicationData.methodOfAdministration}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
          <p className='input-text'>Start Date:</p>
            <input
              className='startDate'
              type='text'
              placeholder='YYYY-MM-DD'
              name='startDate'
              value={medicationData.startDate}
              onChange={handleChange}
            />
            <p className='input-text'>Finish Date:</p>
            <input
              className='finishDate'
              type='text'
              placeholder='YYYY-MM-DD'
              name='finishDate'
              value={medicationData.finishDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='actions'>
          <button className='cancel' type='button' onClick={() => navigate('/addnextofkin')}>
            Back
          </button>
          <button className='submit' type='button' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientMedication;
