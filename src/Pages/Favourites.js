import { useDispatch, useSelector } from "react-redux";
import Listitems from "../Components/Listitems";
import { deleteFav } from "../Api/favouritesApi";
import { KeyboardBackspace } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useEffect } from "react";
// import { fetchFavourites } from "../Api/favouritesApi";

const Favourites = () => {
  const { status, items, error } = useSelector((state) => state.saved);
  const carouseItemInd = useSelector((state) => state.carousel);

  const dispatch = useDispatch();
  console.log("saved called");

  const handleDelete = (id) => {
    dispatch(deleteFav(id));
  };

  return (
    <Box>

      <KeyboardBackspace
        sx={{
          color: "gray.contrastText",
          fontSize: "2rem",
          mt: "-8px",
          display: { lg: "block", xs: "none" },
        }}
        onClick={() => window.history.back()}
      />
      <Listitems
        movies={items}
        status={status}
        carouseItemInd={carouseItemInd}
        compName="saved"
        onDelete={handleDelete}
        text={"No Favourites Added"}
        error={error?.message || null}
      />

    </Box>
  );
};

export default Favourites;
