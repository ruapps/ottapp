import React from "react";
import { Box } from "@mui/material";

const Skeleton = ({ children }) => {
  return (
    <Box sx={{ py: "125px", bgcolor: "inherit", textAlign: "center" }}>
      <Box
        component="span"
        sx={{
          color: "black.contrastText",
          mx: "auto",
          mt: "30px",
          fontSize: "1.5rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Skeleton;
