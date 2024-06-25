import React, { useEffect, useState } from 'react';
import './styles.css';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const Suppliers = () => {
  let navigate = useNavigate();

  const [fetchError, setFetchError] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const { data, error } = await supabase.from('suppliers').select();
        if (error) {
          setFetchError('Could not fetch the Suppliers');
          setSuppliers([]);
          console.error(error);
        }

        if (data) {
          console.log('Fetched Suppliers:', data); // Debugging log
          setSuppliers(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error.message);
        setFetchError('Could not fetch suppliers.');
        setSuppliers([]);
      }
    };

    fetchSuppliers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      navigate('/addsupplier');
    } catch (error) {
      alert(error.message);
    }
  }

  // Debugging: log suppliers before rendering
  console.log('Suppliers to Render:', suppliers);

  return (
    <div className='title'>
      <div className='common-container'>
        <div className='actions'>
          <button type='submit' onClick={handleSubmit}>Add New Supplier</button>
        </div>
        <div className='table-container'>
          <table className='supplier-table'>
            <thead>
              <tr>
                <th>Supplier Number</th>
                <th>Supplier Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Telephone Number</th>
                <th>Fax Number</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.supplierno}>
                  <td>{supplier.supplierno}</td>
                  <td>{supplier.suppliername}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.telephoneno}</td>
                  <td>{supplier.faxno}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {fetchError && <p>{fetchError}</p>}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
