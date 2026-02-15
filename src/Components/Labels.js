import { useContext, useRef, useMemo, memo, useEffect } from "react";
import { Box, List, ListItem, Stack, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useSelector, useDispatch } from "react-redux";
import { Searchcontext } from "../Context/Searchcontext";
import { labelNext, labelPrev } from "../Store/carouselSlice";
import useCarousel from "../Customhook/useCarousel";
import useSwipeCarousel from "../Customhook/useSwipeCarousel";

let sortedlabels;
let labelItems;
const Labels = () => {
  const labelsState = useSelector((state) => state.labels.items);
  const carouseItemInd = useSelector((state) => state.carousel);

  const { sendLabelVal } = useContext(Searchcontext);
  const ele = useRef();
  const dispatch = useDispatch();
 
  const { maxIndex, step } = useCarousel(
    carouseItemInd[3],
    ele,
    labelItems,
    true
  );

  // Handle swipe gestures
  useSwipeCarousel(ele, {
    onSwipeLeft: () => {
      if (carouseItemInd[3] < maxIndex) {
        dispatch(labelNext({ maxIndex, step }));
      }
    },
    onSwipeRight: () => {
      if (carouseItemInd[3] > 0) {
        dispatch(labelPrev({ maxIndex }));
      }
    },
  });

  const sortlabels = useMemo(() => {
    
    return [...(labelsState || [])].sort((a, b) => b.count - a.count);
  }, [labelsState]);

  const slicedlabels = useMemo(() => {
    if (sortlabels.length > 10) {
      
      const start = sortlabels.length - 10;
      return sortlabels.slice(0, start);
    }
    return sortlabels;
  }, [sortlabels]);

  useEffect(() => {
    labelItems = slicedlabels;
  }, [slicedlabels]);

  sortedlabels = (
    <>
      <IconButton
        aria-label="navigate previous"
        edge="start"
        onClick={() => dispatch(labelNext({ maxIndex, step }))}
        sx={{ p: { xs: "0px", md: "8px" } }}
      >
        <NavigateBeforeIcon sx={{ fontSize: "30px" }} />
      </IconButton>
      <Box
        component="h4"
        sx={{
          color: "gray.main",
          bgcolor: "label.main",
          px: "12px",
          py: "4px",
          borderRadius: "15px",
          minWidth: { xs: "121px", md: "150px " },
          ml: { xs: "0px !important", md: "16px" },
        }}
      >
        Top searches
      </Box>

      <Box
        sx={{
          overflow: "hidden",
          mr: { xs: "-16px !important", sm: "0px !important" },
        }}
      >
        <List
          sx={{
            justifyContent: "space-between",
            display: "flex",
            gap: "10px",
            transition: "all 0.3s ease-in",
          }}
          ref={ele}
        >
          {slicedlabels?.map((item) => {
            const {
              _id,
              text
            } = item;
            return (
              <ListItem
                sx={{
                  px: "10px",
                  py: "3px",
                  borderRadius: "18px",
                  bgcolor: "darkgray.main",
                }}
                key={_id}
                onClick={(e) => sendLabelVal(e, text)}
              >
                <Box
                  sx={{
                    color: "label.main",
                    fontSize: "15px !important",
                    width: "max-content",
                  }}
                >
                  {text}
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        border: "1px solid",
        borderColor: "darkgray.main",
        borderLeft: "none",
        borderRight: "none",
        width: "calc(100% + 2.94%)",
        overflow: "hidden",
        position: "relative",
        left: { sm: "-1.47%" },
        mb: { xs: "20px", md: 0 },
        py: { xs: "3%", md: "1%" },
        mt: { xs: "135px !important", lg: "85px !important" },
      }}
    >
      {sortedlabels}
    </Stack>
  );
};

// export labels ;

export default memo(Labels);
