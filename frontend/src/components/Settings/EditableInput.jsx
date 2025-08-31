import React, { useState } from 'react';
import { FaCheck, FaPen } from 'react-icons/fa6';

const EditableInput = ({label, value, onSave, type = 'text'}) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  const handleSave = () => {
    setEditing(false);
    onSave(tempValue);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box flex items-center">
        <input
          type={type}
          value={tempValue}
          readOnly={!editing}
          onChange={(e) => setTempValue(e.target.value)}
          className={`w-full bg-transparent outline-none ${
            !editing ? "cursor-default" : ""
          }`}
        />

        {editing ? (
          <FaCheck
            size={20}
            className="text-green-500 cursor-pointer ml-2"
            onClick={handleSave}
          />
        ) : (
          <FaPen
            size={16}
            className="text-slate-400 cursor-pointer ml-2"
            onClick={() => setEditing(true)}
          />
        )}
      </div>
    </div>
  );
}

export default EditableInput;
