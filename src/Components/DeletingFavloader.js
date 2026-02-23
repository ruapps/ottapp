import {useState} from 'react';
import {
 Modal, Box
} from '@mui/material';
import { useSelector } from "react-redux";

export const DeletingFavloader = () =>{

    const { error, loading } = useSelector((state) => state.saved);
    const { isLoggedIn } = useSelector((state) => state.login);
     const [open, setOpen] = useState(false);

    return (
            <Modal open={open} onClose={() => setOpen(isLoggedIn && (loading.delete === "pending" || loading.delete === "rejected")  ? true : false)} sx={{ bgcolor:'darkgray.main', opacity: '0.4'}}>
                <Box component= "p" sx={{borderRadius: '4px', border: "1px solid #fff"}}>
                    {
                    loading.delete === "pending" && 
                    <Box sx={{color: "#fff", bgcolor: "black.main", fontSize:'20px'}}>
                        deleting favourite item...
                    </Box>
                    }                   
                    {
                    loading.delete === "rejected" && 
                    <Box component= "p" sx={{color: "red", bgcolor: "black.main", fontSize:'20px', fontWeight:600}}>
                        {error?.message}
                    </Box>
                    }
                </Box>
            </Modal>
    )
}