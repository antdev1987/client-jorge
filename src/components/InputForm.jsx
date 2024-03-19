const InputForm = ({ labelText, inputProps, className = 'w-full' }) => {
  if (inputProps.type === 'textArea')
    return (
      <label className={className}>
        <span className="text-black font-medium text-xl">{labelText}</span>
        <textarea
          className="block w-full outline-none py-3 px-3 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-300 rounded-md mt-1 text-xl"
          cols={30}
          {...inputProps}
        />
      </label>
    );

  return (
    <label className={className}>
      <span className="text-black font-medium text-xl">{labelText}</span>
      <input
        className="block w-full outline-none py-3 px-3 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-300 rounded-md mt-1 text-xl"
        {...inputProps}
      />
    </label>
  );
};

export default InputForm;
