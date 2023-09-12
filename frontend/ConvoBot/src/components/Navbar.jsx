import '../styling/components/Navbar.css'
import { Typography } from '@mui/material'
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar(){
        const [anchorEl, setAnchorEl] = useState(null);
      
        const handleOpenMenu = (event) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleCloseMenu = () => {
          setAnchorEl(null);
        };
      
    return (
        <div className="nav-body">
            <div className='nav-body-items'>
                <AccountCircleIcon className='nav-body-items-profileImage'  sx={{marginRight:'5px',color:'rgba(255, 189, 6, 1)'}}/>
                <Typography className='nav-body-items-name'>Ahmed Iftekher Rais</Typography>
                <div>
                    <IconButton
                        aria-label="open menu"
                        aria-controls="menu"
                        aria-haspopup="true"
                        onClick={handleOpenMenu}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem sx={{width:'130px',justifyContent:'space-between'}} onClick={handleCloseMenu}> Help<HelpOutlineOutlinedIcon/></MenuItem>
                        <MenuItem sx={{width:'130px',justifyContent:'space-between'}} onClick={handleCloseMenu}>Log Out<LogoutOutlinedIcon/></MenuItem>
                        {/* <MenuItem onClick={handleCloseMenu}>Option 3</MenuItem> */}
                    </Menu>
                </div>
            </div>
        </div>
    )
}