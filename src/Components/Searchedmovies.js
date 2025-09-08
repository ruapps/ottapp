import { useEffect, memo } from "react";
import Preloadsearch from "./Preloadsearch";
import SearchbarItems from "./SearchbarItems";
import Labels from "./Labels";
import { Box } from "@mui/material";
import { fetchLabels } from "../Api/searchapi";
import { useSelector, useDispatch } from "react-redux";

const Searchedmovies = () => {
  const loading = useSelector((state) => state.serchedItems.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLabels());
  }, []);

  return (
    <>
      <Labels />
      <Box sx={{ height: "100vh", overflowY: "hidden" }}>
        {loading ? <Preloadsearch /> : <SearchbarItems />}
      </Box>
    </>
  );
};

export default memo(Searchedmovies);
