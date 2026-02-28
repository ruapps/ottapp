import { useDispatch, useSelector } from "react-redux";
import Listitems from "../Components/Listitems";
import { deleteFavourites } from "../Api/favouritesApi";
import { KeyboardBackspace } from "@mui/icons-material";
import { Box } from "@mui/material";
import { DeletingFavloader } from "../Components/DeletingFavloader";

const Favourites = () => {
  const { status, items } = useSelector((state) => state.saved);
  const carouseItemInd = useSelector((state) => state.carousel);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteFavourites(id));
    
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
      />
    <DeletingFavloader/>
    </Box>
  );
};

export default Favourites;
