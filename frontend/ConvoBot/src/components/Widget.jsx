 import * as React from "react";
import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '@mui/material/Tooltip';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import '../styling/components/Chatbox.css';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styling/components/Widget.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import displayToast from "../services/toast.service";
import apiKeyService
 from "../services/api.key.service";
 import TuneIcon from '@mui/icons-material/Tune';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import DemoChatbot from "./DemoChatbot";
import {SketchPicker} from 'react-color'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Widget({apiList,selectedChatbot,chatbotName,setOpenWidget}) {

  const backButtonClicked = () =>{
    setOpenWidget(false)
  }
  const [userApi,setUserApi] = useState('API KEY')

  const [isCopied, setIsCopied] = useState(false);
  const [mainTheme,setMainTheme] = useState('ffbd06')

  const [f,setF]=useState(true)


  const iframeCode =
`<iframe
  id="my-iframe"
  width="500px"
  height="650px"
  title="ConvoBot Chatbot"
  src="http://127.0.0.1:5173/chatbot/${userApi}/${selectedChatbot}?setTheme=${mainTheme}"
  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
  style="position: absolute;bottom: 1px;right: 1px;z-index: 9000">
</iframe>`

const userApiLink =
`curl http://127.0.0.1:5173/convobot/api/v1/chat/post-text?apiKey=${userApi} \\
-H "Content-Type: application/json" \\
-d '{
  "inputText": "YOUR TEXT INPUT",
  "chatbotId": ${selectedChatbot}
  
}'`

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "rgb(255, 189, 6)", // Change this to your desired color
      },
    },
  });

  const [openCustom, setOpenCustom] = React.useState(false);

  const handleClickOpen = () => {
    setOpenCustom(true);
  };

  const handleClose = () => {
    setOpenCustom(false);
  };


  const copyToClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = iframeCode;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setIsCopied(true);
    displayToast.default('Code copied to clipboard',2000)
  };

  const copyToClipboard2 = ()=>{
    const textArea = document.createElement('textarea');
    textArea.value = userApiLink;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setIsCopied(true);
    displayToast.default('Code copied to clipboard', 2000);
  }


  useEffect(()=>{
     if(apiList.length===0){
      displayToast.warning('Please generate an API key',2000)
     }else{
      setUserApi(apiList[0].value)
     }
    setMainTheme('ffbd06')
  },[])

  useEffect(()=>{
    if(apiList.length>0){
      setUserApi(apiList[0].value)
      console.log(apiList[0].value)
    }
  },[apiList])

  const openCustomize = ()=>{
    handleClickOpen()
  }

  const [themeColor,setThemeColor]=useState('#ffbd06')
  const handleThemeChange = (color)=>{
    setThemeColor(color.hex)
  }

  const handleDefaultTheme = () =>{
    setThemeColor('#ffbd06')
  }

  const confirmTheme = () =>{
    displayToast.info('Theme integration successful, copy the code or it will be restored to default theme soon',4000)
    let s = themeColor
    let str = s.replace('#','')
    setMainTheme(str)
    console.log(str)
    setThemeColor('#ffbd06')
    handleClose()
  }

  return (

      <div className="chatbox-container" style={{zIndex:1000}}>
        <div className="chatbox-nav" style={{borderTopRightRadius:'13px',borderTopLeftRadius:'13px',borderBottom:'solid',
        borderBottomColor:'rgba(255, 189, 6, 0.849)',height:'60px'}}>
          <Typography variant="h6" sx={{ color: 'white', marginLeft: '30px',marginBottom:'0', display: 'flex', alignItems: 'center'}}>
            {/* Convo<span className="chatbox-span-1">Bot</span> */}
            {chatbotName}
          </Typography>

        </div>
        <ThemeProvider theme={darkTheme}>
        <div className="widget-body">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <Typography variant="h6">Show popup chat widget in your website</Typography>
              <Tooltip title='Customize'>
                <TuneIcon onClick={openCustomize} sx={{marginRight:'2px',cursor:'pointer'}}/>
              </Tooltip>
            </div>
            
            <div className="widget-code">
                <div className="widget-code-copy">
                <Tooltip title='Copy to Clipboard'>
                  <Button onClick={copyToClipboard} sx={{margin:'10px 5px -20px'}}>
                      <ContentCopyIcon sx={{color:'white'}}/>
                  </Button>
                </Tooltip>
                </div>
                <pre style={{color:'white',marginLeft:'40px',marginBottom:'20px',fontSize:'14px'}}>{iframeCode}</pre>
            </div>
            <Typography variant="h6" sx={{marginTop:'20px'}}>Chatbot API</Typography>
            <div className="widget-code">
                <div className="widget-code-copy">
                <Tooltip title='Copy to Clipboard'>
                  <Button onClick={copyToClipboard2} sx={{margin:'10px 5px -20px'}}>
                      <ContentCopyIcon sx={{color:'white'}}/>
                  </Button>
                </Tooltip>
                </div>
                <pre style={{color:'white',marginLeft:'40px',marginBottom:'20px',fontSize:'14px'}}>{userApiLink}</pre>
            </div>
        </div>
        </ThemeProvider>
        <Dialog
          open={openCustom}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          
        >
          <DialogContent>
            <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
              <div style={{width:'100%',display:'flex',height:'60px'}}>
                <CloseIcon onClick={handleClose} sx={{marginLeft:'auto',cursor:'pointer'}}/>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                <DemoChatbot themeColor={themeColor}/>
                <Typography variant="h5" sx={{marginRight:'16px'}}>Customize the chatbot <span style={{fontWeight:'bold'}}>theme</span></Typography>
                <SketchPicker color={themeColor}
                onChangeComplete={handleThemeChange}/>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDefaultTheme}>Default Theme</Button>
            <Button onClick={confirmTheme} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}