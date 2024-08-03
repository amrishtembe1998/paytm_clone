import { useState, useEffect } from "react";

const useDebouncedValue = (value, delayInSeconds) => {
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    const id = setTimeout(() => {
      setFilterValue(value);
    }, delayInSeconds * 1000);
    return () => {
      clearTimeout(id);
    };
  }, [value]);
  return filterValue;
};

export default useDebouncedValue;
