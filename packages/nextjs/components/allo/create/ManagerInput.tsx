// ManagerInput.js
import React from 'react';
import AddressInput from './AddressInput';

const ManagerInput = ({ managers, onChange, onAddManager }) => {
  return (
    <label className="flex flex-col mt-4">
      Managers:
      {managers.map((manager, index) => (
        <div className="my-2" key={index}>
          <AddressInput
            value={manager}
            onChange={(value) => onChange(index, value)}
          />
        </div>
      ))}
      <button className="flex justify-end" type="button" onClick={onAddManager}>
        Add Manager
      </button>
    </label>
  );
};

export default ManagerInput;
