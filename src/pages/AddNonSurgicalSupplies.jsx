import React, { useState } from 'react';
import { supabase } from '../client';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const AddNonSurgicalSupplies = () => {
  const navigate = useNavigate();

  const [nonsurgicalSuppliesData, setSuppliesData] = useState({
    nonitemnumber: '',
    itemName: '',
    itemDescription: '',
    quantityInStock: '',
    reorderLevel: '',
    costPerUnit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuppliesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nonItemNumber = `NonSur_${Date.now()}`;
  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('nonsurgicalsupplies')
        .insert([
          {
            nonitemnumber: nonItemNumber,
            itemname: nonsurgicalSuppliesData.itemName,
            itemdescription: nonsurgicalSuppliesData.itemDescription,
            quantityinstock: nonsurgicalSuppliesData.quantityInStock,
            reorderlevel: nonsurgicalSuppliesData.reorderLevel,
            costperunit: nonsurgicalSuppliesData.costPerUnit,
          },    
        ]);

      if (error) {
        throw error;
      }

      console.log('Nonsurgical supply data inserted successfully:', data);
      navigate('/nonsurgicalsupplies');
    } catch (error) {
      console.error('Error inserting nonsurgical supplies data:', error);
    }
  };

  return (
    <div className='title'>
      <div className='common-container2'>
        <div>
          <h2>Add Nonsurgical Supplies</h2>
          <div>
            <div className='inputs'>    
            <p className='input-text'>Item Name:</p>
            <input
              className='itemName'
              type='text'
              placeholder='Item Name'
              name='itemName'
              value={nonsurgicalSuppliesData.itemName}
              onChange={handleChange}
            />
          <p className='input-text'>Item Description:</p>
            <input
              className='itemDescription'
              type='text'
              placeholder='Item Description'
              name='itemDescription'
              value={nonsurgicalSuppliesData.itemDescription}
              onChange={handleChange}
            />
          </div>
          <div className='inputs'>
            <p className='input-text'>Quantity In Stock:</p>
            <input
              className='quantityInStock'
              type='number'
              placeholder='Quantity In Stock'
              name='quantityInStock'
              value={nonsurgicalSuppliesData.quantityInStock}
              onChange={handleChange}
            />
             <p className='input-text'>Reorder Level:</p>
            <input
              className='reorderLevel'
              type='number'
              placeholder='Reorder Level'
              name='reorderLevel'
              value={nonsurgicalSuppliesData.reorderLevel}
              onChange={handleChange}
            />
              <p className='input-text'>Cost Per Unit:</p>
            <input
              className='costPerUnit'
              type='number'
              placeholder='Cost Per Unit'
              name='costPerUnit'
              value={nonsurgicalSuppliesData.costPerUnit}
              onChange={handleChange}
            />
            </div>    
          </div>
        </div>
        <div className='actions'>
          <button className='cancel' type='button' onClick={() => navigate('/nonsurgicalsupplies')}>
            Cancel
          </button>
          <button className='submit' type='button' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNonSurgicalSupplies;