import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
    Avatar,
    Box,
    TextField,
    Button,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    Paper,
    List, ListItem, ListItemText, Typography, Modal
} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from '../Store/signupSlice';
import { Link, useNavigate } from "react-router-dom";
import { PersonAddAltOutlined, KeyboardBackspace } from '@mui/icons-material';
import { ModalContext } from '../Context/ModalContext';


export default function SignUp() {
    const { errors, oldInput, status } = useSelector((state) => state.signup)
    const { signupModalState, sendSignupModalState } = useContext(ModalContext)
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPass: '',
        userType: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser(formData))
    };

     useEffect(() => {

        setFormData({ ...oldInput, confirmPass: '' })

    }, [oldInput])

    useEffect(() => {
        if (status === "Success") {
            setTimeout(() => {
                navigate("/ottapp/login",{ replace: true});
            }, 2000)
        }
    }, [status, navigate]);


    return (
        <Box sx={{ overflow: 'auto',  position: 'absolute', zIndex: 1600, bgcolor: 'darkgray.main', width: '100%', height: '100vh' }}>
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 5,
                maxWidth: 'fit-content',
                mx: 'auto',

            }}>
                
                <Paper sx={{ p: 4, maxWidth: 420, width: '100%', py: '20px', boxShadow: '0px 0px 10px #fff', bgcolor: 'black.main', }}>
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
                            <PersonAddAltOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ mb: 1, color: 'gray.contrastText' }}>
                            Sign Up
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
                        status === "Success" && <Typography sx={{ fontWeight: '600', color: 'green', p: 5, bgcolor: 'white', border: '1px solid green' }}>Signup successful! Redirecting to login...</Typography>
                    }

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ '& label, & input': { color: 'gray.contrastText' }, '& fieldset': { borderColor: "gray.contrastText" }, '& input:focus': { 'label': { color: '#fff' } } }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Create Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPass"
                            type="password"
                            value={formData.confirmPass}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />

                        <FormLabel sx={{ mt: 3, display: 'block' }}>User Type</FormLabel>
                        <RadioGroup
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            sx={{ mt: 1, '& span > .MuiSvgIcon-root': { color: 'gray.contrastText' } }}
                        >
                            <FormControlLabel value="adult" control={<Radio />} label="Adult" />
                            <FormControlLabel value="kid" control={<Radio />} label="Kid" />
                        </RadioGroup>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, bgcolor: 'darkgray.main' }}
                        >
                            Sign Up
                        </Button>
                        <Box sx={{ mt: 2, color: 'gray.main' }}>
                            Already have an account ? <Link to="/ottapp/login"><Box component="b" sx={{ color: 'gray.contrastText' }}>Login</Box></Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}