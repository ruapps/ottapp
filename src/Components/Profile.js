import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
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
} from '@mui/material';

const Profile = () => {
const [isEditing, setIsEditing] = useState(false);
const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Web developer and designer',
    location: 'San Francisco, CA',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const handleEdit = () => {
    setIsEditing(!isEditing);
};

return (
    <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar
                    sx={{
                        width: { xs: 80, sm: 120 },
                        height: { xs: 80, sm: 120 },
                        mx: 'auto',
                        mb: 2,
                        bgcolor: 'primary.main',
                        fontSize: { xs: '2rem', sm: '3rem' },
                    }}
                >
                    {profileData.name.charAt(0)}
                </Avatar>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    {profileData.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {profileData.bio}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                    onClick={handleEdit}
                    size="small"
                >
                    {isEditing ? 'Save' : 'Edit Profile'}
                </Button>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Profile Information */}
            <Grid container spacing={3}>
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
                                <Typography variant="body1">{profileData.email}</Typography>
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
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleChange}
                                    size="small"
                                />
                            ) : (
                                <Typography variant="body1">{profileData.phone}</Typography>
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
                                <Typography variant="body1">{profileData.location}</Typography>
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
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleChange}
                                    size="small"
                                />
                            ) : (
                                <Typography variant="body1">{profileData.name}</Typography>
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
                                <Typography variant="body1">{profileData.bio}</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    </Container>
);
};

export default Profile;