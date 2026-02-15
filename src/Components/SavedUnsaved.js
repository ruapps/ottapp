import React from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveMovie, deleteMovie } from "../Api/savedApi";
import {
  FavoriteBorder,
  Favorite,
  DeleteOutlineSharp,
} from "@mui/icons-material";

const SavedUnsaved = (props) => {
  const [login, savedItems] = useSelector((state) => [state.login, state.saved]);
  const navigate = useNavigate();
  const {isLoggedIn} = login;
  const id = props.saveditem[0]?._id || props.saveditem?._id;
  const dispatch = useDispatch();

  const handleAddSavedMovies = (item) => {
    if (!isLoggedIn) {
      navigate("/ottapp/login");
      return;
    }

    !savedItems.flag[item._id]
      ? dispatch(saveMovie(item))
      : dispatch(deleteMovie(item._id));
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
