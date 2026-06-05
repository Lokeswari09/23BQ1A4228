import React from 'react';
import './PrioritySelector.css';

const PrioritySelector = ({ value, onChange }) => {
  const options = [10, 15, 20, 25, 30];
  
  return (
    <div className="priority-selector">
      <label className="selector-label">
        📊 Show Top
        <select 
          value={value} 
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="selector-dropdown"
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        Notifications
      </label>
    </div>
  );
};

export default PrioritySelector;