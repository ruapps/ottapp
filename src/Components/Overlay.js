import { forwardRef, useImperativeHandle } from "react";
import { Button, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { Link } from "react-router-dom";
import { moviePlayer } from "../Store/playerSlice";
import { addItem, delItem } from "../Store/savedSlice";
import { DeleteOutlineSharp } from "@mui/icons-material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

const Overlay = forwardRef((props, ref) => {
  const savedItems = useSelector((state) => state.saved);
  const dispatch = useDispatch();
  const id = props.saveditem[0]?.id || props.saveditem?.id;
  const handleOverlay = (e, item) => {
    let overlayDiv = e.target.previousElementSibling;
    let overlayDivArr = overlayDiv.parentElement.parentElement.childNodes;
    overlayDivArr.forEach((ele) => {
      ele.children[0].classList.remove("opacity_visible");
    });
    overlayDiv.classList.add("opacity_visible");
    dispatch(moviePlayer(item));
  };

  useImperativeHandle(ref, () => ({
    triggerClick: handleOverlay,
  }));

  const handleAddSavedMovies = (item) => {
    !savedItems.flag[item.id]
      ? dispatch(addItem(item))
      : dispatch(delItem(item.id));
  };

  const handleDelete = (id) => {
    dispatch(delItem(id));
  };

  return (
    <div className="overlay_div">
      {props.saveditem[1] && (
        <DeleteOutlineSharp
          sx={{
            ml: "auto",
            display: "block",
            p: "2px 2px 0 0",
            color: "#fff !important",
          }}
          onClick={() => handleDelete(props.saveditem[0].id)}
        />
      )}
      {/* 
      <Link
        to={`/ottapp/play/id=${
          props.saveditem[1] === "saved"
            ? props.saveditem[0].id
            : props.saveditem.id
        }`}
      >
        <PlayArrowIcon sx={{ color: "#fff !important" }} />
      </Link> */}
      <Link to={`/ottapp/play/movie`}>
        <PlayArrowIcon sx={{ color: "#fff !important" }} />
      </Link>

      <Box
        className="overlay_div_bottom"
        sx={{
          "& button": {
            width: "calc(100% - 82.03%)",
          },
        }}
      >
        {!props.saveditem[1] && (
          <>
            <Button
              startIcon={
                savedItems.flag[id] ? <Favorite /> : <FavoriteBorder />
              }
              sx={{
                color: "#fff",
                fontSize: "0.65rem",
                "& > span:first-child": { mr: "40px !important" },
              }}
              onClick={() =>
                handleAddSavedMovies(props.saveditem[0] || props.saveditem)
              }
            />
            <Button
              sx={{ color: "#fff", fontSize: "0.65rem" }}
              startIcon={<SlideshowIcon />}
            />
          </>
        )}
      </Box>
    </div>
  );
});

export default Overlay;
