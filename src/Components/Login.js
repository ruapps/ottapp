import React, { useState, useEffect } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { VisibilityOff, KeyboardBackspace, Visibility } from '@mui/icons-material';

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

import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../Store/loginSlice';
import { useSelector, useDispatch } from "react-redux";

export default function Login({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(true);
    const { errors, isLoggedIn, status } = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (isLoggedIn) {
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
                            Log in
                        </Typography>
                    </Box>



                    {errors.length > 0 && (
                        <Box>
                            <Typography sx={{ fontWeight: '600', color: 'red' }}>Error:</Typography>

                            <List sx={{ mt: 1 }}>
                                {errors.map((err, index) => (
                                    <ListItem key={index} sx={{ py: 0 }}>
                                        <ListItemText
                                            primary={err}
                                            primaryTypographyProps={{
                                                color: "error",
                                                variant: "body2",
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                    )}

                    {
                        isLoggedIn && <Typography sx={{ fontWeight: '600', color: 'green', p: 5, bgcolor: 'white', border: '1px solid green' }}>Login successful! Redirecting to home...</Typography>
                    }


                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ '& label, & input': { color: 'gray.contrastText' }, '& fieldset': { borderColor: "gray.contrastText" }, mt: 1 }}>
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            fullWidth
                            margin="normal"
                            autoComplete="email"
                            required
                        />

                        <TextField
                            label="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            fullWidth
                            margin="normal"
                            autoComplete="current-password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            onClick={() => setShowPassword((s) => !s)}
                                            edge="end"
                                            sx={{ '& > svg': { fill: '#fff' } }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <FormControlLabel
                            control={<Checkbox />}
                            label="Remember me"
                            sx={{ mt: 1, '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, & svg': { color: 'gray.contrastText' } }}
                        />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, bgcolor: 'darkgray.main' }}>
                            Log In
                        </Button>
                        <Box sx={{ mt: 2, color: 'gray.main' }}>
                            Does't have an account ? <Link to="/ottapp/signup"><Box component="b" sx={{ color: 'gray.contrastText' }}>Singup</Box></Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}