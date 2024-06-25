import React, { useState } from 'react';
import { supabase } from '../client';  // Adjust the import path as needed
import './styles.css';
import { useNavigate } from 'react-router-dom';

const AddSupplier = () => {
  const navigate = useNavigate();

  const [supplierData, setSupplierData] = useState({
    SupplierName: '',
    Address: '',
    Email: '',
    TelephoneNo: '',
    FaxNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Generate SupplierNo
      const supplierNo = `SUP${Date.now()}`;

      const { data: supplierResponse, error: supplierError } = await supabase
        .from('suppliers')
        .insert([
          {
            supplierno: supplierNo,
            suppliername: supplierData.SupplierName,
            address: supplierData.Address,
            email: supplierData.Email,
            telephoneno: supplierData.TelephoneNo,
            faxno: supplierData.FaxNo,
          },
        ]);

      if (supplierError) {
        throw supplierError;
      }

      console.log('Supplier data inserted successfully:', supplierResponse);

      navigate('/suppliers');
    } catch (error) {
      console.error('Error inserting supplier data:', error);
    }
  };

  return (
    <div className='title'>
      <div className='common-container2'>
        <div>
          <h2>Add Supplier</h2>
          <div className='inputs'>
            <p className='input-text'>Supplier Name:</p>
            <input
              className='SupplierName'
              type='text'
              placeholder='Supplier Name'
              name='SupplierName'
              value={supplierData.SupplierName}
              onChange={handleChange}
            />
            <p className='input-text'>Address:</p>
            <input
              className='Address'
              type='text'
              placeholder='Address'
              name='Address'
              value={supplierData.Address}
              onChange={handleChange}
            />
            <p className='input-text'>Email:</p>
            <input
              className='Email'
              type='email'
              placeholder='Email'
              name='Email'
              value={supplierData.Email}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
            <p className='input-text'>Telephone No:</p>
            <input
              className='TelephoneNo'
              type='tel'
              placeholder='Telephone No'
              name='TelephoneNo'
              value={supplierData.TelephoneNo}
              onChange={handleChange}
            />
            <p className='input-text'>Fax No:</p>
            <input
              className='FaxNo'
              type='text'
              placeholder='Fax No'
              name='FaxNo'
              value={supplierData.FaxNo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='actions'>
          <button className='cancel' type='button' onClick={() => navigate('/suppliers')}>
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

export default AddSupplier;
