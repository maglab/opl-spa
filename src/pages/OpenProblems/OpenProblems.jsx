import { useSelector, useDispatch } from "react-redux";
import { generalActions } from "../../state/generalStateSlice";
import Statbar from "./Statbar/Statbar";
import SearchBar from "./SearchBar/SearchBar";
import ProblemsInterface from "./ProblemsInterface/ProblemsInterface";
import Modal from "../../components/UI/Modal/Modal";
import Filter from "./Filter/Filter";
import config from "../../utils/configs/SideNavConfig";

function OpenProblems() {
  const modalState = useSelector((state) => state.question.modalOpen);
  const questionDetails = useSelector((state) => state.question.modalDetails);
  const dispatch = useDispatch();
  const modalCloseHandler = () => {
    dispatch(generalActions.toggleModal({ bool: false }));
  };

  return (
    <div className="w-full flex flex-row pt-6">
      {/* Filter Side Navigation */}
      <div className={`side-nav w-1/5 sticky`}>
        <Filter config={config} />
      </div>
      {/* Main Content */}
      <div className="main w-full h-max overflow-auto">
        <SearchBar label={"Search for an open problem"} />
        <Statbar className="statbar" />
        <ProblemsInterface />
      </div>
    </div>
  );
}

export default OpenProblems;
