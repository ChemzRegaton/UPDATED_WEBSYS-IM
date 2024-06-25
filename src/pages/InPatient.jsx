import React, { useEffect, useState } from 'react';
import './styles.css';
import { supabase } from '../client';

const InPatient = () => {
  const [fetchError, setFetchError] = useState(null);
  const [inPatients, setInPatients] = useState([]);

  useEffect(() => {
    const fetchInPatients = async () => {
      try {
        const { data, error } = await supabase.from('inpatient').select();

        if (error) {
          setFetchError('Could not fetch the inpatients');
          setInPatients([]);
          console.error(error);
        }

        if (data) {
          setInPatients(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error('Error fetching inpatients:', error.message);
        setFetchError('Could not fetch inpatients.');
        setInPatients([]);
      }
    };

    fetchInPatients();
  }, []);

  return (
    <div className='title'>
      <div className='common-container'>
        <div className='actions'>
        
        </div>
        <div className='table-container'>
          <table className='inpatient-table'>
            <thead>
              <tr>
                <th>Patient Number</th>
                <th>Ward Number</th>
                <th>Date Placed On Waiting List</th>
                <th>Bed Number</th>
                <th>Expected Number Of Staying Days</th>
                <th>Date Placed In Ward</th>
                <th>Date Expected To Leave</th>
                <th>Actual Date Of Leaving</th>
              </tr>
            </thead>
            <tbody>
              {inPatients.map((patient) => (
                <tr key={patient.patientnumber}>
                  <td>{patient.patientnumber}</td>
                  <td>{patient.wardnumber}</td>
                  <td>{patient.dateplacedonwaitinglist}</td>
                  <td>{patient.bednumber}</td>
                  <td>{patient.expectednumberofstayingdays}</td>
                  <td>{patient.dateplacedinward}</td>
                  <td>{patient.dateexpectedtoleave}</td>
                  <td>{patient.actualdateofleaving}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InPatient;
