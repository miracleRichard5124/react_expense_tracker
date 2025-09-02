import React from 'react';
import Select from 'react-select';


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "4px",
    minHeight: '42px',
    border: state.isFocused ? "2px solid #7c3aed" : "1px solid #cbd5e1", // purple on focus
    backgroundColor: "#f9fafb", // light gray background
    color: "#1e293b" // text color
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#1d293d" // text color
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "white" // dropdown menu bg
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#875cf5" : "white", // light purple hover
    color: "#1e293b"
  })
};

const SelectInput = ({options, value, onChange, placeholder}) => {
  return (
    <Select
      options={options}
      value={options.find((opt) => opt.value === value)}
      onChange={onChange}
      styles={customStyles}
      className="react-select-container w-full"
      classNamePrefix="react-select"
      placeholder={placeholder || "Select an option"}
    />
  );
}

export default SelectInput;
