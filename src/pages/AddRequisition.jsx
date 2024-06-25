import React, { useState } from 'react';
import { supabase } from '../client';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';

const AddRequisition = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [requisitionData, setRequisitionData] = useState({
    wardNumber: '',
    wardName: '',
    requisitionBy: '',
    requisitionDate: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequisitionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setRequisitionData((prevData) => ({
      ...prevData,
      type: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate a unique requisition number
      const requisitionNumber = `Requisition_${Date.now()}`;

      // Insert into requisition table
      const { data: requisitionResponse, error: requisitionError } = await supabase
        .from('requisition')
        .insert([
          {
            requisitionnumber: requisitionNumber,
            wardnumber: requisitionData.wardNumber,
            wardname: requisitionData.wardName,
            requisitionby: requisitionData.requisitionBy,
            requisitiondate: requisitionData.requisitionDate,
            type: requisitionData.type,
          },
        ]);

      if (requisitionError) {
        throw requisitionError;
      }

      console.log('Requisition data inserted successfully:', requisitionResponse);

      // Navigate to the respective page based on the requisition type
      if (requisitionData.type === 'surgical') {
        navigate('/addsurgicalsupplies', { state: { requisitionNumber } });
      } else if (requisitionData.type === 'non-surgical') {
        navigate('/addnonsurgicalsupplies', { state: { requisitionNumber } });
      } else if (requisitionData.type === 'pharmaceutical') {
        navigate('/addpharmaceuticalsupplies', { state: { requisitionNumber } });
      }
    } catch (error) {
      console.error('Error inserting requisition data:', error);
      if (error.code === 'PGRST204') {
        console.error("It seems the column 'requisitiondate' does not exist in the 'requisition' table. Please check the Supabase schema.");
      }
    }
  };

  return (
    <div className="title">
      <div className="common-container2">
        <h2>Add Requisition</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <p className="input-text">Ward Number:</p>
            <input
              className="input"
              type="text"
              placeholder="Ward Number"
              name="wardNumber"
              value={requisitionData.wardNumber}
              onChange={handleChange}
            />
            <p className="input-text">Ward Name:</p>
            <input
              className="input"
              type="text"
              placeholder="Ward Name"
              name="wardName"
              value={requisitionData.wardName}
              onChange={handleChange}
            />
            <p className="input-text">Requisition By:</p>
            <input
              className="input"
              type="text"
              placeholder="Requisition By"
              name="requisitionBy"
              value={requisitionData.requisitionBy}
              onChange={handleChange}
            />
            <p className="input-text">Requisition Date:</p>
            <input
              className="input"
              type="text"
              placeholder="YYYY-MM-DD"
              name="requisitionDate"
              value={requisitionData.requisitionDate}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <p className="input-text">Type:</p>
            <label>
              <input
                type="radio"
                name="type"
                value="surgical"
                checked={requisitionData.type === 'surgical'}
                onChange={handleRadioChange}
              />
              Surgical
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="non-surgical"
                checked={requisitionData.type === 'non-surgical'}
                onChange={handleRadioChange}
              />
              Non-Surgical
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="pharmaceutical"
                checked={requisitionData.type === 'pharmaceutical'}
                onChange={handleRadioChange}
              />
              Pharmaceutical
            </label>
          </div>
          <div className="actions">
            <button className="submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequisition;
