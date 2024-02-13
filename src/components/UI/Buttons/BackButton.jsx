import { useNavigate } from "react-router-dom";

function BackButton(props) {
  const navigate = useNavigate();
  return (
    <div className="button">
      <button
        className="text-sm text-theme-blue hover:font-semibold hover:underline md:text-base"
        onClick={() => navigate(-1)}
      >
        Return
      </button>
    </div>
  );
}

export default BackButton;
