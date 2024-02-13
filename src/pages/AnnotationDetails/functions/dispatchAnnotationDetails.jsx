import { annotationActions } from "../../../state/Annotation/annotationSlice";
function dispatchAnnotationDetails(dispatch, category, data) {
  dispatch(annotationActions.setState({ key: "annotation", value: category }));
  switch (category) {
    case "subjects":
      dispatch(
        annotationActions.setState({
          key: "details",
          value: {
            id: data.id,
            title: data.title,
            description: data.description,
            parent: data.parent,
          },
        }),
      );
      break;

    case "genes":
      dispatch(
        annotationActions.setState({
          key: "details",
          value: {
            id: data.gene_id,
            title: data.gene_name,
            geneSymbol: data.gene_symbol,
            species: data.gene_species,
          },
        }),
      );
      break;
    case "protein":
      dispatch(
        annotationActions.setState({
          key: "details",
          value: {
            id: data.protein_id,
            title: data.protein_name,
            species: data.species,
          },
        }),
      );
  }
  dispatch(annotationActions.setState({ key: "annotation", value: category }));
}

export default dispatchAnnotationDetails;
