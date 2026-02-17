import { Box, Typography, IconButton } from "@mui/material";
import {
  AccountCircle,
  KeyboardArrowDown,
  KeyboardBackspace,
} from "@mui/icons-material";
import Saved from "../Pages/Favourites";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Myhub = () => {
  const { isLoggedIn, user } = useSelector((state) => state.login);
  return (
    <Box
      sx={{
        minWidth: { xs: "calc(100% + 16px)", sm: "100%" },
        overflow: "hidden",
      }}
    >
      <KeyboardBackspace
        sx={{ color: "gray.contrastText", fontSize: "2rem", mt: 1 }}
        onClick={() => window.history.back()}
      />
      <Link to={isLoggedIn ? "/ottapp/profile" : "/ottapp/signup"} style={{ textDecoration: "none" }}>
        <IconButton
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            pr: "16px",
            pt: 0,
          }}
        >
          <AccountCircle sx={{ color: "lightblue", fontSize: "50px" }} />
          <Box sx={{ display: "flex" }}>
            <Typography color="gray.contrastText">{isLoggedIn ? (user?.fullName.charAt(0) + user?.fullName.slice(1) ) : "Log In/Sign up"}</Typography>
            {isLoggedIn && <KeyboardArrowDown sx={{ color: "gray.contrastText" }} />}
          </Box>
        </IconButton>
      </Link>

      <Saved />
      {/* <Trailerwatched /> */}
    </Box>
  );
};

export default Myhub;
