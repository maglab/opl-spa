function OutlinedButton({ label, onClick, type }) {
  return (
    <button
      onClick={onClick}
      className="p-2 border-theme-blue text-theme-blue shadow-md rounded-sm border-2 px-4 font-semibold"
      type={type}
    >
      {label}
    </button>
  );
}

export default OutlinedButton;
