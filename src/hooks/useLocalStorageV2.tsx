import { useState } from "react";

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  //
  const storedValue = localStorage.getItem(key);

  const initialStoredValue = storedValue
    ? JSON.parse(storedValue)
    : initialValue;
  //
  const [value, setValue] = useState<T>(initialStoredValue);
  //
  const updateValue: SetValue<T> = (newValue) => {
    const updatedValue =
      newValue instanceof Function ? newValue(value) : newValue;

    localStorage.setItem(key, JSON.stringify(updatedValue));
    setValue(newValue);
  };

  return [value, updateValue];
}

export default useLocalStorage;
