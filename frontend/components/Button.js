const Button = ({ label }) => {
  return (
    <div className="mt-4">
      <button className="py-2 px-4 border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white">
        {label}
      </button>
    </div>
  );
};

export default Button;
