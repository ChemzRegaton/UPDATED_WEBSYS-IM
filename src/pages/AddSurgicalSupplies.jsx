import React, { useState } from 'react';
import { supabase } from '../client';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const AddSurgicalSupplies = () => {
  const navigate = useNavigate();

  const [surgicalSuppliesData, setSuppliesData] = useState({
    itemNumber: '',
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
  const itemNumber = `Sur_${Date.now()}`;
  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('surgicalsupplies')
        .insert([
          {
            itemnumber: itemNumber,
            itemname: surgicalSuppliesData.itemName,
            itemdescription: surgicalSuppliesData.itemDescription,
            quantityinstock: surgicalSuppliesData.quantityInStock,
            reorderlevel: surgicalSuppliesData.reorderLevel,
            costperunit: surgicalSuppliesData.costPerUnit,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log('Surgical supply data inserted successfully:', data);
      navigate('/surgicalsupplies');
    } catch (error) {
      console.error('Error inserting surgical supply data:', error);
    }
  };

  return (
    <div className='title'>
      <div className='common-container2'>
        <div>
          <h2>Add New Surgical Supply</h2>
          <div>
            <div className='inputs'>
              <p className='input-text'>Item Name:</p>
              <input
                className='itemName'
                type='text'
                placeholder='Item Name'
                name='itemName'
                value={surgicalSuppliesData.itemName}
                onChange={handleChange}
              />
              <p className='input-text'>Item Description:</p>
              <input
                className='itemDescription'
                type='text'
                placeholder='Item Description'
                name='itemDescription'
                value={surgicalSuppliesData.itemDescription}
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
                value={surgicalSuppliesData.quantityInStock}
                onChange={handleChange}
              />
              <p className='input-text'>Reorder Level:</p>
              <input
                className='reorderLevel'
                type='number'
                placeholder='Reorder Level'
                name='reorderLevel'
                value={surgicalSuppliesData.reorderLevel}
                onChange={handleChange}
              />
              <p className='input-text'>Cost Per Unit:</p>
              <input
                className='costPerUnit'
                type='number'
                placeholder='Cost Per Unit'
                name='costPerUnit'
                value={surgicalSuppliesData.costPerUnit}
                onChange={handleChange}
              />
            </div>   
          </div>
        </div>
        <div className='actions'>
          <button className='cancel' type='button' onClick={() => navigate('/surgicalsupplies')}>
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

export default AddSurgicalSupplies;