import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import DirectionsIcon from '@mui/icons-material/Directions';
import Paper from '@mui/material/Paper';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function SearchHeader() {
    const { keyword } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        navigate(`/videos/${text}`);
    }
    useEffect(() => {
        setText(keyword || '');
    }, [keyword]);

    return (
        <Stack direction={'row'} sx={{alignItems: 'center'}}>
            <Link to='/'>
                <Stack direction="row" spacing={2}>
                    <YouTubeIcon color='error' fontSize="large" />
                    <Typography variant="h5" color='error' sx={{fontWeight: 'bold'}}>Youtube</Typography>
                </Stack> 
            </Link>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="검색..."
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={e => setText(e.target.value)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <DirectionsIcon />
                </IconButton>
            </Paper>
        </Stack>
    )
}