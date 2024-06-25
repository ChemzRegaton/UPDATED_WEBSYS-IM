import React, { useEffect, useState } from 'react';
import './styles.css';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom';

const SurgicalSupplies = ({ token }) => {
  let navigate = useNavigate();

  const [fetchError, setFetchError] = useState(null);
  const [supplies, setSupplies] = useState([]);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const { data, error } = await supabase.from('surgicalsupplies').select();

        if (error) {
          setFetchError('Could not fetch the Surgical Supplies');
          setSupplies([]);
          console.error(error);
        }

        if (data) {
          setSupplies(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error('Error fetching surgical supplies:', error.message);
        setFetchError('Could not fetch surgical supplies.');
        setSupplies([]);
      }
    };

    fetchSupplies();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      navigate('/addsurgicalsupplies');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className='title'>
      <div className='common-container'>
        <div className='actions'>

        </div>
        <div className='table-container'>
          <table className='supplies-table'>
            <thead>
              <tr>
                <th>Item Number</th>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Quantity In Stock</th>
                <th>Reorder Level</th>
                <th>Cost Per Unit</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((supply) => (
                <tr key={supply.itemnumber}>
                  <td>{supply.itemnumber}</td>
                  <td>{supply.itemname}</td>
                  <td>{supply.itemdescription}</td>
                  <td>{supply.quantityinstock}</td>
                  <td>{supply.reorderlevel}</td>
                  <td>{supply.costperunit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SurgicalSupplies;
