import { merge } from "lodash";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const toCamelCase = (str) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );

const toKebabCase = (str) =>
  str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

const useQueryParams = (schema = null, defaultValue = {}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    const paramsObject = {};

    // Convert and accumulate all query params into an object
    params.forEach((value, key) => {
      const camelCaseKey = toCamelCase(key);
      paramsObject[camelCaseKey] = value;
    });

    if (schema) {
      // Pre-process for array fields if schema is provided
      Object.entries(schema.describe().fields).forEach(([fieldName, field]) => {
        if (field.type === "array" && paramsObject[fieldName]) {
          paramsObject[fieldName] = paramsObject[fieldName].split(",");
        }
      });

      try {
        // Validate and convert according to the schema
        const converted = schema.validateSync(paramsObject, {
          abortEarly: false,
          stripUnknown: true,
          context: paramsObject,
        });
        return merge(defaultValue, converted);
      } catch (error) {
        return defaultValue;
      }
    } else {
      return defaultValue;
    }
  }, [location, schema, defaultValue]);

  const updateQueryParams = (updates) => {
    const searchParams = new URLSearchParams(location.search);

    Object.entries(updates).forEach(([key, value]) => {
      const kebabKey = toKebabCase(key);
      searchParams.set(kebabKey, value);
    });

    const updatedSearch = searchParams.toString();

    navigate(`${location.pathname}?${updatedSearch}`, { replace: true });
  };

  const replaceQueryParams = (updates) => {
    const searchParams = new URLSearchParams();

    Object.entries(updates).forEach(([key, value]) => {
      const kebabKey = toKebabCase(key);
      searchParams.set(kebabKey, value);
    });

    const updatedSearch = searchParams.toString();

    navigate(`${location.pathname}?${updatedSearch}`, { replace: true });
  };

  return { queryParams, updateQueryParams, replaceQueryParams };
};

export default useQueryParams;
