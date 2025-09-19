import { useDispatch, useSelector } from "react-redux";
import Listitems from "../Components/Listitems";
import { delItem } from "../Store/savedSlice";
import { KeyboardBackspace } from "@mui/icons-material";
import { Box } from "@mui/material";

const Saved = () => {
  const { status, items } = useSelector((state) => state.saved);
  const carouseItemInd = useSelector((state) => state.carousel);

  const dispatch = useDispatch();
  console.log("saved called");

  const handleDelete = (id) => {
    dispatch(delItem(id));
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
        text={"No items saved yet"}
      />
    </Box>
  );
};

export default Saved;
