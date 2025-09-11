import { useEffect, useRef, useState } from "react";
// import Overlay from "../Components/Overlay";
import { Box, Button } from "@mui/material";
import { addItem, delItem } from "../Store/savedSlice";

import {
  FavoriteBorder,
  Favorite,
  Download,
  ThumbUp,
  DeleteOutlineSharp,
  MoreVert,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { moviePlayer } from "../Store/playerSlice";
import Tooltip from "./Tooltip";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import Skeleton from "../Components/Skeleton";
import useCarousel from "../Customhook/useCarousel";
import useSwipeCarousel from "../Customhook/useSwipeCarousel";
import CarouselBtn from "./CarouselBtn";
import { savedNext, savedPrev } from "../Store/carouselSlice";

const tooltip = [
  ["Download", <Download />],
  ["Like Me", <ThumbUp />],
];

const Listitems = (props) => {
  const savedItems = useSelector((state) => state.saved);
  const [activeId, setActiveId] = useState(null);
  const [portalPosition, setPortalPosition] = useState(null);
  const dispatch = useDispatch();
  const iconRefs = useRef({});
  const portalRefs = useRef();
  const ele = useRef();
  const location = useLocation();
  const path = location.pathname === "/ottapp/myhub";
  console.log("listitems called");

  const { maxIndex, step } = useCarousel(
    path && props.carouseItemInd[4],
    ele,
    props.movies
  );

  // Handle swipe gestures
  useSwipeCarousel(ele, {
    onSwipeLeft: () => {
      if (props.carouseItemInd[4] < maxIndex) {
        dispatch(savedNext({ maxIndex }));
      }
    },
    onSwipeRight: () => {
      if (props.carouseItemInd[4] > 0) {
        dispatch(savedNext({ maxIndex }));
      }
    },
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (portalRefs.current && !portalRefs.current?.contains(e.target)) {
        closePortal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMoviePlayer = (e, item) => {
    // OverlayRef.current.triggerClick(e, item);
    dispatch(moviePlayer(item));
  };

  const handleAddSavedMovies = (item) => {
    !savedItems.flag[item.id]
      ? dispatch(addItem(item))
      : dispatch(delItem(item.id));
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

  return (
    <Box
      sx={{
        mt: {
          xs: `${path ? "50px" : "unset"}`,
          md: "35px",
        },
        "& svg": { color: "gray.contrastText" },
        ml: { xs: 0, sm: "16px" },
        "& > p, & > .owl-carousel, & > div ": {
          bgcolor: `${path ? "rgba(9, 8, 8, 0.8)" : "unset"}`,
          boxShadow: `${
            path ? "0px 0px 15px 0px #989898, 0px 0px 0px" : "unset"
          }`,
        },
      }}
    >
      {path && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // bgcolor: "transparent !important",
          }}
        >
          <Box
            component="p"
            sx={{
              color: "gray.contrastText",
              fontSize: "1.3rem",
              p: 1,
              display: "inline-block",
            }}
          >
            {props.compName?.split("")[0].toUpperCase() +
              props.compName?.slice(1)}
          </Box>
          <Box
            sx={{
              mr: 1,
            }}
          >
            <CarouselBtn
              action={{
                prev: savedPrev({ maxIndex }),
                next: savedNext({ maxIndex }),
              }}
            />
          </Box>
        </Box>
      )}
      {!props.status ? (
        <Skeleton>{props.text}</Skeleton>
      ) : (
        <Box
          className="owl-carousel"
          ref={ele}
          sx={{
            flexWrap: { xs: "nowrap", md: "wrap" },
            alignItems: "flex-start",
            alignContent: "flex-start",
            justifyContent: {
              xs: `${path ? "start" : "space-between"}`,
              sm: "start",
            },
            pl: { xs: 1, md: 0 },
          }}
        >
          {props.movies?.map((item, index) => (
            <Box
              key={item.id}
              className={"owl-carousel-item "}
              sx={{
                m: "15px 10px 20px 0",
                transform: "scale(1)",
                "&:hover": {
                  md: {
                    transform: "scale(1.1)",
                  },
                },
                borderRadius: "5px",
                boxShadow: "0px 0px 2px #090808, -0px -0px 2px #090808",
                width: {
                  xs: `${path ? "calc(100% - 69%)" : "calc(100% - 53%)"}`,
                  sm: "calc(100% - 84.80%)",
                },
              }}
            >
              {/* <Overlay
              saveditem={[item, props.compName && "saved"]}
              ref={OverlayRef}
            /> */}

              <Link to={`/ottapp/play/movie`}>
                <img
                  alt={item.Title}
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
                  <Button
                    startIcon={
                      props.compName ? (
                        <DeleteOutlineSharp />
                      ) : savedItems.flag[item.id] ? (
                        <Favorite />
                      ) : (
                        <FavoriteBorder />
                      )
                    }
                    sx={{
                      color: "#fff",
                      fontSize: "0.65rem",
                      minWidth: "calc(100% - 82.03%)",
                      "& span": { ml: "0 !important" },
                    }}
                    onClick={() =>
                      props.compName
                        ? props.onDelete(item.id)
                        : handleAddSavedMovies(item)
                    }
                  />

                  <Button
                    startIcon={<MoreVert />}
                    ref={(el) => (iconRefs.current[item.id] = el)}
                    onClick={() => handleIconClick(item.id)}
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
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Listitems;
