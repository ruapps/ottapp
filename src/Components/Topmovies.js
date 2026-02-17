import { useRef, useEffect, useState } from "react";
import { IconButton, Box, Typography, Button } from "@mui/material";
import { Download, ThumbUp, MoreVert } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "./Tooltip";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { topMnext, topMprev } from "../Store/carouselSlice";
import useCarousel from "../Customhook/useCarousel";
import useSwipeCarousel from "../Customhook/useSwipeCarousel";
import Overlay from "./Overlay";
import CarouselBtn from "./CarouselBtn";
import SavedUnsaved from "./SavedUnsaved";
import { moviePlayer } from "../Store/playerSlice";

const tooltip = [
  ["Download", <Download />],
  ["Like Me", <ThumbUp />],
];

const Topmovies = (props) => {
  const carouseItemInd = useSelector((state) => state.carousel);
  const [activeId, setActiveId] = useState(null);
  const [portalPosition, setPortalPosition] = useState(null);
  const dispatch = useDispatch();
  const ele = useRef();
  const iconRefs = useRef({});
  const portalRefs = useRef();
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
    // OverlayRef.current.triggerClick(e, item);
    dispatch(moviePlayer(item));
  };

  const handleIconClick = (id) => {
    const icon = iconRefs.current[id];
    if (icon) {
      const rect = icon.getBoundingClientRect();
      setPortalPosition({
        top: rect.top + window.scrollY + 30, // adjust for spacing
        left: rect.left + window.scrollX - 70,
      });
      setActiveId(id);
    }
  };

  const closePortal = () => {
    setActiveId(null);
    setPortalPosition(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (portalRefs.current && !portalRefs.current?.contains(e.target)) {
        closePortal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      </Box>

      <Box sx={{ overflow: "hidden" }}>
        <Box
          className="owl-carousel"
          ref={ele}
          sx={{
            touchAction: "pan-y",
            "& img": {height: "fit-content !important" },
          }}
        >
          {props.MoviesData?.map((item, index) =>
            index < 11 ? (
              <Box key={item._id} className="owl-carousel-item tMoviesComp" sx={{borderRadius: "5px",
                boxShadow: "0px 0px 2px #090808, -0px -0px 2px #090808",}}>
                {/* <Overlay saveditem={item} ref={OverlayRef}></Overlay> */}
                <Link to={`/ottapp/play/movie`}>
                  <img
                    alt={item.title}
                    src={item.Poster}
                    onClick={(e) => handleMoviePlayer(e, item)}
                  />
                </Link>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <>
                    <SavedUnsaved
                      saveditem={item}
                    />

                    <Button
                      startIcon={<MoreVert />}
                      ref={(el) => (iconRefs.current[item._id] = el)}
                      onClick={() => handleIconClick(item._id)}
                      sx={{
                        display: "inline",
                        textAlign: "right",
                        pb: 0,
                        "& span": { display: "inline-block !important", mr: 0 },
                      }}
                    />
                  </>
                  {activeId !== null &&
                    portalPosition &&
                    createPortal(
                      <div
                        ref={portalRefs}
                        style={{
                          border: "1px solid #0000008a",
                          borderRadius: "5px",
                          position: "absolute",
                          top: portalPosition?.top,
                          left: portalPosition?.left,
                          background: "white",
                          zIndex: 1000,
                          color: "#0000008a",
                        }}
                      >
                        <Tooltip tooltip={tooltip} />
                      </div>,
                      document.body
                    )}
                </Box>
              </Box>
            ) : null
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Topmovies;
