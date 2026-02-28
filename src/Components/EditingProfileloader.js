import { Modal, Box } from "@mui/material";
import { useSelector } from "react-redux";

export const EditingProfileloader = () => {
  const { error, loading } = useSelector((state) => state.profile);

  const isOpen = loading.update === "pending" || loading.update === "rejected";

  return (
    <Modal open={isOpen} sx={{ bgcolor: "gray.main", opacity: "0.8", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box component="p" sx={{ borderRadius: "4px", border: "1px solid #fff", p: "1rem 2rem",  bgcolor: "black.main" }}>
        {loading.update === "pending" && (
          <Box sx={{ color: "#fff", fontSize: "20px" }}>
            Updating your profile...
          </Box>
        )}
        {loading.update === "rejected" && (
          <Box
            component="p"
            sx={{
              color: "red",
              bgcolor: "black.main",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            {error?.message}
          </Box>
        )}
      </Box>
    </Modal>
  );
};
