import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";

const Preloadsearch = () => {
  return (
    <Box
      className="owl-carousel"
      sx={{
        flexWrap: "wrap",
        alignItems: "flex-start",
        alignContent: "flex-start",
        // justifyContent: {
        //   xs: "space-between ",
        //   lg: "start ",
        // },
        justifyContent: "space-between",
        mt: 2,
        pl: { sm: "10px" },
      }}
    >
      {Array.from(Array(15)).map((item, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          animation="wave"
          sx={{
            bgcolor: "grey.800",
            mb: { xs: "20px", sm: "10px" },
            width: {
              xs: "calc(100% - 52%)",
              sm: "calc(100% - 81%)",
              md: "calc(100% - 81%)",
              lg: "calc(100% - 86.73%)",
            },
            borderRadius: "2px",
            height: { xs: "245px", sm: "200px", md: "225px" },
          }}
        />
      ))}
    </Box>
  );
};

export default Preloadsearch;
