import React, { useEffect } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { KeyboardBackspace } from '@mui/icons-material';

import {
    Avatar,
    Button,
    TextField,
    Paper,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Checkbox, List, ListItem, ListItemText, Modal
} from '@mui/material';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logoutUser} from '../Store/loginSlice';

export default function Logout({ onSubmit }) {

    const { isLoggedIn, status } = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();

      const handleLogout = (e)=>{
          dispatch(logoutUser());
      }

    useEffect(() => {
        if (!isLoggedIn) {
            const timer = setTimeout(() => {
                navigate("/ottapp", { replace: true });
            }, 2000)
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate]);

    return (
        // <Modal open={open} onClose={() => setOpen(!open)} sx={{overflow:'auto', position:'absolute', bgcolor:'darkgray.main', zIndex: 1600}}>
        <Box sx={{ overflow: 'auto', position: 'absolute', bgcolor: 'darkgray.main', zIndex: 1600, width: '100%', height: '100vh',  }}>

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    maxWidth: 'fit-content',
                    m: 'auto'
                }}
            >

                <Paper elevation={3} sx={{ maxWidth: 420, width: '100%', p: 4, boxShadow: '0px 0px 10px #fff', bgcolor: 'black.main', opacity: status === "Pending" ? 0.5 : 1 }}>
                    <KeyboardBackspace
                        sx={{
                            color: "gray.contrastText",
                            fontSize: "2rem",
                            mt: "-8px",
                            display: { lg: "block", xs: "none" },
                        }}
                        onClick={() => window.history.back()}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'darkgray.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ mb: 1, color: 'gray.contrastText' }}>
                            Are you sure you want to logout?
                        </Typography>
                    </Box>

                    {
                        !isLoggedIn && <Typography sx={{ fontWeight: '600', color: 'green', p: 5, bgcolor: 'white', border: '1px solid green' }}>User logged out successfully</Typography>
                    }


                        <Button type="submit" onClick={handleLogout} fullWidth variant="contained" sx={{ mt: 2, bgcolor: 'darkgray.main' }}>
                            Yes, Logout
                        </Button>
                        
                </Paper>
            </Box>
        </Box>
    );
}