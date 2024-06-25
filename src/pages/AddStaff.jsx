import React, { useState } from 'react';
import { supabase } from '../client';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const AddStaff = () => {
    let navigate = useNavigate()

  const [staffData, setStaffData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    address: '',
    telephonenumber: '',
    dateofbirth: '',
    sex: '',
    nationalinsurancenumber: '',
    currentsalary: '',
    salaryscale: '',
    typeofemploymentcontract: '',
    numberofhoursworkedperweek: '',
    typeofsalarypayment: '',
    positionheld: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const staffnumber = `Staff_${Date.now()}`;

      const { data, error } = await supabase
        .from('staff')
        .insert([
          {
            staffnumber,
            firstname: staffData.firstname,
            middlename: staffData.middlename,
            lastname: staffData.lastname,
            address: staffData.address,
            telephonenumber: staffData.telephonenumber,
            dateofbirth: staffData.dateofbirth,
            sex: staffData.sex,
            nationalinsurancenumber: staffData.nationalinsurancenumber,
            currentsalary: staffData.currentsalary,
            salaryscale: staffData.salaryscale,
            typeofemploymentcontract: staffData.typeofemploymentcontract,
            numberofhoursworkedperweek: staffData.numberofhoursworkedperweek,
            typeofsalarypayment: staffData.typeofsalarypayment,
            positionheld: staffData.positionheld,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log('Staff data inserted successfully:', data);
      navigate('/staffs'); 
    } catch (error) {
      console.error('Error inserting staff data:', error.message);
    }
  };

  return (
    <div className='title'>
      <div className='common-container3'>
        <div>
          <div className='inputs'>
            <p className='input-text'>First Name:</p>
            <input
              className='firstName'
              type='text'
              placeholder='First Name'
              name='firstname'
              value={staffData.firstname}
              onChange={handleChange}
            />
            <p className='input-text'>Middle Name:</p>
            <input
              className='middleName'
              type='text'
              placeholder='Middle Name'
              name='middlename'
              value={staffData.middlename}
              onChange={handleChange}
            />
            <p className='input-text'>Last Name:</p>
            <input
              className='lastName'
              type='text'
              placeholder='Last Name'
              name='lastname'
              value={staffData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
            <p className='input-text'>Address:</p>
            <input
              className='address'
              type='text'
              placeholder='Address'
              name='address'
              value={staffData.address}
              onChange={handleChange}
            />
            <p className='input-text'>Telephone Number:</p>
            <input
              className='telephoneNumber'
              type='tel'
              placeholder='Telephone Number'
              name='telephonenumber'
              value={staffData.telephonenumber}
              onChange={handleChange}
            />
            <p className='input-text'>Date of Birth:</p>
            <input
              className='dateOfBirth'
              type='text'
              placeholder='YYYY-MM-DD'
              name='dateofbirth'
              value={staffData.dateofbirth}
              onChange={handleChange}
            />
            <p className='input-text'>Sex:</p>
            <input
              className='sex'
              type='text'
              placeholder='Sex'
              name='sex'
              value={staffData.sex}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
            <p className='input-text'>National Insurance Number:</p>
            <input
              className='nationalInsuranceNumber'
              type='text'
              placeholder='National Insurance Number'
              name='nationalinsurancenumber'
              value={staffData.nationalinsurancenumber}
              onChange={handleChange}
            />
            <p className='input-text'>Current Salary:</p>
            <input
              className='currentSalary'
              type='text'
              placeholder='Current Salary'
              name='currentsalary'
              value={staffData.currentsalary}
              onChange={handleChange}
            />
            <p className='input-text'>Salary Scale:</p>
            <input
              className='salaryScale'
              type='text'
              placeholder='Salary Scale'
              name='salaryscale'
              value={staffData.salaryscale}
              onChange={handleChange}
            />
            <p className='input-text'>Type of Employment Contract:</p>
            <input
              className='employmentContract'
              type='text'
              placeholder='Type of Employment Contract'
              name='typeofemploymentcontract'
              value={staffData.typeofemploymentcontract}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
            <p className='input-text'>Number of Hours Worked Per Week:</p>
            <input
              className='hoursWorkedPerWeek'
              type='text'
              placeholder='Number of Hours Worked Per Week'
              name='numberofhoursworkedperweek'
              value={staffData.numberofhoursworkedperweek}
              onChange={handleChange}
            />
            <p className='input-text'>Type of Salary Payment:</p>
            <input
              className='salaryPayment'
              type='text'
              placeholder='Type of Salary Payment'
              name='typeofsalarypayment'
              value={staffData.typeofsalarypayment}
              onChange={handleChange}
            />
            <p className='input-text'>Position Held:</p>
            <input
              className='positionHeld'
              type='text'
              placeholder='Position Held'
              name='positionheld'
              value={staffData.positionheld}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='actions'>
          <button className='cancel' type='button' onClick={() => navigate('/staffs')}>
            Cancel
          </button>
          <button className='submit' type='button' onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
