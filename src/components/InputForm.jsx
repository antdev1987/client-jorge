const InputForm = ({ labelText, inputProps }) => {
  return (
    <label>
      <span className="text-black font-medium">{labelText}</span>
      <input
        className="block w-full outline-none dark:text-gray-900 border-b border-gray-700 py-2 px-3 disabled:opacity-90"
        {...inputProps}
      />
    </label>
  );
};

export default InputForm;