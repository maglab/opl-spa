import React,{ useRef,useEffect  } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import InformationSection from "./InformationInterface/InformationSection";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { detailsActions } from "../../state/Details/detailsSlice";
function Details() {
  const { data } = useLoaderData();
  const openProblemDetails = data.open_problem;
  const description = data.open_problem.description;
  const id = openProblemDetails.problem_id;
  const title = openProblemDetails.title;
  const children = openProblemDetails.children;
  const parent = data.parent_data;
  const isRoot = parent ? false : true;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dispatch loader data into redux store to be used by other components
  useEffect(() => {
    dispatch(detailsActions.resetState());
    dispatch(detailsActions.setOpenProblem({ id: id }));
  }, [id]);
  // Select the title of the open problem to use as the anchor for the scrollToView function
  const ref = useRef(null);

  return (
    <div>
      <hr className="border-1 border-theme-blue" />
      <Button variant="outlined" onClick={()=> navigate(-1)}>
        Return
      </Button>

      <div ref={ref} className="title flex flex-row pt-8 ">
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
