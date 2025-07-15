import PropTypes from "prop-types";

AuthInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  Icon: PropTypes.object,
};

function AuthInput({ type, placeholder, value, setValue, Icon }) {
  return (
    <div className="flex align-center gap-2  w-full border border-gray-300 bg-white   rounded-md focus:ring-2 focus:ring-amber-500">
      <div className="flex align-center px-2">
        <Icon className="w-6 h-full" />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="flex-1 pr-4 py-2.5 text-gray-800 placeholder-gray-500 focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default AuthInput;
