import { useEffect, useState } from "react";

const useLocalstorage = (key: string, initvalue: any) => {
  const [value, setValue] = useState<any>(
    () => JSON.parse(localStorage.getItem(key) as string) || initvalue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalstorage;
