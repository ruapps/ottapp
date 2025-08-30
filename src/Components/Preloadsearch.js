import { Stack, Grid } from "@mui/material";
import { Box } from "@mui/system";

const Preloadsearch = () => {
  return (
    <Box
      className="owl-carousel"
      sx={{
        flexWrap: "wrap",
        alignItems: "flex-start",
        alignContent: "flex-start",
        justifyContent: {
          xs: "space-between ",
          md: "start ",
        },
        pl: { sm: "10px" },
      }}
    >
      {Array.from(Array(18)).map((item, index) => (
        <Box
          key={index}
          className={"owl-carousel-item blankbox"}
          sx={{
            m: { xs: "15px 0 20px 0" },
            mr: { sm: "10px !important" },

            height: "225px",
            bgcolor: "darkgray.main",

            boxShadow: "-1px -1px 5px #272624fa, 1px 1px 5px #272624fa",

            width: { xs: "calc(100% - 53%)", sm: "calc(100% - 84.80%)" },
          }}
        ></Box>
      ))}
    </Box>
  );
};

export default Preloadsearch;
