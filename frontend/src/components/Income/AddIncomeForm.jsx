import React, { useState } from 'react';
import Inputs from '../inputs/Inputs';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {

  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleonChange = (key, value) => setIncome({...income, [key]: value});

  return (
    <div>

    <EmojiPickerPopup
      icon={income.icon}
      onSelect={(selectedIcon) => handleonChange("icon", selectedIcon)}
    />

      <Inputs
        value={income.source}
        onChange={({target}) => handleonChange("source", target.value)}
        label="Income Source"
        placeholder='Freelance, Salary, etc'
        type='text'
      />

      <Inputs
        value={income.amount}
        onChange={({target}) => handleonChange("amount", target.value)}
        label="Amount"
        placeholder=''
        type='number'
      />

      <Inputs
        value={income.date}
        onChange={({target}) => handleonChange("date", target.value)}
        label='date'
        placeholder=''
        type='date'
      />

      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='add-btn add-btn-fill'
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
}

export default AddIncomeForm;
