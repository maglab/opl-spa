import { useDispatch, useSelector } from "react-redux";
import { useField } from "formik";

import { formActions } from "../../../../state/Question/questionFormSlice";
import { formValidationActions } from "../../../../state/Question/formValidationSlice";
import useViewWidth from "../../../../utils/hooks/useViewWidth";
function TextArea(props) {
  const formDetailsState = useSelector((state) => state.form.formDetails);
  const isMobileState = useSelector((state) => state.question.isMobile);
  const dispatch = useDispatch();
  const onChangeHandler = (e, key) => {
    dispatch(formActions.inputChange({ id: key, value: e.target.value }));
    if (key === "description") {
      dispatch(
        formValidationActions.checkDescription({ description: e.target.value })
      );
    }
  };

  return (
    <div
      className={`${props.id} flex w-full ${
        isMobileState ? "flex-col" : "flex-row"
      } items-center py-[1.5rem] text-center`}
    >
      <label
        className={`inline-block text-center ${
          isMobileState ? "w-full" : "w-1/6"
        }`}
        htmlFor={props.id}
      >
        <p className="font-bold text-sm md:text-base">{props.labelText}</p>
      </label>
      <textarea
        onChange={(e) => onChangeHandler(e, props.id)}
        type="text"
        className={`h-fit-content h-auto ${
          isMobileState ? "w-full" : "w-4/5"
        } rounded border border-slate-500 bg-bg-grey p-2`}
        required={props.required}
        value={formDetailsState[props.id]}
        placeholder={props.label}
        rows={props.rows}
        name={props.id}
      />
    </div>
  );
}

export function TextArea2({ id, name, type, label, placeHolder }) {
  const [field, meta] = useField(name, type);
  const { isMobile } = useViewWidth();
  return (
    <div
      className={`grid ${
        isMobile ? "grid-cols-1" : "grid-cols-2"
      } font-general`}
    >
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <textarea {...field} name={name} type={type} placeholder={placeHolder} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  );
}

export default TextArea;
