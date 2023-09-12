import '../styling/components/Navbar.css'
import { Typography } from '@mui/material'
import React, { useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';

export default function Navbar(){
        const [anchorEl, setAnchorEl] = useState(null);
        const [image, setImage] = useState(null);
        const handleOpenMenu = (event) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleCloseMenu = () => {
          setAnchorEl(null);
        };
        const inputRef = useRef(null);

        const handleIconClick = () => {
          // Trigger the file input click event
          if (inputRef.current) {
            inputRef.current.click();
          }
        };
      
        const handleFileChange = (event) => {
          const selectedFile = event.target.files[0];
      
          if (selectedFile) {
            // You can display the selected image here.
            // For example, set it as the background image of a div or an img tag.
            const imageUrl = URL.createObjectURL(selectedFile);
      
            // Display the selected image (replace 'setImage' with your state management logic)
            setImage(imageUrl);
          }
        }
    return (
        <div className="nav-body">
            <div className='nav-body-items'>
                <label htmlFor="contained-button-file">
                <Tooltip title="Click to Add Profile Image">
                <IconButton onClick={handleIconClick}>
                    {
                        image?(<div className="avatar-container">
                        <img src={image} alt="Selected" className="avatar-image" />
                      </div>):
                        <AccountCircleIcon className='nav-body-items-profileImage'  sx={{marginRight:'5px',color:'rgba(255, 189, 6, 1)'}}/>
                      
                    }
                </IconButton>
                </Tooltip>
                </label>
                <input
                ref={inputRef}
                accept="image/*"
                id="contained-button-file"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                />
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