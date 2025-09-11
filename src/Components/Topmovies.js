import { useRef } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { topMnext, topMprev } from "../Store/carouselSlice";
import useCarousel from "../Customhook/useCarousel";
import useSwipeCarousel from "../Customhook/useSwipeCarousel";
import Overlay from "./Overlay";
import CarouselBtn from "./CarouselBtn";

const Topmovies = (props) => {
  const carouseItemInd = useSelector((state) => state.carousel);
  const dispatch = useDispatch();
  const ele = useRef();
  const OverlayRef = useRef();

  // ✅ Now we get maxIndex directly from hook
  const { maxIndex, step } = useCarousel(
    carouseItemInd[1],
    ele,
    props.MoviesData
  );

  // Handle swipe gestures
  useSwipeCarousel(ele, {
    onSwipeLeft: () => {
      if (carouseItemInd[1] < maxIndex) {
        dispatch(topMnext({ maxIndex }));
      }
    },
    onSwipeRight: () => {
      if (carouseItemInd[1] > 0) {
        dispatch(topMprev({ maxIndex }));
      }
    },
  });

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
          Top Movies
        </Typography>
        <CarouselBtn
          action={{
            prev: topMprev({ maxIndex }),
            next: topMnext({ maxIndex }),
          }}
        />
        {/* <IconButton
          aria-label="navigate previous"
          edge="start"
          disabled={carouseItemInd[1] === 0}
          onClick={() => dispatch(topMprev({ maxIndex }))}
          sx={{ mr: 2 }}
        >
          <NavigateBeforeIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton
          aria-label="navigate next"
          edge="start"
          onClick={() => dispatch(topMnext({ maxIndex }))}
        >
          <NavigateNextIcon sx={{ fontSize: "30px" }} />
        </IconButton> */}
      </Box>

      <Box sx={{ overflow: "hidden" }}>
        <Box
          className="owl-carousel"
          ref={ele}
          sx={{
            touchAction: "pan-y",
          }}
        >
          {props.MoviesData?.map((item, index) =>
            index < 11 ? (
              <div key={item.id} className="owl-carousel-item tMoviesComp">
                <Overlay saveditem={item} ref={OverlayRef}></Overlay>
                <img
                  alt={item.title}
                  src={item.Poster}
                  onClick={(e) => handleMoviePlayer(e, item)}
                />
              </div>
            ) : null
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Topmovies;
