import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searched, setMoviesLoading } from "../Store/searchBarSlice";
import { addLabel, updateLabel } from "../Api/searchapi";

const useSearchLogic = () => {
  const moviesData = useSelector((state) => state.movies.items);
  const labels = useSelector((state) => state.labels.items);
  const dispatch = useDispatch();
  const debounceTimer = useRef(null);

  const runSearchLogic = useCallback(
    (searchVal) => {
      // console.log("usersearchlogic called");

      // Clear existing debounce timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        if (!searchVal) return;
        dispatch(setMoviesLoading());
        // console.log("set listitems state");

        setTimeout(() => {
          //if label already exist
          const findlabel = labels.find((l) => l.label[1] === searchVal);

          // copy of existing  label and updating count
          let newLabel;
          if (findlabel) {
            newLabel = JSON.parse(JSON.stringify(findlabel));
            newLabel.label[0]++;
            const id = newLabel["id"];
            const item = { label: newLabel.label };
            dispatch(updateLabel({ id, item }));
          } else {
            // //add new label

            const searchedStr = { label: [1, searchVal] };
            dispatch(addLabel(searchedStr));
          }

          dispatch(
            searched({ movies: searchVal ? moviesData : [], searchVal })
          );
        }, 2000); // simulate fetch delay
      }, 500); // debounce time
    },
    [dispatch, labels, moviesData]
  );
  return runSearchLogic;
};

export default useSearchLogic;
