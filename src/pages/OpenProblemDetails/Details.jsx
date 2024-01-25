import { useLoaderData } from "react-router-dom";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { detailsActions } from "../../state/Details/detailsSlice";

import InformationSection from "./InformationInterface/InformationSection";
import Likes from "../../components/Likes/Likes";
function Details() {
  const { data } = useLoaderData();
  const description = data.description;
  const id = data.problem_id;
  const title = data.title;
  const children = data.children;
  const parent = data.parent_problem;
  const isRoot = parent ? false : true;

  const dispatch = useDispatch();

  // Dispatch loader data into redux store to be used by other components
  useEffect(() => {
    dispatch(detailsActions.resetState());
    dispatch(detailsActions.setOpenProblem({ id: id }));
  }, [id, dispatch]);
  // Select the title of the open problem to use as the anchor for the scrollToView function
  const ref = useRef(null);

  return (
    <div className="h-full overflow-auto flex flex-col justify-center">
      <hr className="border-1 border-theme-blue" />
      <div className="return-bttn">
        <Link
          to="/open-problems"
          className="pt-2 text-base text-theme-blue underline hover:font-semibold md:text-lg"
          onClick={() => dispatch(detailsActions.resetState())}
        >
          {" "}
          Return{" "}
        </Link>
      </div>
      <div ref={ref} className="title flex flex-row items-center pt-8 gap-2">
        <Likes />
        <h1 className="text-lg md:text-2xl" id={`title${id}`}>
          <u>{title}</u>{" "}
        </h1>
      </div>
      {description && (
        <div className="description py-4">{description && description}</div>
      )}

      <div className="details py-2">
        <InformationSection
          children={children}
          id={id}
          isRoot={isRoot}
          parent={parent}
        />
      </div>
      <hr className="border-1 mt-10 border-theme-blue" />
    </div>
  );
}

export default Details;
