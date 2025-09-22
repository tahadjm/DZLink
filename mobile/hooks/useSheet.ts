import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";

export function useSheet<T extends string>(sheetTypes: readonly T[]) {
  const [activeSheet, setActiveSheet] = useState
  <T | "none">("none");

  const refs = useRef({} as Record<T, React.RefObject<BottomSheet | null>>);

  sheetTypes.forEach((t) => {
    if (!refs.current[t]) {
      refs.current[t] = React.createRef<BottomSheet>();
    }
  });

  const open = (type: T) => {
    refs.current[type]?.current?.snapToIndex(0);
    setActiveSheet(type);
  };

  const closeAll = () => {
    Object.values(refs.current).forEach((ref: any) => ref.current?.close());
    setActiveSheet("none");
  };

  return { refs: refs.current, activeSheet, open, closeAll, setActiveSheet };
}
