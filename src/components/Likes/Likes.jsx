import withSVG from "../../utils/hoc/withSVG";
import LikeUp from "../UI/Icons/LikeUp";
import LikeDown from "../UI/Icons/LikeDown";

const UpIcon = withSVG(LikeUp);
const DownIcon = withSVG(LikeDown);
function Likes({ numberOfLikes = 0 }) {
  return (
    <div className="likes flex flex-col justify-center items-center">
      <UpIcon />
      <p className="text-lg"> {numberOfLikes} </p>
      <DownIcon />
    </div>
  );
}

export default Likes;
