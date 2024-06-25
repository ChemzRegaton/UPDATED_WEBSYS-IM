import React, { useEffect, useState } from 'react';
import './styles.css';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom';

const NonsurgicalSupplies = ({ token }) => {
  let navigate = useNavigate();

  const [fetchError, setFetchError] = useState(null);
  const [supplies, setSupplies] = useState([]);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const { data, error } = await supabase.from('nonsurgicalsupplies').select();

        if (error) {
          setFetchError('Could not fetch the Non-Surgical Supplies');
          setSupplies([]);
          console.error(error);
        }

        if (data) {
          setSupplies(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error('Error fetching non-surgical supplies:', error.message);
        setFetchError('Could not fetch non-surgical supplies.');
        setSupplies([]);
      }
    };

    fetchSupplies();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      navigate('/addnonsurgicalsupplies');
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
                <th>Non Item Number</th>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Quantity In Stock</th>
                <th>Reorder Level</th>
                <th>Cost Per Unit</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((supply) => (
                <tr key={supply.nonitemnumber}>
                  <td>{supply.nonitemnumber}</td>
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

export default NonsurgicalSupplies;
