function OpenProblemCard({ title, description }) {
  return (
    <div className="card bg-white">
      <span>
        <h1> {title}</h1>
      </span>
      <span>{description}</span>
    </div>
  );
}

export default OpenProblemCard;
