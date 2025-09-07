import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
} from "@mui/material";
import {
  Search,
  CircleNotificationsOutlined,
  MessageOutlined,
  VerticalSplitOutlined,
} from "@mui/icons-material";
import { useContext, useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import useSearchLogic from "../Customhook/useSearchLogic";
import { Searchcontext } from "../Context/Searchcontext";
import { useLocation } from "react-router-dom";

const Appbar = (props) => {
  const { labelval } = useContext(Searchcontext);
  const [searchVal, setSearchVal] = useState("");
  const [scrollVal, setscrollVal] = useState(0);

  const location = useLocation();
  const path = location.pathname !== "/ottapp/searchmovies";
  // console.log("Appbar called");

  const triggerhook = useSearchLogic();
  // On clicking on label
  useEffect(() => {
    setSearchVal(labelval);
  }, [labelval]);

  // On typing in input feild
  useEffect(() => {
    triggerhook(searchVal);
  }, [searchVal]);

  useEffect(() => {
    const handleAppbarBgcolor = (e) => {
      setscrollVal(window.scrollY);
      console.log(window.scrollY);
    };

    window.addEventListener("scroll", handleAppbarBgcolor);
    return () => {
      window.removeEventListener("scroll", handleAppbarBgcolor);
    };
  }, []);

  return (
    <>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: `${
            scrollVal > 20 ? "rgba(9,8,8,0.8)" : "transparent"
          }`,
          boxShadow: "none",

          display: {
            xs: location.pathname === "/ottapp/myhub" ? "none" : "flex",
            lg: "flex",
          },
          position: "fixed",
          width: {
            lg: `${
              props.shrinkdrawer ? "calc(100% - 16.40%)" : "calc(100% - 8.40%)"
            }`,
          },
          transition: "all 0.5s ease-in",
          p: "24px 16px 24px",
          // pl: { lg: 0 },
        }}
      >
        <Toolbar disableGutters={true}>
          <Grid container sx={{ mx: 0, alignItems: "center" }}>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography
                  component="h1"
                  sx={{ fontSize: { xs: "2.3rem", md: "3rem" } }}
                >
                  <Box component="span">Movie</Box>
                  Hub
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                order: { xs: 3, md: 2 },
                position: "relative",
                pt: { xs: `${!path ? "50px" : 0}`, md: 0 },
              }}
            >
              <Box
                component="form"
                sx={{
                  m: { xs: "1rem 0 0 0", md: "0 0 auto 0" },
                  position: { xs: "absolute", md: "static", top: "15%" },
                  width: "100%",

                  borderRadius: 8,
                  border: "1px solid #fff",
                  px: 2,
                  alignItems: "center",
                  flex: "1 0 0",
                  display: {
                    xs: `${path ? "none" : "flex"}`,
                    md: "flex",
                  },
                }}
              >
                <Link to="/ottapp/searchmovies" style={{ display: "contents" }}>
                  <InputBase
                    placeholder="Search..."
                    name="searchbar"
                    sx={{
                      width: "100% ",
                      border: "none",
                      pr: "5px",
                      color: "#fff",
                    }}
                    value={path ? "" : searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    // onMouseEnter={(e) => setSearchVal(e.target.value)}
                  />
                  <IconButton>
                    <Search sx={{ color: "gray.contrastText" }} />
                  </IconButton>
                </Link>
              </Box>
            </Grid>
            <Grid item md={3} xs={6} order={{ xs: 2, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  "& button": { display: "inline-block", pt: 0, ml: 0.5 },
                  zIndex: 1400,
                  width: "100%",
                  "& svg": {
                    color: "gray.contrastText",
                    mt: "50%",
                    display: { xs: "none", md: "block" },
                  },
                }}
              >
                <IconButton>
                  <CircleNotificationsOutlined />
                </IconButton>
                <IconButton>
                  <MessageOutlined />
                </IconButton>
                <IconButton>
                  <VerticalSplitOutlined />
                </IconButton>
                <Link to="/ottapp/searchmovies" style={{ display: "contents" }}>
                  <IconButton
                    sx={{ display: { xs: "block", md: "none !important" } }}
                  >
                    <Search
                      sx={{ display: { xs: "block !important", md: "none" } }}
                    />
                  </IconButton>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default memo(Appbar);
