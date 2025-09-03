import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Listitems from "../Components/Listitems";
import { deleteMovie } from "../Api/savedApi";

const Saved = () => {
  const savedItems = useSelector((state) => state.saved.items);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  return (
    <Listitems
      movies={savedItems}
      compName="saved"
      onDelete={handleDelete}
      text={"No items saved yet"}
    />
  );
};

export default Saved;
