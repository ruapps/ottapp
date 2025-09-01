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
  Collapse,
} from "@mui/material";
import {
  Home,
  Try,
  PlaylistPlay,
  LocalMovies,
  PhotoCameraFront,
  LiveTv,
  AccountCircle,
  Menu,
  Close,
  Logout,
  Category,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Drawercontext } from "../Context/Drawercontext";

const menulinks = {
  Home: { icon: <Home /> },

  Myhub: {
    icon: <PlaylistPlay />,
    List: [
      { Saved: { icon: <Try /> } },
      { Watched: { icon: <PlaylistPlay /> } },
      { Trailers: { icon: <LiveTv /> } },
    ],
  },

  Category: {
    icon: <Category />,
    List: [
      {
        Movie: {
          icon: <LocalMovies />,
          listitems: ["Thriller", "Suspense", "Adventure", "Crime", "Sci-fi"],
        },
      },
      {
        Serial: {
          icon: <PhotoCameraFront />,
          listitems: [
            "Mythology",
            "Devotion",
            "Reality show",
            "Drama",
            "Adult",
            "Kids",
          ],
        },
      },
      { Games: { icon: "", listitems: ["3D", "Adventure"] } },
    ],
  },
  General: { "Log out": <Logout /> },
};

const Sidebar = ({ Open, setDrawer, shrinkdrawer, setShrinkdrawer }) => {
  const { Categories } = useContext(Drawercontext);
  const [open, setOpen] = useState({});

  const handleToggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Grid
        item
        lg={shrinkdrawer ? 2 : 1}
        md={3}
        sx={{
          display: { xs: "none", md: "block" },
          pt: "1.5rem",
          position: "relative",
          transition: "all 0.5s ease-in",
        }}
        bgcolor="black.main"
      >
        <IconButton
          sx={{
            color: "gray.contrastText",
            position: "absolute",
            width: "calc(100% - 95%)",
            top: "-11px",
            opacity: `${shrinkdrawer ? 1 : 0}`,
            left: `${shrinkdrawer ? "100%" : "92%"}`,
            transition: "all 0.5s ease-in 0.4s",
          }}
          onClick={() => setShrinkdrawer(false)}
        >
          <Close />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            width: "calc(100% - 95%)",
            left: `${shrinkdrawer ? "90%" : "101%"}`,
            opacity: `${shrinkdrawer ? 0 : 1}`,
            top: "-11px",
            color: "gray.contrastText",
            transition: "all 0.5s ease-in 0.4s",
          }}
          onClick={() => setShrinkdrawer(true)}
        >
          <Menu />
        </IconButton>

        <Box
          component="nav"
          sx={{
            position: "relative",
            left: "15%",
            width: "calc(100% - 20%)",
          }}
          className="drawer_ele"
        >
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              transition: "all 0.5s ease-in",
              width: `${setShrinkdrawer ? "100% !important" : "50px"}`,
              pt: 0,
            }}
          >
            <AccountCircle sx={{ color: "lightblue", fontSize: "50px" }} />
            <Typography color="#fff">User</Typography>
          </IconButton>

          <List
            sx={{
              "& svg": {
                color: "black.contrastText",
              },
              "& .MuiButtonBase-root": {
                pl: 0,
                ml: `${shrinkdrawer ? "10px" : 0}`,
                alignItems: "center",
                pr: `${shrinkdrawer ? "1em" : 0}`,
              },
              "& .MuiListItemIcon-root": {
                minWidth: "fit-content",
              },

              "& .MuiListItemText-root": {
                mr: "auto",
                my: 0,
                pl: 1,
                "& span": {
                  fontSize: "18px",
                  color: "black.contrastText",
                },

                opacity: `${shrinkdrawer ? 1 : 0}`,
                maxWidth: `${shrinkdrawer ? "fit-content" : "0px"}`,
                transition: "all 0.5s ease-in 0.3s",
              },
              "& .MuiCollapse-wrapperInner .MuiButtonBase-root": {
                pl: `${shrinkdrawer ? "1em" : 0}`,
              },
              "& .MuiCollapse-wrapperInner .MuiListItemText-root": {
                mr: "unset",
                opacity: 1,
                pl: `${shrinkdrawer ? "8px" : "5px"}`,
              },
              "& .MuiCollapse-wrapperInner .MuiListItemText-root.css-1gwqb1a-MuiListItemText-root":
                {
                  pl: "8px",
                },
              "& .MuiCollapse-wrapperInner svg": {
                width: "0.8em",
                ml: "auto",
              },
              "& .MuiCollapse-wrapperInner  .MuiListItemText-root span": {
                fontSize: "1em",
              },
            }}
          >
            {/* Top-level menu */}
            {Object.entries(menulinks).map(([key, value]) => (
              <React.Fragment>
                {/* Simple item like Home */}
                {key === "Home" && (
                  <Link to={"/ottapp"} key={key}>
                    <ListItemButton>
                      <ListItemIcon>{value.icon}</ListItemIcon>
                      <ListItemText primary={key} />
                    </ListItemButton>
                  </Link>
                )}

                {/* MyHub with collapsible list */}
                {key === "Myhub" && (
                  <>
                    <Divider sx={{ bgcolor: "gray.main" }} />
                    <ListItemButton onClick={() => handleToggle(key)}>
                      <ListItemIcon>{value.icon}</ListItemIcon>
                      <ListItemText primary={key} />
                      {open[key] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open[key]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {value.List.map((item) => {
                          const [key, value] = Object.entries(item)[0];
                          return (
                            <Link to={"/ottapp/" + key} key={key}>
                              <ListItemButton
                                onClick={(e) =>
                                  key !== "Saved" && e.preventDefault()
                                }
                              >
                                <ListItemIcon>{value.icon}</ListItemIcon>
                                <ListItemText primary={key} />
                              </ListItemButton>
                            </Link>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                )}

                {/* Category with multiple nested lists */}
                {key === "Category" && (
                  <>
                    <Divider sx={{ bgcolor: "gray.main" }} />
                    <ListItemButton onClick={() => handleToggle(key)}>
                      <ListItemIcon>{value.icon}</ListItemIcon>
                      <ListItemText primary={key} />
                      {open[key] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open[key]} timeout="auto" unmountOnExit>
                      {value.List.map((item) => {
                        const [key, value] = Object.entries(item)[0];

                        return (
                          key !== "icon" && (
                            <React.Fragment key={key}>
                              <ListItemButton onClick={() => handleToggle(key)}>
                                <ListItemIcon>{value.icon}</ListItemIcon>

                                <ListItemText primary={key} />
                                {open[key] ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse
                                in={open[key]}
                                timeout="auto"
                                unmountOnExit
                                sx={{
                                  bgcolor: "gray.main",
                                  borderRadius: "3px",
                                }}
                              >
                                <List component="div" disablePadding>
                                  {value.listitems.map((item, ind) => (
                                    <>
                                      <ListItemButton key={item}>
                                        <ListItemText
                                          primary={item}
                                          sx={{ fontSize: "0.9em" }}
                                        />
                                      </ListItemButton>
                                      {ind < value.listitems.length - 1 && (
                                        <Divider
                                          sx={{ bgcolor: "black.main" }}
                                        />
                                      )}
                                    </>
                                  ))}
                                </List>
                              </Collapse>
                            </React.Fragment>
                          )
                        );
                      })}
                    </Collapse>
                  </>
                )}

                {/* General (Log out only) */}
                {key === "General" && (
                  <>
                    <Divider sx={{ bgcolor: "gray.main" }} />
                    {Object.entries(value).map(([label, icon]) => (
                      <ListItemButton key={label}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label} />
                      </ListItemButton>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Grid>
      <Drawer anchor="bottom" open={Open} onClose={() => setDrawer(false)}>
        <Box
          component="nav"
          sx={{ maxWidth: "70%", mx: "auto", paddingBottom: "83px" }}
          className="drawer_ele"
        >
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              pt: 0,
            }}
            onClick={() => setDrawer(false)}
          >
            <Close
              // onClick={() => setDrawer(false)}
              sx={{ color: "gray.contrastText", fontSize: "2.5rem" }}
            />
          </IconButton>

          <List sx={{ "& .MuiListItem-root": { justifyContent: "center" } }}>
            {Object.entries(Categories || {})?.map(([key, value], ind) => (
              <>
                {value && ind >= 1 && (
                  <Box component="div" sx={{ textAlign: "center" }} key={key}>
                    <Typography
                      component="h3"
                      sx={{ fontSize: "15px", mt: "1rem", m: "auto" }}
                      color="#fff"
                    >
                      {key}
                    </Typography>
                    {value.map((texts, ind) => (
                      <ListItem key={texts} disablePadding>
                        <Link to={"/ottapp/" + texts}>
                          <ListItemButton sx={{ px: 0 }}>
                            <ListItemText
                              primary={texts}
                              sx={{
                                "& span": {
                                  fontSize: "18px",
                                  color: "black.contrastText",
                                },
                              }}
                            />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </Box>
                )}
                {ind !== 3 && <Divider color="#989898" sx={{ mb: 2 }} />}
              </>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
