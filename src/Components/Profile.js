import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Container,
  Paper,
  Box,
  Typography,
  Avatar,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../Api/profileApi";
import { EditingProfileloader } from "./EditingProfileloader";

const Profile = () => {
  const { profile, loading } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: " ",
    email: " ",
    phoneNumber: " ",
    bio: " ",
    location: " ",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
      setProfileData({
        fullName: profile.user.fullName,
        email: profile.user.email,
        phoneNumber: profile.phoneNumber,
        bio: profile.bio,
        location: profile.location,
      });
  };

  const handleSave = () => {
    console.log("Called handlesave");
    dispatch(updateProfile(profileData));
  };

  useEffect(() => {
    if (loading.update === "fulfilled") setIsEditing(false);
  }, [loading.update]);

  return (
    <Container sx={{ py: 4, px: "0 !important" }}>
      <Paper
        elevation={3}
        sx={{ p: { xs: 2, sm: 4, background: "transparent" }, borderRadius: 2 }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 4, width: {md:"25%"} }}>
          <Avatar
            sx={{
              width: { xs: 80, sm: 120 },
              height: { xs: 80, sm: 120 },
              mx: "auto",
              mb: 2,
              bgcolor: "darkgray.main",
              fontSize: { xs: "2rem", sm: "3rem" },
            }}
          >
            {profile.user.fullName.charAt(0)}
          </Avatar>
          <Typography variant="h4" sx={{ mb: 1, color: "gray.contrastText" }}>
            {profile.user?.fullName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 2, bgcolor: "gray.contrastText", borderRadius: "5px" }}
          >
            {profile.bio}
          </Typography>
          <Button
            variant="contained"
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            onClick={() => (isEditing ? handleSave() : handleEdit())}
            size="small"
            sx={{ bgcolor: "darkgray.main" }}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Profile Information */}
        <Grid
          container
          spacing={3}
          sx={{
            ".MuiCardContent-root": { bgcolor: "black.main" },
            ".MuiCardContent-root input, .MuiCardContent-root textarea": {
              color: "gray.contrastText",
              borderRadius: "4px",
              border: "1px solid #fff",
            },
            ".MuiCardContent-root > .MuiTypography-root": {
              color: "gray.main",
            },
          }}
        >
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Email
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">{profile.user.email}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Phone
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">{profile.phoneNumber}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Location
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">{profile.location}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Name
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">
                    {profile.user.fullName}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Bio
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    multiline
                    rows={3}
                  />
                ) : (
                  <Typography variant="body1">{profile.bio}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      <EditingProfileloader />
    </Container>
  );
};

export default Profile;
