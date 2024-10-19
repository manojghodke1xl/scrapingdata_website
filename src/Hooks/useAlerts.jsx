import { useCallback, useState } from "react";

export function useAlert() {
  const [list, setList] = useState([]);

  const addAlert = useCallback(
    (alert) => {
      const id = setTimeout(() => delAlert(), 6e3);
      const delAlert = () => clearTimeout(id) ?? setList((l) => l.filter((a) => a.id !== id));
      setList((l) => l.concat({ id, delAlert, ...alert }));
    },
    [setList]
  );

  return [list, addAlert];
}


