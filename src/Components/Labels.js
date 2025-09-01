import { useContext, useRef, useMemo, memo } from "react";
import { Box, List, ListItem, Stack, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useSelector, useDispatch } from "react-redux";
import { Searchcontext } from "../Context/Searchcontext";
import { labelNext } from "../Store/carouselSlice";
import useCarousel from "../Customhook/useCarousel";

let sortedlabels;

const Labels = () => {
  const labelsState = useSelector((state) => state.labels.items);
  const carouseItemInd = useSelector((state) => state.carousel);
  // console.log("label called");

  const { sendLabelVal } = useContext(Searchcontext);
  const ele = useRef();
  const dispatch = useDispatch();
  useCarousel(carouseItemInd[3], ele);

  const sortlabels = useMemo(() => {
    // keep logic, just make it stable
    return [...(labelsState || [])].sort((a, b) => b.label[0] - a.label[0]);
  }, [labelsState]);

  const slicedlabels = useMemo(() => {
    if (sortlabels.length > 10) {
      // your slice, but with numbers (avoid string coercion)
      const start = sortlabels.length - 10;
      return sortlabels.slice(start);
    }
    return sortlabels;
  }, [sortlabels]);

  sortedlabels = (
    <>
      <IconButton
        aria-label="navigate previous"
        edge="start"
        onClick={() => dispatch(labelNext(slicedlabels.length))}
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
              id,
              label: [, text],
            } = item;
            return (
              <ListItem
                sx={{
                  px: "10px",
                  py: "3px",
                  borderRadius: "18px",
                  bgcolor: "darkgray.main",
                }}
                key={id}
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
        pl: "5%",
        border: "1px solid",
        borderColor: "darkgray.main",
        borderLeft: "none",
        borderRight: "none",
        m: { xs: "80px 0px 30px -28px", md: "1% 0px 0px" },
        py: { xs: "3%", md: "1%" },
        pr: { xs: "0px", md: "5%" },
      }}
    >
      {sortedlabels}
    </Stack>
  );
};

// export labels ;

export default memo(Labels);
