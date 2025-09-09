import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Headslider.css";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { moviePlayer } from "../Store/playerSlice";
import { IconButton, Box, Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { addItem, delItem } from "../Store/savedSlice";
import { Link } from "react-router-dom";
import useSwipeCarousel from "../Customhook/useSwipeCarousel";

const Headslider = () => {
  const moviesData = useSelector((state) => state.movies.items);
  const savedItems = useSelector((state) => state.saved);
  const [centerIndex, setCenterIndex] = useState(0);
  const wrapperRef = useRef(); // ✅ local ref for swipe
  console.log("headslider called");
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % moviesData.length);
    }, 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, [moviesData]);

  // ✅ Swipe support
  useSwipeCarousel(wrapperRef, {
    onSwipeLeft: () => setCenterIndex((prev) => (prev + 1) % moviesData.length),
    onSwipeRight: () =>
      setCenterIndex(
        (prev) => (prev - 1 + moviesData.length) % moviesData.length
      ),
  });

  const getVisibleMovies = () => {
    const total = moviesData.length;
    const visible = [];

    for (let offset = -2; offset <= 2; offset++) {
      let index = (centerIndex + offset + total) % total;
      visible.push({ ...moviesData[index], position: offset });
    }
    return visible;
  };

  const getClassByPosition = (position) => {
    switch (position) {
      case 0:
        return "carousel-item center";
      case -1:
        return "carousel-item left-large";
      case -2:
        return "carousel-item left-small";
      case 1:
        return "carousel-item right-large";
      case 2:
        return "carousel-item right-small";
      default:
        return "carousel-item hidden";
    }
  };

  const handlePrev = () => {
    setCenterIndex(
      (prev) => (prev - 1 + moviesData.length) % moviesData.length
    );
  };

  const handleNext = () => {
    setCenterIndex((prev) => (prev + 1) % moviesData.length);
  };

  const handleAddSavedMovies = (item) => {
    !savedItems.flag[item.id]
      ? dispatch(addItem(item))
      : dispatch(delItem(item.id));
  };

  const handleplayer = (movie) => {
    dispatch(moviePlayer(movie));
  };

  return (
    <Box
      className="carousel-container"
      sx={{
        "& svg": { color: "gray.contrastText" },
        py: 0,
      }}
    >
      <IconButton
        aria-label="navigate previous"
        edge="start"
        onClick={handlePrev}
      >
        <NavigateBeforeIcon sx={{ fontSize: "30px" }} />
      </IconButton>
      <IconButton
        aria-label="navigate previous"
        edge="end"
        onClick={handleNext}
      >
        <NavigateNextIcon sx={{ fontSize: "30px" }} />
      </IconButton>
      {/* Images */}
      <Box
        className="carousel-wrapper"
        ref={wrapperRef}
        sx={{
          mt: {
            xs: "110px",
            sm: "0px",
            lg: "70px",
          },
          left: { sm: "3%" },
        }}
      >
        {getVisibleMovies().map((movie, ind) => (
          <Box
            key={movie.id}
            className={getClassByPosition(movie.position)}
            onClick={() =>
              setCenterIndex(moviesData.findIndex((m) => m.id === movie.id))
            }
          >
            <Box
              sx={{
                overflow: "hidden",
              }}
            >
              <img src={movie.Poster} alt={movie.title} />
            </Box>

            {movie.position === 0 && (
              <>
                <Box
                  className="carousel-actions"
                  sx={{
                    "& button": {
                      color: "gray.contrastText",
                      borderColor: "gray.contrastText",
                    },
                  }}
                >
                  <Link to={`/ottapp/play/movie`} style={{ minWidth: "88%" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        "&:hover": {
                          color: "darkgray.main",
                          borderColor: "darkgray.main",
                          bgcolor: "gray.contrastText",
                        },
                        minWidth: "100%",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        zIndex: "50",
                      }}
                      onClick={() => {
                        handleplayer(movie);
                      }}
                    >
                      Watch now
                    </Button>
                  </Link>

                  <button
                    className="save-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddSavedMovies(movie);
                    }}
                  >
                    {savedItems.flag[movie.id] ? (
                      <Favorite />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </button>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>

      {/* Dots */}
      <div>
        <Box
          className="dots-wrapper"
          sx={{ "& .dot.active": { bgcolor: "gray.contrastText" } }}
        >
          {moviesData.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === centerIndex ? "active" : ""}`}
              onClick={() => setCenterIndex(i)}
            />
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default Headslider;
