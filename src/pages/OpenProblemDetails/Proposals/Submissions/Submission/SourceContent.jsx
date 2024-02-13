import extractDoiSubstring from "../../../functions/extractDoiSubstring";

function SourceContent(props) {
  const { reference } = props;
  const doiFromApi = props.doi;
  const doiSubstring = extractDoiSubstring(reference);

  // If there is a doi from the api: render that first

  if (doiFromApi) {
    const doiPrefix = "https://doi.org/";
    const doiString = doiFromApi.includes("https")
      ? doiFromApi
      : doiPrefix + doiFromApi; // Create url from doi
    return (
      <>
        <p className="citation"> {doiString} </p>
        <a className=""> </a>
      </>
    );
  }
  if (!doiFromApi && doiSubstring) {
    // Remove the last word in the substring which will contain the doi;
    const splitString = reference.split(" ");
    splitString.pop(); // Remove the last substring
    const newString = splitString.join(" ");

    return (
      <>
        <p dangerouslySetInnerHTML={{ __html: newString }} />
        <a href={doiSubstring} className="text-theme-blue">
          {" "}
          {doiSubstring}{" "}
        </a>
      </>
    );
  }
  return <p dangerouslySetInnerHTML={{ __html: reference }} />;
}

export default SourceContent;
