import { Box, Typography, IconButton } from "@mui/material";
import { AccountCircle, KeyboardArrowDown } from "@mui/icons-material";
import Saved from "../Pages/Saved";
import Trailerwatched from "./Trailerwatched";
const Myhub = () => {
  return (
    <Box
      sx={{
        minWidth: { xs: "calc(100% + 16px)", sm: "100%" },
        overflow: "hidden",
      }}
    >
      <IconButton
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          pr: "16px",
        }}
      >
        <AccountCircle sx={{ color: "lightblue", fontSize: "50px" }} />
        <Box sx={{ display: "flex" }}>
          <Typography color="gray.contrastText">User</Typography>
          <KeyboardArrowDown sx={{ color: "gray.contrastText" }} />
        </Box>
      </IconButton>
      <Saved />
      <Trailerwatched />
    </Box>
  );
};

export default Myhub;
