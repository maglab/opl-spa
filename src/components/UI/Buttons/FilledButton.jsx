function FilledButton({ label, onClick, type }) {
  return (
    <button
      className="bg-theme-blue p-2 text-white rounded-sm shadow-md px-4 font-semibold"
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}

export default FilledButton;
