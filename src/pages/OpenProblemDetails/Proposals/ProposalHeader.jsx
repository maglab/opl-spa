import { useSelector } from "react-redux";
function ProposalHeader() {
  const submissionLength = useSelector(
    (state) => state.details.postSubmissions.length,
  );
  return (
    <div className="research-and-proposals-title pt-8" id="researchProposals">
      <h1 className="pb-6 text-lg md:text-2xl">{submissionLength} Solutions</h1>
      <p className="pb-2 font-semibold">
        User submitted solutions or additional literature/research to help
        answer the open problem at hand.
      </p>
    </div>
  );
}

export default ProposalHeader;
