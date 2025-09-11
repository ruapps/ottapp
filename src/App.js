import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Saved from "./Pages/Saved";
import Discover from "./Pages/Discover";
import Sidebar from "./Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Player from "./Components/Player";
import { fetchMovies } from "./Api/loadapi";
import Searchedmovies from "./Components/Searchedmovies";
import Appbar from "./Components/Appbar";
import Searchcontextp from "./Context/Searchcontextp";
import Footermenu from "./Components/Footermenu";
import Drawercontextp from "./Context/Drawercontextp";
import Myhub from "./Components/Myhub";
// import { useLocation } from "react-router-dom";

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
  const [drawer, setDrawer] = useState(false);
  const [shrinkdrawer, setShrinkdrawer] = useState(true);
  const dispatch = useDispatch();
  // const location = useLocation();
  // const url = `id=${item?.id}`;

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ bgcolor: "gray.main", px: { sm: 0 } }}>
        <Grid container sx={{ px: 0 }}>
          <BrowserRouter>
            <Drawercontextp>
              <Sidebar
                Open={drawer}
                setDrawer={setDrawer}
                setShrinkdrawer={setShrinkdrawer}
                shrinkdrawer={shrinkdrawer}
              />
              <Footermenu setDrawer={setDrawer} drawer={drawer} />
              <Routes>
                <Route path="/ottapp/myhub" element={<Myhub />} />
              </Routes>
            </Drawercontextp>
            <Grid
              item
              lg={shrinkdrawer ? 10 : 11}
              // lg={9}
              xs={12}
              sx={{
                "& svg": { color: "black.contrastText" },
                pt: "1.5rem",
                pb: "83px",
                width: {
                  lg: `${
                    shrinkdrawer ? "calc(100% - 16.40%)" : "calc(100% - 8.40%)"
                  }`,
                },
                transition: "all 0.5s ease-in",
                minHeight: { xs: "50vh", sm: "100vh" },
              }}
            >
              <Box
                sx={{
                  width: { sm: "calc(100% - 2.94%)" },
                  mx: "auto",
                  // left: " 50%",
                  // width: `${shrinkdrawer ? "83.83%" : "92.92%"}`,
                  // transition: "all 0.5s ease-in 0.3s"
                  "& > div:nth-child(2)": { mt: { xs: "87px", lg: "97px" } },
                }}
              >
                <Searchcontextp>
                  <Appbar
                    setDrawer={setDrawer}
                    shrinkdrawer={shrinkdrawer}
                  ></Appbar>
                  <Routes>
                    <Route
                      path="/ottapp/searchmovies"
                      element={<Searchedmovies setDrawer={setDrawer} />}
                    />
                  </Routes>
                </Searchcontextp>

                <Routes>
                  <Route
                    exact
                    path="/ottapp"
                    element={<Home setDrawer={setDrawer} />}
                  />
                  <Route
                    path="/ottapp/Saved"
                    element={<Saved setDrawer={setDrawer} />}
                  />
                  <Route
                    path="/ottapp/Discover"
                    element={<Discover setDrawer={setDrawer} />}
                  />
                  <Route
                    path={`/ottapp/play/movie`}
                    element={<Player setDrawer={setDrawer} />}
                  />
                </Routes>
              </Box>
            </Grid>
          </BrowserRouter>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
