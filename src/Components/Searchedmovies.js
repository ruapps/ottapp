import React from "react";
import Preloadsearch from "./Preloadsearch";
import SearchbarItems from "./SearchbarItems";
import { Labels } from "./Labels";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const Searchedmovies = () => {
  const { loading } = useSelector((state) => state.serchedItems);
  return (
    <>
      <Labels />
      <Box sx={{ height: "100vh", overflowY: "hidden" }}>
        {loading ? <Preloadsearch /> : <SearchbarItems />}
      </Box>
    </>
  );
};

export default Searchedmovies;
