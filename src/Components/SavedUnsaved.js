import React from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addItem, delItem } from "../Store/savedSlice";
import {
  FavoriteBorder,
  Favorite,
  DeleteOutlineSharp,
} from "@mui/icons-material";

const SavedUnsaved = (props) => {
  const savedItems = useSelector((state) => state.saved);
  const id = props.saveditem[0]?.id || props.saveditem?.id;
  const dispatch = useDispatch();

  const handleAddSavedMovies = (item) => {
    !savedItems.flag[item.id]
      ? dispatch(addItem(item))
      : dispatch(delItem(item.id));
  };

  return (
    <Button
      startIcon={
        props.compName ? (
          <DeleteOutlineSharp />
        ) : savedItems.flag[id] ? (
          <Favorite />
        ) : (
          <FavoriteBorder />
        )
      }
      sx={{
        color: "#fff",
        fontSize: "0.65rem",
        "& > span:first-child": { mr: "40px !important" },
      }}
      onClick={() =>
        props.compName
          ? props.onDelete(id)
          : handleAddSavedMovies(props.saveditem)
      }
    />
  );
};

export default SavedUnsaved;
