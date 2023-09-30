import '../styling/components/Navbar.css'
import userProfileImage from '../assets/user.png'
import { Typography } from '@mui/material'
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React, { useState, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import localStorageService from '../services/LocalStorageService.js';
import apiImg from '../assets/api.png'
import UserApiKeys from './UserApiKeys.jsx';
import Badge from '@mui/material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function Navbar({setApiList,chatbotList,selectedChatbot,setSelectedChatbot,openReport,setOpenReport}){
        const [listItems, setListItems] = useState([]);
        const [openApiKeys, setOpenApiKeys] = useState(false)
        const [anchorEl, setAnchorEl] = useState(null);
        const [image, setImage] = useState(userProfileImage);
        const [userInfo,setUserInfo] = useState()

        const openApiModal = () =>{
          setOpenApiKeys(true)
        }
        const handleOpenMenu = (event) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleCloseMenu = () => {
          setAnchorEl(null);
        };
        const inputRef = useRef(null);

        const handleIconClick = () => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        };



        const customTheme = createTheme({
          palette: {
            primary: {
              main: "rgb(255, 189, 6)", // Change this to your desired color
            },
          },
        });

        const [userName,setUserName] = useState('')
        
        const handleFileChange = (event) => {
          const selectedFile = event.target.files[0];
          if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            localStorage.setItem('navImage',imageUrl)
            setImage(imageUrl);
          }
        }

        const logOutButtonClicked = ()=>{
          localStorageService.setToken("")
          localStorageService.setUserInfo({})
          localStorage.setItem("navImage","")
          window.location.replace('../')
        }

        useEffect(() => {
          try{
            setUserName(userInfo.user)
          }catch(e){
          }
        }, [userInfo]);

        useEffect(() => {
          // Set the default image URL in localStorage if it's not already set
          if (localStorage.getItem('navImage')) {
            setImage(localStorage.getItem('navImage'))
          }
          setUserInfo(localStorageService.getUserInfo())
          // setApiList(listItems)
        }, []);

        useEffect(()=>{
          setApiList(listItems)
          console.log(listItems)
        },[listItems])

        const reportButtonClicked = () =>{
          if(openReport===true){
            let l = chatbotList.length
            setSelectedChatbot(chatbotList[l-1].id)
            setOpenReport(false)
          }else{
            setSelectedChatbot(-10)
            setOpenReport(true)
          }
        }
    return (
        <ThemeProvider theme={customTheme}>
        <div className="nav-body">
            <div className='nav-body-items'>
              <Tooltip title='Report'>
              <AssessmentIcon onClick={reportButtonClicked} fontSize='large' 
              sx={openReport?{color:'rgba(255, 189, 6, 0.849)',marginRight:'15px',cursor:'pointer'}:{color:'rgba(0,0,0,.9)',marginRight:'15px',cursor:'pointer'}} />
              </Tooltip>
                <Tooltip title="Api key list">
                <Badge badgeContent={listItems.length} color="primary" sx={{marginRight:'30px'}}>
                    <Button variant='outlined' onClick={openApiModal} sx={{color:'black'}} >
                      <img src={apiImg} style={{height:'22px',width:'22px',marginRight:'10px'}}/>
                      <Typography>Api Key</Typography>
                    </Button>
                </Badge>
                </Tooltip>
                <label htmlFor="contained-button-file">
                <IconButton>
                    {
                        image?(<div className="avatar-container">
                        <img src={image} alt="Selected" className="avatar-image" />
                      </div>):
                        <AccountCircleIcon className='nav-body-items-profileImage'  sx={{marginRight:'5px',color:'rgba(255, 189, 6, 1)'}}/>
                      
                    }
                </IconButton>
                </label>
                <input
                ref={inputRef}
                accept="image/*"
                id="contained-button-file"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                />
                <Typography className='nav-body-items-name'>{userName}</Typography>
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
                        <MenuItem sx={{width:'180px',justifyContent:'space-between'}} onClick={handleIconClick} >Upload Photo<AddPhotoAlternateIcon/></MenuItem>
                        <MenuItem sx={{width:'180px',justifyContent:'space-between'}} > Help<HelpOutlineOutlinedIcon/></MenuItem>
                        <MenuItem sx={{width:'180px',justifyContent:'space-between'}} onClick={logOutButtonClicked} >Log Out<LogoutOutlinedIcon/></MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
        <UserApiKeys listItems={listItems} setListItems={setListItems} openApiKeys={openApiKeys} setOpenApiKeys={setOpenApiKeys}/>
        </ThemeProvider>
    )
}