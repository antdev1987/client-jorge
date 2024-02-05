const SelectForm = ({
  selectName,
  textDefault,
  labelText,
  options,
  onChange,
  required,
  defaultValue,
  disabled
}) => {
  return (
    <label>
      <span className="text-black font-medium">{labelText}</span>
      <select
        name={selectName}
        className="block w-full py-2 px-3 text-gray-800 border-gray-700 border-b outline-none mt-1"
        onChange={onChange}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        <option value="">-- {textDefault} --</option>
        {options?.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default SelectForm;
