import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link';


export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Work Experience Project
          </Typography>
          <Link href= {"../minting/index"} passHref><Button component="a" variant = "contained" color="inherit">Minting</Button></Link>
          <Link href = {"/"} passHref><Button component="a" color="inherit" variant="contained">Home</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}