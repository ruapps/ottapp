import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Listitems from "../Components/Listitems";
import { deleteMovie } from "../Api/favouritesApi";

const Trailerwatched = () => {
  const savedItems = useSelector((state) => state.saved.items);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  return (
    <Box>
      <Listitems
        movies={savedItems}
        compName="trailer watched"
        Mr="20px"
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Trailerwatched;
