import React from "react";

const withOnChangeHandler = (WrappedComponent) =>
  function WithOnChangeHandler(props) {
    const { setState } = props;
    const onChangeHandler = (e) => {
      const { value } = e.target;
      setState(value);
    };
    return <WrappedComponent {...props} onChange={onChangeHandler} />;
  };

export default withOnChangeHandler;
