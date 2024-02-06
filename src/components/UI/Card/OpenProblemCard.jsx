function OpenProblemCard({ title, description, classNames }) {
  return (
    <div
      className={`card bg-white shadow-md p-6 rounded overflow-hidden text-wrap text-ellipsis ${classNames}`}
    >
      <h1 className="text-theme-blue pb-2"> {title}</h1>
      <p className="text-sm">{description}</p>
    </div>
  );
}

export default OpenProblemCard;
