import { useState } from "react";
import { questionActions } from "../../../state/Question/questionSlice";
import { useDispatch } from "react-redux";

const SearchBar = ({ label, type = "text", value, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value;
  const dispatch = useDispatch();

  const onChange = (e) => {
    const string = e.target.value;
    if (string.trim().length > 0) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
    dispatch(questionActions.setState({ key: "searchQuery", value: string }));
  };

  const onBlur = (e) => {
    const string = e.target.value;
    if (string.trim().length > 0) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative w-full py-1">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={onBlur}
        className={`w-full px-4 py-2 bg-gray-300 bg-opacity-30 shadow border-b rounded-t-md outline-none transition-all duration-300 ${
          isActive ? "pt-4" : ""
        } ${
          isFocused ? "border-indigo-500 shadow-theme-blue" : "border-gray-300"
        } `}
        {...rest}
      />
      {label && (
        <label
          className={`absolute left-3 bg-inherit transition-all duration-300 pointer-events-none  px-1 ${
            isActive
              ? "top-1 text-xs text-indigo-500"
              : "top-5 text-sm text-gray-500"
          }`}
          style={{ transformOrigin: "0 0" }}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default SearchBar;
