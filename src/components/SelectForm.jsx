/* eslint-disable react/prop-types */
const SelectForm = ({
  selectName,
  textDefault,
  labelText,
  options,
  onChange,
  required,
  defaultValue,
  disabled,
  extra
}) => {
  console.log(defaultValue)
  return (
    <label className="w-full">
      <span className="text-black font-medium text-xl">{labelText}</span>
      <select
        name={selectName}
        className="block w-full py-3 px-3 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-300 rounded-md mt-1 text-xl"
        onChange={onChange}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        {...extra}
      >
        <option value="">-- {textDefault} --</option>
        {options?.map((option, idx) => {
          return (
            <option value={option.value} key={idx}>
              {option.text}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default SelectForm;
