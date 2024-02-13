import { generalActions } from "../../state/generalStateSlice";

const showModal = (dispatch, title, message, status) => {
  const modalValue = {
    title,
    message,
    status,
  };
  dispatch(generalActions.toggleModal());
  dispatch(generalActions.setModalContent({ content: modalValue }));
};

export default showModal;
