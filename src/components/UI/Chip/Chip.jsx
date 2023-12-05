function Chip({ children }) {
  return (
    <div className="chip border border-theme-blue w-fit rounded-3xl px-2 bg-white text-xs hover:bg-theme-blue hover:text-white">
      {children}
    </div>
  );
}

export default Chip;
