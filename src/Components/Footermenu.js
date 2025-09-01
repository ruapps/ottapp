import {
  Box,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
// import Home from "@mui/icons-material/Home";
import { Home, Category, PlaylistPlay, Logout } from "@mui/icons-material";

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Drawercontext } from "../Context/Drawercontext";

const menulinks = {
  Home: { icon: <Home /> },

  Myhub: { icon: <PlaylistPlay />, List: ["Saved, Watched Trailers"] },

  Category: {
    icon: <Category />,
    Movie: ["Thriller", "Suspense", "Adventure", "Crime", "Sci-fi"],
    Serial: ["Mythology", "Devotion", "Reality show", "Drama", "Adult", "Kids"],
    Games: ["3D", "Adventure"],
  },
  Logout: { icon: <Logout /> },
};

const Footermenu = ({ setDrawer, drawer }) => {
  const { sendCategories } = useContext(Drawercontext);

  useEffect(() => {
    sendCategories(menulinks.Category);
  }, [sendCategories]);

  const handleDrawer = (e) => {
    e.preventDefault();
    setDrawer(!drawer);
  };

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        position: "fixed",
        bottom: "0",
        ml: { xs: "-16px", sm: 0 },
        backgroundColor: "rgba(9, 8, 8, 0.8)",
        zIndex: 1500,
        display: { xs: "block", md: "none" },
      }}
    >
      <List
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          boxShadow: "0px 0px 15px 0px #989898",
          "& .MuiListItem-root": { justifyContent: "center" },
          "& .MuiButtonBase-root": {
            pl: 0,
            alignItems: "center",
            pr: 0,
            flexDirection: "column",
            justifyContent: "center",
          },
          "& .MuiListItemText-root span": {
            fontWeight: "600",
            fontSize: "18px",
            color: "black.contrastText",
          },
        }}
      >
        {Object.entries(menulinks).map(([key, value]) => (
          <>
            <ListItem key={key} disablePadding>
              <Link
                to={
                  key === "Home"
                    ? "/ottapp"
                    : "/ottapp/" + key.toLocaleLowerCase()
                }
              >
                <ListItemButton
                  onClick={(e) => key === "Category" && handleDrawer(e)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "fit-content !important",
                      "& svg": {
                        color: "black.contrastText",
                      },
                    }}
                  >
                    {value.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={key}
                    sx={{
                      my: 0,
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>

            <Divider color="#989898" orientation="vertical" />
          </>
        ))}
      </List>
    </Box>
  );
};

export default Footermenu;
