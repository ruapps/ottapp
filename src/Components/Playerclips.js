import { useRef } from "react";
import { IconButton, Box, Typography, Stack } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import useCarousel from "../Customhook/useCarousel";
import useSwipeCarousel from "../Customhook/useSwipeCarousel";

const Playerclips = (props) => {
  const dispatch = useDispatch();
  const ele = useRef();

  // we get maxIndex directly from hook
  const { maxIndex, step } = useCarousel(props.carouselItemInd, ele, props.clips);

  // Handle swipe gestures
  useSwipeCarousel(ele, {
    onSwipeLeft: () => {
      if (props.carouselItemInd < maxIndex) {
        dispatch(props.slideactions.next({ maxIndex }));
      }
    },
    onSwipeRight: () => {
      if (props.carouselItemInd > 0) {
        dispatch(props.slideactions.prev({ maxIndex }));
      }
    },
  });

  return (
    <Box
      sx={{
        "& svg": { color: "gray.contrastText" },
        mt: "1rem",
      }}
    >
      <Box>
        <Typography variant="h3" color="gray.contrastText">
          {}
        </Typography>
        <IconButton
          aria-label="navigate previous"
          edge="start"
          onClick={() => dispatch(props.slideactions.prev({ maxIndex }))}
        >
          <NavigateBeforeIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton
          aria-label="navigate previous"
          edge="start"
          onClick={() => dispatch(props.slideactions.next({ maxIndex }))}
        >
          <NavigateNextIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>
      <Stack
        className="owl-carousel"
        ref={ele}
        spacing={2}
        direction="row"
        sx={{ overflow: "visible" }}
      >
        {Array.from(Array(20))?.map(
          (item, index) =>
            index < 10 && (
              <Box
                key={index}
                className={"owl-carousel-item player-carousel"}
                sx={{ flex: { xs: "1 0 80%", md: "1 0 30%" } }}
              >
                {/* <Link to={`/id=${item.id}`}> */}
                {/* <img 
                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} 
                onClick={()=>dispatch(moviePlayer(item))}
                /> */}
                <video
                  // src={`https://www.youtube.com/watch?v=${item.key}`}
                  width="100%"
                  height="240"
                  autoplay
                  muted
                  controls
                >
                  {/* <source src="" /> */}
                </video>
                {/* </Link> */}
              </Box>
            )
        )}
      </Stack>
    </Box>
  );
};

export default Playerclips;
