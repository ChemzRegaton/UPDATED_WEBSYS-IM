import React, { useEffect, useState } from 'react';
import './styles.css';
import { supabase } from '../client';

const OutPatient = () => {
  const [fetchError, setFetchError] = useState(null);
  const [outPatients, setOutPatients] = useState([]);

  useEffect(() => {
    const fetchOutPatients = async () => {
      try {
        const { data, error } = await supabase.from('outpatient').select();

        if (error) {
          setFetchError('Could not fetch the outpatients');
          setOutPatients([]);
          console.error(error);
        }

        if (data) {
          setOutPatients(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error('Error fetching outpatients:', error.message);
        setFetchError('Could not fetch outpatients.');
        setOutPatients([]);
      }
    };

    fetchOutPatients();
  }, []);

  return (
    <div className='title'>
      <div className='common-container'>
        <div className='actions'>
        </div>
        <div className='table-container'>
          <table className='outpatient-table'>
            <thead>
              <tr>
                <th>Patient Number</th>
                <th>Date Dismissed</th>
                <th>Bed Number</th>
                <th>Status</th>
                <th>No. of Days</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {outPatients.map((patient) => (
                <tr key={patient.patientnumber}>
                  <td>{patient.patientnumber}</td>
                  <td>{patient.datedismissed}</td>
                  <td>{patient.bednumber}</td>
                  <td>{patient.status}</td>
                  <td>{patient.nodays}</td>
                  <td>{patient.paymentstatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OutPatient;
