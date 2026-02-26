import { Grid, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Appbar from "../Components/Appbar";
import Footermenu from "../Components/Footermenu";
import Drawercontextp from "../Context/Drawercontextp";
import ModalContextp from "../Context/ModalContextp";
import Searchcontextp from "../Context/Searchcontextp";
import { useState } from "react";

const MainLayout = () => {
  const [drawer, setDrawer] = useState(false);
  const [shrinkdrawer, setShrinkdrawer] = useState(true);

  return (
         
    <Drawercontextp>
      <ModalContextp>
        <Sidebar
          Open={drawer}
          setDrawer={setDrawer}
          setShrinkdrawer={setShrinkdrawer}
          shrinkdrawer={shrinkdrawer}
        />

        <Footermenu setDrawer={setDrawer} drawer={drawer} />

        <Grid
          item
          lg={shrinkdrawer ? 10 : 11}
          xs={12}
          sx={{
            pt: "1.5rem",
            pb: "83px",
            transition: "all 0.5s ease-in",
          }}
        >
          <Box>
            <Searchcontextp>
              <Appbar
                setDrawer={setDrawer}
                shrinkdrawer={shrinkdrawer}
              />
            </Searchcontextp>

            <Outlet />
          </Box>
        </Grid>
      </ModalContextp>
    </Drawercontextp>
    
    
  );
};

export default MainLayout;