import { Link } from "react-router-dom";
function ProblemsButton() {
  return (
    <button className="text-sm p-2 bg-theme-blue text-white rounded-sm">
      <Link to="/open-problems">Open Problems</Link>
    </button>
  );
}

export default ProblemsButton;
