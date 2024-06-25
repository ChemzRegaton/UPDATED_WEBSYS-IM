import React, { useState } from 'react';
import { supabase } from '../client';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const AddPharmaceuticalSupplies = () => {
  const navigate = useNavigate();

  const [pharmaceuticalSuppliesData, setPharmaceuticalSuppliesData] = useState({
    drugNumber: '',
    drugName: '',
    description: '',
    dosage: '',
    methodofAdmin: '',
    quantityInStock: '',
    reorderLevel: '',
    costPerUnit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPharmaceuticalSuppliesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const drugNumber = `Drug_${Date.now()}`;
  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('pharmaceuticalsupplies')
        .insert([
          {
            drugnumber: drugNumber,
            drugname: pharmaceuticalSuppliesData.drugName,
            description: pharmaceuticalSuppliesData.description,
            dosage: pharmaceuticalSuppliesData.dosage,
            methodofadmin: pharmaceuticalSuppliesData.methodofAdmin,
            quantityinstock: pharmaceuticalSuppliesData.quantityInStock,
            reorderlevel: pharmaceuticalSuppliesData.reorderLevel,
            costperunit: pharmaceuticalSuppliesData.costPerUnit,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log('Pharmaceutical supply data inserted successfully:', data);
      navigate('/pharmaceuticalsupplies');
    } catch (error) {
      console.error('Error inserting pharmaceutical supply data:', error);
    }
  };

  return (
    <div className='title'>
      <div className='common-container2'>
        <div>
          <h2>Add New Pharmaceutical Supply</h2>
          <div>
          <div className='inputs'>
            <p className='input-text'>Drug Name:</p>
            <input
              className='drugName'
              type='text'
              placeholder='Drug Name'
              name='drugName'
              value={pharmaceuticalSuppliesData.drugName}
              onChange={handleChange}
            />
            <p className='input-text'>Description:</p>
            <input
              className='description'
              type='text'
              placeholder='Description'
              name='description'
              value={pharmaceuticalSuppliesData.description}
              onChange={handleChange}
            />
            <p className='input-text'>Dosage:</p>
            <input
              className='dosage'
              type='text'
              placeholder='Dosage'
              name='dosage'
              value={pharmaceuticalSuppliesData.dosage}
              onChange={handleChange}
            />
            </div>
            <div className='inputs'>
            <p className='input-text'>Method of Administration:</p>
            <input
              className='methodofAdmin'
              type='text'
              placeholder='Method of Administration'
              name='methodofAdmin'
              value={pharmaceuticalSuppliesData.methodofAdmin}
              onChange={handleChange}
            />
            <p className='input-text'>Quantity In Stock:</p>
            <input
              className='quantityInStock'
              type='number'
              placeholder='Quantity In Stock'
              name='quantityInStock'
              value={pharmaceuticalSuppliesData.quantityInStock}
              onChange={handleChange}
            />
            <p className='input-text'>Reorder Level:</p>
            <input
              className='reorderLevel'
              type='number'
              placeholder='Reorder Level'
              name='reorderLevel'
              value={pharmaceuticalSuppliesData.reorderLevel}
              onChange={handleChange}
            />
            <p className='input-text'>Cost Per Unit:</p>
            <input
              className='costPerUnit'
              type='number'
              placeholder='Cost Per Unit'
              name='costPerUnit'
              value={pharmaceuticalSuppliesData.costPerUnit}
              onChange={handleChange}
            />
          </div>
          </div>
        </div>
        <div className='actions'>
          <button className='cancel' type='button' onClick={() => navigate('/pharmaceuticalsupplies')}>
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

export default AddPharmaceuticalSupplies;