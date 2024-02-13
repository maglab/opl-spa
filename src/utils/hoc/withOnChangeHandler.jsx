import React from "react";

const withOnChangeHandler = (WrappedComponent) => {
  return function WithOnChangeHandler(props) {
    const setState = props.setState;
    const onChangeHandler = (e) => {
      const value = e.target.value;
      setState(value);
    };
    return <WrappedComponent {...props} onChange={onChangeHandler} />;
  };
};

export default withOnChangeHandler;
