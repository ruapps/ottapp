import { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setMoviesLoading } from "../Store/searchBarSlice";
import { semanticSearch, addOrUpdateLabel } from "../Api/searchapi";

const useSearchLogic = () => {
  const dispatch = useDispatch();
  const debounceTimer = useRef(null);

  const runSearchLogic = useCallback(
    (searchVal) => {
      // Clear existing debounce timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      if (searchVal) {
        dispatch(setMoviesLoading(true));
      }

      debounceTimer.current = setTimeout(() => {
        if (!searchVal) {
          dispatch(setMoviesLoading(false));
          return;
        }

        // add or update label
        if (searchVal) {
          dispatch(addOrUpdateLabel(searchVal.toLowerCase()));
        }

        dispatch(semanticSearch(searchVal));
      }, 2000); // debounce time
    },
    [dispatch],
  );
  return runSearchLogic;
};

export default useSearchLogic;
