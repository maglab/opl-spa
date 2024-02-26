import { TextField } from "@mui/material";
import { Form } from "react-router-dom";
import { questionActions } from "../../../state/Question/questionSlice";
import { formActions } from "../../../state/Question/questionFormSlice";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";
function SearchBar() {
  const openProblems = useSelector((state) => state.question.allProblems);
  const queryState = useSelector((state) => state.question.searchQuery);

  const dispatch = useDispatch();
  //   Fuse for finding problems based on title for now
  const fuseOptions = {
    keys: ["title"],
    threshold: 0.3,
  };

  //Search bar - dealing with submitted query - basic functionality.
  const searchFunction = () => {
    dispatch(questionActions.toggleListState());
    if (queryState.trim().length === 0) {
      dispatch(formActions.toggleFormClose());
      dispatch(questionActions.setSearchResults({ results: null }));
    } else {
      const fuse = new Fuse(openProblems, fuseOptions);
      const searchResults = fuse.search(queryState);
      dispatch(questionActions.setSearchResults({ results: searchResults }));
    }
  };
  const searchOnChange = (e) => {
    const query = e.target.value;
    dispatch(questionActions.setQuery({ query: query }));

    if (query.trim().length === 0) {
      dispatch(questionActions.setSearchResults({ results: null }));
      dispatch(formActions.toggleFormClose());
    } else {
      searchFunction();
    }
  };

  return (
    <Form onSubmit={searchFunction}>
      <TextField
        className="z-0"
        name="search-query"
        label="Search for an open problem"
        onChange={searchOnChange}
        fullWidth={true}
        size="small"
        variant="filled"
        margin="normal"
      />
    </Form>
  );
}

export default SearchBar;
