import React, { useEffect, useState } from 'react';
import './styles.css';
import { supabase } from '../client';

const Wards = ({ token }) => {
  const [fetchError, setFetchError] = useState(null);
  const [wards, setWards] = useState([]);
  const [staff, setStaff] = useState({});

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const { data, error } = await supabase.from('ward').select();

        if (error) {
          setFetchError('Could not fetch the Wards');
          setWards([]);
          console.error(error);
        }

        if (data) {
          setWards(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error('Error fetching wards:', error.message);
        setFetchError('Could not fetch wards.');
        setWards([]);
      }
    };

    const fetchStaff = async () => {
      try {
        const { data, error } = await supabase.from('staff').select('staffnumber, fullname');

        if (error) {
          console.error(error);
        }

        if (data) {
          const staffMap = data.reduce((acc, staffMember) => {
            acc[staffMember.staffnumber] = staffMember.fullname;
            return acc;
          }, {});
          setStaff(staffMap);
        }
      } catch (error) {
        console.error('Error fetching staff:', error.message);
      }
    };

    fetchWards();
    fetchStaff();
  }, []);

  const referenceCodes = {
    'S001': 'John Doe',
    'S002': 'Jane Smith',
    'S003': 'Alice Johnson',
    'S004': 'Bob Brown',
    'S005': 'Emily Davis'
  };

  return (
    <div className='title'>
      <div className='common-container'>
        <div className='actions'>
        </div>
        <div className='table-container'>
          <table className='ward-table'>
            <thead>
              <tr>
                <th>Ward Number</th>
                <th>Ward Name</th>
                <th>Location</th>
                <th>Total Number of Beds</th>
                <th>Telephone Extn</th>
                <th>Charge Nurse</th>
              </tr>
            </thead>
            <tbody>
              {wards.map((ward) => (
                <tr key={ward.wardnumber}>
                  <td>{ward.wardnumber}</td>
                  <td>{ward.wardname}</td>
                  <td>{ward.location}</td>
                  <td>{ward.totalnumberofbeds}</td>
                  <td>{ward.telephoneextn}</td>
                  <td>{referenceCodes[ward.chargenurse] || staff[ward.chargenurse] || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wards;
