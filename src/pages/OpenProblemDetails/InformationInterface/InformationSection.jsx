import Classification from "./Sections/Classification";
import References from "./Sections/References";
import ConnectedProblems from "./Sections/ConnectedProblems";
import Proposals from "../Proposals/Proposals";
import ProposalHeader from "../Proposals/ProposalHeader";
import Submissions from "../Proposals/Submissions/Submissions";
import ProposalForm from "../Proposals/ProposalForm/ProposalForm";

function InformationSection(props) {
  const { children } = props;
  const { id } = props;
  const { isRoot } = props;
  const { parent } = props;

  return (
    <>
      <ConnectedProblems children={children} parent={{ isRoot, parent }} />
      {!isRoot && (
        <>
          <ProposalHeader />
          <div className="proposals">
            <Proposals>
              <Submissions id={id} />
              <ProposalForm />
            </Proposals>
          </div>
        </>
      )}

      {!isRoot && <Classification />}
      <References id={id} />
    </>
  );
}

export default InformationSection;
