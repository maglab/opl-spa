import { produce } from "immer";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const toCamelCase = (str) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );

const toKebabCase = (str) =>
  str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

const queryStringToObject = (query) => {
  const params = new URLSearchParams(query);
  const obj = {};

  Array.from(params).forEach(([key, value]) => {
    // Check if key matches the pattern "name[index]"
    const match = key.match(/^(.+)\[(\d+)\]$/);
    if (match) {
      const [, arrayName, arrayIndex] = match;
      if (!obj[arrayName]) obj[arrayName] = [];
      // Ensure the correct index is used, parsing arrayIndex to integer
      obj[toCamelCase(arrayName)][parseInt(arrayIndex, 10)] = value;
    } else {
      obj[toCamelCase(key)] = value;
    }
  });

  return obj;
};

const objectToQueryString = (obj) => {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        params.append(`${toKebabCase(key)}[${index}]`, item);
      });
    } else {
      params.append(toKebabCase(key), value);
    }
  });

  return params.toString();
};

const useQueryParams = (schema = null) => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = React.useMemo(() => {
    const obj = queryStringToObject(location.search);

    if (schema) {
      try {
        const converted = schema.validateSync(obj, {
          abortEarly: false,
          stripUnknown: true,
          context: obj,
        });
        return converted;
      } catch (error) {
        return {};
      }
    } else {
      return {};
    }
  }, [location, schema]);

  const editQueryParams = (action) => {
    const obj = produce(queryParams, action);
    Object.entries(obj).forEach(([key, value]) => {
      if (
        schema.describe().fields[key]?.type === "array" &&
        !Array.isArray(value)
      ) {
        obj[key] = [value];
      }
    });
    const queryString = objectToQueryString(obj);

    navigate(`${location.pathname}?${queryString}`, { replace: true });
  };

  return {
    queryParams,
    editQueryParams,
  };
};

export default useQueryParams;
