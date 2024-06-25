import React, { useEffect, useState } from 'react';
import './styles.css'; // Ensure this file contains the necessary CSS styles
import { supabase } from '../client'; // Make sure this is the correct path to your Supabase client
import { Link, useNavigate } from 'react-router-dom';

const PharmaceuticalSupplies = () => {
  const [fetchError, setFetchError] = useState(null);
  const [supplies, setSupplies] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const { data, error } = await supabase.from('pharmaceuticalsupplies').select();

        if (error) {
          setFetchError('Could not fetch the supplies');
          setSupplies([]);
          console.error(error);
        }

        if (data) {
          setSupplies(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error('Error fetching supplies:', error.message);
        setFetchError('Could not fetch supplies.');
        setSupplies([]);
      }
    };

    fetchSupplies();
  }, []);

  async function handleAddSupply() {
    try {
      navigate('/addpharmaceuticalsupplies');
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
                <th>Drug Number</th>
                <th>Drug Name</th>
                <th>Description</th>
                <th>Dosage</th>
                <th>Method of Administration</th>
                <th>Quantity In Stock</th>
                <th>Reorder Level</th>
                <th>Cost Per Unit</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((supply) => (
                <tr key={supply.drugnumber}>
                  <td>{supply.drugnumber}</td>
                  <td>{supply.drugname}</td>
                  <td>{supply.description}</td>
                  <td>{supply.dosage}</td>
                  <td>{supply.methodofadmin}</td>
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

export default PharmaceuticalSupplies;
