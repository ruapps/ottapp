import { useRef } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { headnext, headprev } from "../Store/carouselSlice";
import useCarousel from "../Customhook/useCarousel";
import Overlay from "./Overlay";

const Homeheadcarousel = (props) => {
  const carouseItemInd = useSelector((state) => state.carousel);

  const dispatch = useDispatch();
  const ele = useRef();
  const OverlayRef = useRef();
  useCarousel(carouseItemInd[0], ele);

  const handlePlayerParent = (e, item) => {
    OverlayRef.current.triggerClick(e, item);
  };

  return (
    <Box
      component="header"
      sx={{
        "& svg": { color: "gray.contrastText" },
        mt: { md: "70px" },
      }}
    >
      <Box>
        <Typography variant="h3" color="gray.contrastText">
          {props.TitleText}
        </Typography>
        <IconButton
          aria-label="navigate previous"
          edge="start"
          onClick={() => dispatch(headprev())}
        >
          <NavigateBeforeIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton
          aria-label="navigate previous"
          edge="start"
          onClick={() => dispatch(headnext(props.MoviesData.length))}
        >
          <NavigateNextIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>
      <div className="owl-carousel" ref={ele}>
        {props.MoviesData?.map((item, index) =>
          index < 11 ? (
            <div key={index} className={"owl-carousel-item"}>
              <Overlay saveditem={item} ref={OverlayRef}></Overlay>

              <img
                alt={item.title}
                src={item.Poster}
                onClick={(e) => handlePlayerParent(e, item)}
              />
              {/* <img 
              src={`https://image.tmdb.org/t/p/w300/${item.poster}`} 
              onClick={(e)=> handleMoviePlayer(e, item)}
              /> */}
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </Box>
  );
};

export default Homeheadcarousel;
