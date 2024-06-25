import React, { useEffect, useState } from 'react';
import './styles.css';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const Staffs = ({ token }) => {
  let navigate = useNavigate()

  const [fetchError, setFetchError] = useState(null);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data, error } = await supabase.from('staff').select();

        if (error) {
          setFetchError('Could not fetch the Staff');
          setStaff([]);
          console.error(error);
        }

        if (data) {
          setStaff(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error('Error fetching staff:', error.message);
        setFetchError('Could not fetch staff.');
        setStaff([]);
      }
    };

    fetchStaff();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        navigate('/addstaff');
    } catch (error) {
        alert(error.message);
    }
}

  return (
    <div className='title'>
      <div className='common-container'>
        <div className='actions'>
          
          <button type='submit' onClick={handleSubmit}>Add New Staff</button>
        </div>
        <div className='table-container'>
          <table className='staff-table'>
            <thead>
              <tr>
              <th>Staff Number</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Telephone Number</th>
                <th>Date of Birth</th>
                <th>Sex</th>
                <th>National Insurance Number</th>
                <th>Current Salary</th>
                <th>Salary Scale</th>
                <th>Type of Employment Contract</th>
                <th>Number of Hours Worked Per Week</th>
                <th>Type of Salary Payment</th>
                <th>Position Held</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((staffMember) => (
                <tr key={staffMember.staffnumber}>
                  <td>{staffMember.staffnumber}</td>
                  <td>{staffMember.firstname}</td>
                  <td>{staffMember.middlename}</td>
                  <td>{staffMember.lastname}</td>
                  <td>{staffMember.address}</td>
                  <td>{staffMember.telephonenumber}</td>
                  <td>{staffMember.dateofbirth}</td>
                  <td>{staffMember.sex}</td>
                  <td>{staffMember.nationalinsurancenumber}</td>
                  <td>{staffMember.currentsalary}</td>
                  <td>{staffMember.salaryscale}</td>
                  <td>{staffMember.typeofemploymentcontract}</td>
                  <td>{staffMember.numberofhoursworkedperweek}</td>
                  <td>{staffMember.typeofsalarypayment}</td>
                  <td>{staffMember.positionheld}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Staffs;
