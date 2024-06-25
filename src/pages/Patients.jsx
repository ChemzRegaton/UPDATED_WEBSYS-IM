import React, { useEffect, useState } from 'react';
import './styles.css';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom';

const Patients = ({ token }) => {
  
  let navigate =useNavigate();


  /*1. Nag gamit ug [useState] para ma perform ang mga side functions
    2. Ang [useState] siya ang hooker sa React*/
  const [fetchError, setFetchError] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {

    /*1. Mao ni ang time nga ma use si fetch patient together sa useState*/
    const fetchPatients = async () => {
      try {
        /*Diri nga para is mao ang pag set sa constant which is 
        1. data - mao na ang butangan sa mga na fetch gikan sa supabase
        2. error - mao na ang makita or diha ma sulod ang error nga nahitabo*/
        const { data, error } = await supabase.from('patient').select();

        /*if naay sulod ang error is ma execute ni nga part */
        if (error) {
          setFetchError('Could not fetch the Patients');
          setPatients([]);
          console.error(error);
        }
        /*kung naanay sulod ang data nga constant maexecute ni nga part*/
        if (data) {
          setPatients(data);
          setFetchError(null);
        }

       //Mao ni ang part nga e cath ang error sa tibook nga try-catch 
      } catch (error) {
        console.error('Error fetching patients:', error.message);
        setFetchError('Could not fetch patients.');
        setPatients([]);
      }
    };

  fetchPatients();
  }, []);


  //kini nga mart is mao ang function kung matuplok na ang Add new Patient
  async function handleSubmit(e) {
    e.preventDefault();
    try {
        //kung matuplok na ang add new patient ug walay error iya dayun e redirect didto sa add new patient nga page.
        navigate('/addpatients');
    } catch (error) {
        alert(error.message);
    }
}
  //mao ni ang visible nga ma kita didto sa page which is ang front end
  return (
    <div className='title'>
      <div className='common-container'>
        <div className='actions' >
          
          <button type='Button'onClick={handleSubmit}>Add New Patient</button>
        </div>
        <div className='table-container'>
          <table className='patients-table'>
            <thead>
              <tr>
                <th>Patient Number</th>
                <th>Telephone Number</th>
                <th>Fullname</th>
                <th>Date of Birth</th>
                <th>Sex</th>
                <th>Marital Status</th>
                <th>Date Registered</th>
                <th>Details of Next of Kin</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.patientnumber}>
                  <td>{patient.patientnumber}</td>
                  <td>{patient.telephonenumber}</td>
                  <td>{patient.fullname}</td>
                  <td>{patient.dateofbirth}</td>
                  <td>{patient.sex}</td>
                  <td>{patient.maritalstatus}</td>
                  <td>{patient.dateregistered}</td>
                  <td>{patient.detailsofnextofkin}</td>
                  <td>{patient.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;
