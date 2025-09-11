import React from "react";
import { IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { useDispatch } from "react-redux";

const CarouselBtn = ({ action }) => {
  const dispatch = useDispatch();
  return (
    <>
      <IconButton
        aria-label="navigate previous"
        edge="start"
        onClick={() => dispatch(action.prev)}
      >
        <NavigateBefore sx={{ fontSize: "30px" }} />
      </IconButton>
      <IconButton
        aria-label="navigate previous"
        edge="end"
        onClick={() => dispatch(action.next)}
      >
        <NavigateNext sx={{ fontSize: "30px" }} />
      </IconButton>
    </>
  );
};

export default CarouselBtn;
