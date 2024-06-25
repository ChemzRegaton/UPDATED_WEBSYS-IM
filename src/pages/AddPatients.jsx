import React, { useState } from 'react';
import { supabase } from '../client';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState({
    telephoneNumber: '',
    fullName: '',
    dateOfBirth: '',
    sex: '',
    maritalStatus: '',
    dateRegistered: '',
    detailsOfNextOfKin: '',
    address: '',
    PatientType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const patientNumber = `PN${Date.now()}`;

      // Insert into patient table
      const { data: patientDataResponse, error: patientError } = await supabase
        .from('patient')
        .insert([
          {
            patientnumber: patientNumber,
            telephonenumber: patientData.telephoneNumber,
            fullname: patientData.fullName,
            dateofbirth: patientData.dateOfBirth,
            sex: patientData.sex,
            maritalstatus: patientData.maritalStatus,
            dateregistered: patientData.dateRegistered,
            detailsofnextofkin: patientData.detailsOfNextOfKin,
            address: patientData.address,
            patienttype: patientData.patientType,
          },
        ]);

      if (patientError) {
        throw patientError;
      }

      console.log('Patient data inserted successfully:', patientDataResponse);

      // Insert into in_patient or out_patient table based on patientType
      if (patientData.patientType === 'inpatient') {
        const { data: inPatientData, error: inPatientError } = await supabase
          .from('inpatient')
          .insert([
            {
              patientnumber: patientNumber,
              wardnumber: null,
              dateplacedonwaitinglist: null,
              bednumber: null,
              expectednumberofstayingdays: null,
              dateplacedinward: null,
              dateexpectedtoleave: null,
              actualdateofleaving: null,
            },
          ]);
          navigate('/addinpatient', { state: { patientNumber } });
        if (inPatientError) {
          throw inPatientError;
        }

        console.log('InPatient data inserted successfully:', inPatientData);
      } else {
        const { data: outPatientData, error: outPatientError } = await supabase
          .from('outpatient')
          .insert([
            {
              patientnumber: patientNumber,
              datedismissed: null,
              bednumber: null,
              status: null,
              nodays: null,
              paymentstatus: null,
            },
          ]);
          navigate('/addoutpatient', { state: { patientNumber } });
        if (outPatientError) {
          throw outPatientError;
        }

        console.log('OutPatient data inserted successfully:', outPatientData);
      }
      
    } catch (error) {
      console.error('Error inserting patient data:', error);
    }
  };

  return (
    <div className='title'>
      <div className='common-container2'>
        <div>
          <h2>Patient</h2>
          <div className='inputs'>
            <p className='input-text'>Telephone Number:</p>
            <input
              className='telephoneNumber'
              type='tel'
              placeholder='Telephone Number'
              name='telephoneNumber'
              value={patientData.telephoneNumber}
              onChange={handleChange}
            />
            <p className='input-text'>Full Name:</p>
            <input
              className='fullName'
              type='text'
              placeholder='Full Name'
              name='fullName'
              value={patientData.fullName}
              onChange={handleChange}
            />
            <p className='input-text'>Date of Birth:</p>
            <input
              className='dateOfBirth'
              type='text'
              placeholder='YYYY-MM-DD'
              name='dateOfBirth'
              value={patientData.dateOfBirth}
              onChange={handleChange}
            />
            <p className='input-text'>Sex:</p>
            <input
              className='sex'
              type='text'
              placeholder='Sex'
              name='sex'
              value={patientData.sex}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
            <p className='input-text'>Marital Status:</p>
            <input
              className='maritalStatus'
              type='text'
              placeholder='Marital Status'
              name='maritalStatus'
              value={patientData.maritalStatus}
              onChange={handleChange}
            />
            <p className='input-text'>Date Registered:</p>
            <input
              className='dateRegistered'
              type='text'
              placeholder='YYYY-MM-DD'
              name='dateRegistered'
              value={patientData.dateRegistered}
              onChange={handleChange}
            />
            <p className='input-text'>Details of Next of Kin:</p>
            <input
              className='detailsOfNextOfKin'
              type='text'
              placeholder='Details of Next of Kin'
              name='detailsOfNextOfKin'
              value={patientData.detailsOfNextOfKin}
              onChange={handleChange}
            />
            <p className='input-text'>Address:</p>
            <input
              className='address'
              type='text'
              placeholder='Address'
              name='address'
              value={patientData.address}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
            <p className='input-text'>Patient Type:</p>
            <label>
              <input
                type='radio'
                name='patientType'
                value='inpatient'
                checked={patientData.patientType === 'inpatient'}
                onChange={handleChange}
              />
              In Patient
            </label>
            <label>
              <input
                type='radio'
                name='patientType'
                value='outpatient'
                checked={patientData.patientType === 'outpatient'}
                onChange={handleChange}
              />
              Out Patient
            </label>
          </div>
        </div>
        <div className='actions'>
          <button className='cancel' type='button' onClick={() => navigate('/patients')}>
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

export default AddPatient;
