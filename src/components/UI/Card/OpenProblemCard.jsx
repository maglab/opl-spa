function OpenProblemCard({ title, description }) {
  return (
    <div className="card bg-white shadow-md p-4 rounded">
      <span>
        <h1 className="text-theme-blue"> {title}</h1>
      </span>
      <span className="text-sm">{description}</span>
    </div>
  );
}

export default OpenProblemCard;
