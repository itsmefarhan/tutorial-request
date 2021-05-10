const Input = ({ name, type, placeholder, value, onChange }) => {
  return (
    <div className="mt-4">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="p-2 w-11/12 md:w-1/2 focus:outline-none border border-gray-500 rounded-md focus:border-gray-800"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
