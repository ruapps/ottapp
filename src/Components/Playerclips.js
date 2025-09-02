import React, { useEffect, useRef } from "react";
import { IconButton, Box, Typography, Stack } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clipsNext, clipsPrev } from "../Store/carouselSlice";

const Playerclips = (props) => {
  const carouseItemInd = useSelector((state) => state.carousel);
  const dispatch = useDispatch();
  const ele = useRef();
  const eleChild = ele.current;
  const cliplen = props.Clips.length;

  useEffect(() => {
    if (eleChild !== undefined) {
      eleChild.childNodes.forEach((ele) => {
        ele.style.transform = "translateX(" + -100 * carouseItemInd[2] + "%)";
      });
    }
  }, [carouseItemInd]);

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
          onClick={() => dispatch(clipsPrev())}
        >
          <NavigateBeforeIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton
          aria-label="navigate previous"
          edge="start"
          onClick={() =>
            dispatch(
              clipsNext(cliplen > 10 ? cliplen - (cliplen - 10) : cliplen)
            )
          }
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
