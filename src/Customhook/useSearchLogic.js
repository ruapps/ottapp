import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searched, setMoviesLoading } from "../Store/searchBarSlice";
import {  addOrUpdateLabel } from "../Api/searchapi";

const useSearchLogic = () => {
  const moviesData = useSelector((state) => state.movies.items);
  const dispatch = useDispatch();
  const debounceTimer = useRef(null);

  const runSearchLogic = useCallback(
    (searchVal) => {

      // Clear existing debounce timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        if (!searchVal) return;
        dispatch(setMoviesLoading());

        setTimeout(() => {
          // add or update label
          if (searchVal) {
              dispatch(addOrUpdateLabel(searchVal.toLowerCase()));
            }

          dispatch(
            searched({ movies: searchVal ? moviesData : [], searchVal })
          );
        }, 5000); // simulate fetch delay
      }, 500); // debounce time
    },
    [dispatch, moviesData]
  );
  return runSearchLogic;
};

export default useSearchLogic;
