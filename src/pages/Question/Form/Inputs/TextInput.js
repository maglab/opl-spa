import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../../../state/Question/questionFormSlice";
import { formValidationActions } from "../../../../state/Question/formValidationSlice";
function TextInput(props) {
  const formDetailsState = useSelector((state) => state.form.formDetails);
  const isMobileState = useSelector(state => state.question.isMobile);
  const dispatch = useDispatch();
  const onChangeHandler = (e, key) => {
    dispatch(formActions.inputChange({ id: key, value: e.target.value }));
    switch (key){
      case 'title': 
        dispatch(formValidationActions.checkTitle({title:e.target.value}))
      case 'email':
        dispatch(formValidationActions.checkEmail({email:e.target.value}))
    } 
  };

  return (
    <div
      className={
        
        `${props.id} flex w-full ${isMobileState ? 'flex-col' : 'flex-row'} items-center py-[1.5rem] text-center`
      }
    >
      <label className={`inline-block ${isMobileState ? 'w-full' : 'w-1/5'}`} htmlFor={props.id}>
        <p className="font-bold text-sm md:text-base">{props.labelText}</p>
      </label>
      <input onChange={(e) => onChangeHandler(e, props.id)}
        type="text"
        className={`h-fit-content h-auto ${isMobileState ? 'w-full' : 'w-4/5'} rounded border border-slate-500 bg-bg-grey p-2`} required={props.required}
       value={formDetailsState[props.id]} placeholder={props.label} name={props.id}/>
    </div>
  );
}

export default TextInput;
