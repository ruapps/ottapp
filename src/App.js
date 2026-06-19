import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Home from "./Pages/Home";
import Saved from "./Pages/Favourites";
import Discover from "./Pages/Discover";

import Sidebar from "./Components/Sidebar";
import Appbar from "./Components/Appbar";
import Footermenu from "./Components/Footermenu";
import Searchedmovies from "./Components/Searchedmovies";
import Myhub from "./Components/Myhub";
import SignUp from "./Components/Signup";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Profile from "./Components/Profile";
import WrapperPlayer from "./Components/WrapperPlayer";

import AuthRoute from "./Components/Routes/AuthRoute";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";

import Searchcontextp from "./Context/Searchcontextp";
import Drawercontextp from "./Context/Drawercontextp";
import ModalContextp from "./Context/ModalContextp";

import { fetchMovies } from "./Api/loadapi";
import { fetchFavourites } from "./Api/favouritesApi";
import { fetchProfile } from "./Api/profileApi";
import { fetchRecommendations } from "./Api/recommendationApi";
import { fetchCurrentUser } from "./Store/loginSlice";

const theme = createTheme({
  palette: {
    black: {
      main: "#090808",
      contrastText: "#989898",
    },
    gray: {
      main: "#333",
      contrastText: "#fff",
    },
    darkgray: {
      main: "#272624fa",
    },
    label: {
      main: "#fff",
    },
  },
});

function App() {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.login);

  const [drawer, setDrawer] = useState(false);
  const [shrinkdrawer, setShrinkdrawer] = useState(true);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFavourites());

    if (isLoggedIn) {
      dispatch(fetchProfile());
      dispatch(fetchRecommendations());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Drawercontextp>
          <ModalContextp>
            <Searchcontextp>
              <Container
                maxWidth="xl"
                sx={{
                  bgcolor: "gray.main",
                  px: { sm: 0 },
                  minHeight: "100vh",
                  "& svg, & .IconButton": {
                    cursor: "pointer",
                  },
                }}
              >
                <Routes>
                  <Route
                    exact
                    path="/ottapp/signup"
                    element={
                      <AuthRoute>
                        <SignUp setDrawer={setDrawer} />
                      </AuthRoute>
                    }
                  />
                  <Route
                    exact
                    path="/ottapp/login"
                    element={<Login setDrawer={setDrawer} />}
                  />
                  <Route
                    path="/ottapp/logout"
                    element={<Logout setDrawer={setDrawer} />}
                  />
                </Routes>
                <Grid container>
                  <Sidebar
                    Open={drawer}
                    setDrawer={setDrawer}
                    setShrinkdrawer={setShrinkdrawer}
                    shrinkdrawer={shrinkdrawer}
                  />

                  <Footermenu drawer={drawer} setDrawer={setDrawer} />

                  <Grid
                    item
                    xs={12}
                    lg={shrinkdrawer ? 10 : 11}
                    sx={{
                      pt: "1.5rem",
                      pb: "83px",
                      transition: "all 0.5s ease-in",
                      minHeight: { xs: "50vh", sm: "100vh" },
                      width: {
                        lg: `${
                          shrinkdrawer
                            ? "calc(100% - 16.40%)"
                            : "calc(100% - 8.40%)"
                        }`,
                      },
                      "& svg": {
                        color: "black.contrastText",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: {
                          sm: "calc(100% - 2.94%)",
                        },
                        mx: "auto",
                        "& > div:nth-of-type(2)": {
                          mt: {
                            xs: "87px",
                            lg: "97px",
                          },
                        },
                      }}
                    >
                      <Appbar
                        setDrawer={setDrawer}
                        shrinkdrawer={shrinkdrawer}
                      />

                      <Box sx={{ mt: "5rem" }}>
                        <Routes>
                          <Route
                            path="/ottapp"
                            element={<Home setDrawer={setDrawer} />}
                          />

                          <Route
                            path="/ottapp/profile"
                            element={
                              <ProtectedRoute>
                                <Profile setDrawer={setDrawer} />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/ottapp/favourites"
                            element={<Saved setDrawer={setDrawer} />}
                          />

                          <Route
                            path="/ottapp/discover"
                            element={<Discover setDrawer={setDrawer} />}
                          />

                          <Route
                            path="/ottapp/searchmovies"
                            element={<Searchedmovies setDrawer={setDrawer} />}
                          />

                          <Route path="/ottapp/myhub" element={<Myhub />} />

                          <Route
                            path="/ottapp/play/movie"
                            element={<WrapperPlayer setDrawer={setDrawer} />}
                          />
                        </Routes>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Searchcontextp>
          </ModalContextp>
        </Drawercontextp>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
