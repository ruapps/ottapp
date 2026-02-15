import { useRef, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { animeNext, animePrev } from "../Store/carouselSlice";
import useCarousel from "../Customhook/useCarousel";
import useSwipeCarousel from "../Customhook/useSwipeCarousel";
import Overlay from "./Overlay";
import CarouselBtn from "./CarouselBtn";

const AnimeMovies = (props) => {
  const carouseItemInd = useSelector((state) => state.carousel);
  const dispatch = useDispatch();
  const ele = useRef();
  const OverlayRef = useRef();

  const Animated = useMemo(() => {
    return props.MoviesData.filter((item) => item.genre.includes("animated"));
  }, [props.MoviesData]);

  // ✅ Now we get maxIndex directly from hook
  const { maxIndex, step } = useCarousel(carouseItemInd[5], ele, Animated);

  // Handle swipe gestures
  useSwipeCarousel(ele, {
    onSwipeLeft: () => {
      if (carouseItemInd[5] < maxIndex) {
        dispatch(animeNext({ maxIndex }));
      }
    },
    onSwipeRight: () => {
      if (carouseItemInd[5] > 0) {
        dispatch(animePrev({ maxIndex }));
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
          Popular in Animation
        </Typography>
        <CarouselBtn
          action={{
            prev: animePrev({ maxIndex }),
            next: animeNext({ maxIndex }),
          }}
        />
      </Box>

      <Box sx={{ overflow: "hidden" }}>
        <Box
          className="owl-carousel"
          ref={ele}
          sx={{
            touchAction: "pan-y",
          }}
        >
          {Animated?.map((item, index) =>
            index < 11 ? (
              <div key={item._id} className="owl-carousel-item tMoviesComp">
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

export default AnimeMovies;
