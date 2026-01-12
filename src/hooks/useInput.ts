import { useState, useCallback } from "react";

export function useInput(initialValue: string = "") {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((text: string) => {
    setValue(text);
  }, []);

  return { value, onChange };
}
