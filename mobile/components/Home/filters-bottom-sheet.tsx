import type { City, FiltersState, Tag } from "@/types/filters";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

import { FiltersSection } from "./filters/filters-section";

type Props = {
  selected: FiltersState;
  setSelected: React.Dispatch<React.SetStateAction<FiltersState>>;
  onApply?: (selected: FiltersState) => void;
  onClose?: () => void;
  resultCount: number;
  cities: City[];
  tags: Tag[];
};

export const FiltersBottomSheet = forwardRef<BottomSheet, Props>(
  ({ onClose, resultCount, selected, setSelected, onApply, cities, tags }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["100%"]}
        enablePanDownToClose
        onClose={onClose}
        backgroundStyle={{ backgroundColor: "white" }}
        handleIndicatorStyle={{ backgroundColor: "#666" }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <FiltersSection
            onClose={onClose}
            resultCount={resultCount}
            selected={selected}
            setSelected={setSelected}
            onApply={onApply}
            cities={cities}
            tags={tags}
          />
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

FiltersBottomSheet.displayName = "FiltersBottomSheet";
