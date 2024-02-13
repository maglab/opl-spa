import { useDispatch, useSelector } from "react-redux";
import { detailsActions } from "../../../../state/Details/detailsSlice";

function ContactInformation() {
  const dispatch = useDispatch();
  const { firstName, lastName, affiliation } = useSelector(
    (state) => state.details.submission,
  );
  const onChangeHandler = (e, id) => {
    const { value } = e.target;
    dispatch(detailsActions.setFormValue({ id, value }));
  };
  return (
    <div className="contacts w-8/12 pt-2 ">
      <h1 className="py-2 text-lg text-theme-blue font-semibold">
        User Information (optional):
      </h1>
      <p className="py-1 px-6 text-sm"> This will be visible on your post.</p>
      <div className="fname-lname flex flex-row justify-between px-6 py-2">
        <input
          className="border border-theme-blue p-1 w-6/12 text-sm mr-2"
          type="text"
          placeholder="First name"
          id="firstName"
          onChange={(e) => onChangeHandler(e, "firstName")}
          value={firstName}
        />
        <input
          className="border border-theme-blue  p-1 w-6/12 text-sm ml-2"
          type="text"
          placeholder="Last name"
          id="lastName"
          onChange={(e) => onChangeHandler(e, "lastName")}
          value={lastName}
        />
      </div>
      <div className="affiliation px-6 py-2">
        <input
          className="mr-4 w-full border border-theme-blue p-1 text-sm"
          type="text"
          placeholder="Please provide your email if you would like to recieve notifications"
          id="email"
          onChange={(e) => onChangeHandler(e, "affiliation")}
          value={affiliation}
        />
      </div>
    </div>
  );
}

export default ContactInformation;
