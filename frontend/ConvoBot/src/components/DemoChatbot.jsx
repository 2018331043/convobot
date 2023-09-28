import logo from '../assets/bot.png'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { InputAdornment } from '@mui/material';
import { IconButton, Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import * as React from "react";
import { v4 as uuidv4 } from 'uuid';
import SendIcon from "@mui/icons-material/Send";
import minimizeImg from '../assets/minimize.png'
import MicOffIcon from "@mui/icons-material/MicOff.js";
import '../styling/components/DemoChatbot.css'

export default function DemoChatbot( {themeColor}){

    const [open, setOpen] = useState(true);

    const [messages, setMessages] = useState([
        { id: uuidv4(), text: "Hi there!", sender: "bot" },
        { id: uuidv4(), text: "How can I assist you?", sender: "bot" },
        // { id: uuidv4(), text: backgroundColor, sender: "bot"},
        {id: uuidv4(), text: 'Tell me about yourself', sender: "user" },
      ]);

      const customTheme = createTheme({
        palette: {
          primary: {
            main: themeColor, // Change this to your desired color
          },
        },
      });
    return (
        <>
           <Popper open={open} transition sx={{zIndex:'8000',boxShadow:'none'}}>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350} sx={{background:'transparent',boxShadow:'none'}}>
                  <Paper sx={{boxShadow:'none'}}>
        <ThemeProvider theme={customTheme}>
          <div className="chatbox-container" style={{zIndex:9999,height:'550px',width:'320px',
          display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:'white'}}>
          <div className="chatbox-nav" style={{borderTopLeftRadius:'20px',borderTopRightRadius:'20px',
          borderBottom:'solid', borderBottomColor:'rgba(255, 189, 6, 0.849)'}}>
          <Typography sx={{ color: 'white', marginLeft: '10px', fontSize:'17px'}}>
            Convo<span className="chatbox-span-1">Bot</span>
          </Typography>
          <IconButton
              aria-label="open menu"
              aria-controls="menu"
              aria-haspopup="true"
              sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'40px',width:'40px'}}
            >
            <img style={{height:'20px',width:'20px',marginRight:'15px'}} src={minimizeImg} />
          </IconButton>

        </div>
        <Box
          sx={{
            paddingTop: '10px',
            height: "calc(100% - 80px )",
            width: "98%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "grey.200",
            borderBottomRightRadius:'20px',
            borderBottomLeftRadius:'20px',
          }}
        >
          <Box className="chatbox-messages-container" sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
        
          </Box>
          <Box sx={{ backgroundColor: "background.default", display: 'flex',padding:'15px 3px 10px 3px',background:'none' }}>
            <TextField
            className="chatbox-container-textField"
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
   
              sx={{
                background:'white'
              }}
       
              InputProps={{
                endAdornment: (
                  <Button
                    color="primary"
                    variant="text"
                
                    style={{ marginRight: '-15px' }} 
                  >
                    <MicOffIcon sx={{ color: 'primary', marginTop: '0px' }} />
                  </Button>
                ),
              }}
            />
            <Button
              className="chatbox-container-send-button"
              color="primary"
              variant="contained"
              
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
    </Paper>
                </Fade>
              )}
            </Popper>  
    </>
    )
}

const Message = ({ message }) => {
    const isBot = message.sender === "bot";

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: isBot ? "flex-start" : "flex-end",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isBot ? "row" : "row-reverse",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}>
            {isBot ? "B" : "U"}
          </Avatar>
          <Paper
            variant="outlined"
            sx={{
              padding:'9px 14px' ,
              ml: isBot ? 1 : 0,
              mr: isBot ? 0 : 1,
              backgroundColor: isBot ? "primary.light" : "",
              borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '11px' }}>{message.text}</Typography>
          </Paper>
        </Box>
      </Box>
    );
  }