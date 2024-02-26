import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@mui/material";

import { questionActions } from "../../state/Question/questionSlice";
import SubmissionModalContent from "../../components/UI/Modal/SubmissionModalContent";
import Statbar from "./Statbar/Statbar";
import SearchBar from "./SearchBar/SearchBar";
import ProblemsInterface from "./ProblemsInterface/ProblemsInterface";
import ModalT from "../../components/UI/Modal/Modal";
import apiProblems from "../../api/apiProblems";

function OpenProblems() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalState = useSelector((state) => state.question.modalOpen);
  const questionDetails = useSelector((state) => state.question.modalDetails);
  const sorting = useSelector((state) => state.question.filters.sorting);
  const dispatch = useDispatch();
  const modalCloseHandler = () => {
    dispatch(questionActions.toggleModalClose());
  };

  useEffect(() => {
    setLoading(true);
    const SORTING_OBJ = {
      latest: apiProblems.getAllProblems,
      top: apiProblems.sortedDescendantsDescending,
      answered: apiProblems.sortedSubmissionAnswered,
      root: apiProblems.getRootProblems,
    };
    async function getOpenProblems() {
      try {
        const apiCall = SORTING_OBJ[sorting];
        const { data } = await apiCall();
        dispatch(questionActions.setState({ key: "allProblems", value: data }));
      } catch (error) {
        setError(error);
      }
      setError(false);
      setLoading(false);
    }
    getOpenProblems();
  }, [sorting, dispatch]);

  return (
    <>
      <Grid container direction="column" spacing={2} width="100%">
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Our initial list of open problems in ageing and longevity science
            and their interconnected aspects organised in a hierarchical manner.
            Each problem of interest can represent a broader topic where you can
            find other connected problems that can offer insights into specific
            areas of the topic. We encourage you to contribute your open
            problems to aid in refining our database and effectively
            categorizing these scientific challenges.
          </Typography>
        </Grid>
        <Grid item xs={12} pt={2}>
          <Typography className="pb-2 text-sm md:text-base">
            If you want to add an open problem that falls under the problems
            provided, select the open problem and click the "add" button.
            Otherwise use the submit open problem button in the bar below.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SearchBar />
          <Statbar className="statbar" />
        </Grid>
        <Grid item xs={12}>
          <ProblemsInterface error={error} loading={loading} />
        </Grid>
      </Grid>
      <ModalT open={modalState} close={modalCloseHandler}>
        <SubmissionModalContent
          questionDetails={questionDetails}
          close={modalCloseHandler}
        />
      </ModalT>
    </>
  );
}
export default OpenProblems;
