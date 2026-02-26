import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "./Pages/Home";
import Saved from "./Pages/Favourites";
import Discover from "./Pages/Discover";
import Player from "./Components/Player";
import Searchedmovies from "./Components/Searchedmovies";
import Myhub from "./Components/Myhub";
import SignUp from "./Components/Signup";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Logout from "./Components/Logout";

import AuthRoute from "./Components/Routes/AuthRoute";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import { fetchMovies } from "./Api/loadapi";
import { fetchCurrentUser } from "./Store/loginSlice";
import { fetchFavourites } from "./Api/favouritesApi";

const theme = createTheme({
  palette: {
    black: { main: "#090808", contrastText: "#989898" },
    gray: { main: "#333", contrastText: "#fff" },
    darkgray: { main: "#272624fa" },
    label: { main: "#fff" },
  },
});

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFavourites());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>

        {/* AUTH ROUTES */}
        <Route element={<AuthLayout />}>
          <Route
            path="/ottapp/signup"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />
          <Route path="/ottapp/login" element={<Login />} />
          <Route path="/ottapp/logout" element={<Logout />} />
        </Route>

        {/* MAIN APP ROUTES */}
        <Route element={<MainLayout />}>

          <Route path="/ottapp" element={<Home />} />
          <Route path="/ottapp/myhub" element={<Myhub />} />
          <Route path="/ottapp/searchmovies" element={<Searchedmovies />} />

          <Route
            path="/ottapp/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/ottapp/favourites" element={<Saved />} />
          <Route path="/ottapp/Discover" element={<Discover />} />
          <Route path="/ottapp/play/movie" element={<Player />} />

        </Route>

      </Routes>
    </ThemeProvider>
  );
}

export default App;