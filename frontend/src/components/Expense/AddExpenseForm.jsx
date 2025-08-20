import React, { useState } from 'react';
import Inputs from '../inputs/Inputs';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({onAddExpense}) => {

  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setExpense({...expense, [key]: value})

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Inputs
        value={expense.category}
        onChange={({target}) => handleChange('category', target.value)}
        label='Category'
        placeholder='Rent, Groceries, etc'
        type='text'
      />

      <Inputs
        value={expense.amount}
        onChange={({target}) => handleChange('amount', target.value)}
        label='Amount'
        placeholder=''
        type='number'
      />

      <Inputs
        value={expense.date}
        onChange={({target}) => handleChange('date', target.value)}
        placeholder=''
        label='Date'
        type='date'
      />

      <div className="flex justify-end mt-6">
        <button 
          className="add-btn add-btn-fill"
          type='button'
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default AddExpenseForm;
