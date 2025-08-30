import { useRef } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { topMnext, topMprev } from "../Store/carouselSlice";
import useCarousel from "../Customhook/useCarousel";
import Overlay from "./Overlay";

const Topmovies = (props) => {
  const carouseItemInd = useSelector((state) => state.carousel);
  const dispatch = useDispatch();
  const ele = useRef();
  const OverlayRef = useRef();
  const cliplen = props.MoviesData.length;
  useCarousel(carouseItemInd[1], ele);

  const handleMoviePlayer = (e, item) => {
    OverlayRef.current.triggerClick(e, item);
  };

  return (
    <Box
      component="div"
      sx={{
        "& svg": { color: "gray.contrastText" },
        mt: { xs: "15px" },
      }}
    >
      <Box>
        <Typography variant="h3" color="gray.contrastText">
          {" "}
          Top Movies
        </Typography>
        <IconButton
          aria-label="navigate previous"
          edge="start"
          onClick={() => dispatch(topMprev())}
        >
          <NavigateBeforeIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton
          aria-label="navigate previous"
          edge="start"
          onClick={() => dispatch(topMnext(cliplen))}
        >
          <NavigateNextIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>
      <div className="owl-carousel" ref={ele}>
        {props.MoviesData?.map((item, index) =>
          index < 11 ? (
            <div key={item.id} className={"owl-carousel-item tMoviesComp"}>
              <Overlay saveditem={item} ref={OverlayRef}></Overlay>
              <img
                alt={item.title}
                src={item.Poster}
                onClick={(e) => handleMoviePlayer(e, item)}
              />
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </Box>
  );
};

export default Topmovies;
