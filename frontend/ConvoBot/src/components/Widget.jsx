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
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Widget({selectedChatbot,chatbotName,setOpenWidget}) {

  const backButtonClicked = () =>{
    setOpenWidget(false)
  }

  const [apiList,setApiList] = useState([])
  const [userApi,setUserApi] = useState('')

  const [isCopied, setIsCopied] = useState(false);
  const iframeCode = 
`<iframe
  id="my-iframe"
  width="500px"
  height="650px"
  title="ConvoBot Chatbot"
  src="http://127.0.0.1:5173/chatbot/${userApi}/${selectedChatbot}"
  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
  style="position: absolute;bottom: 1px;right: 1px;z-index: 9000">
</iframe>`

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "rgb(255, 189, 6)", // Change this to your desired color
      },
    },
  });
 


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

  useEffect(()=>{
    apiKeyService.getApiKeys((res)=>{
      setApiList(res)
      // console.log(res.length)
      if(res.length===0){
        // console.log(('wow'))
        apiKeyService.generateApiKey((res)=>{
          setUserApi(res.value)
        },(err)=>{

        })
      }
      // else{
      //   setUserApi(apiList[0].value)
      // }
    
    },(err)=>{
      console.log(err)
    })
  },[])
  useEffect(()=>{
    if(apiList.length>0){
      setUserApi(apiList[0].value)
      // console.log(userApi)
    }
  },[apiList])
  return (
    
      <div className="chatbox-container" style={{zIndex:1000}}>
        <div className="chatbox-nav" style={{borderTopRightRadius:'13px',borderTopLeftRadius:'13px',borderBottom:'solid',
        borderBottomColor:'rgba(255, 189, 6, 0.849)',height:'60px'}}>
          <Typography variant="h6" sx={{ color: 'white', marginLeft: '30px',marginBottom:'0', display: 'flex', alignItems: 'center'}}>
            {/* Convo<span className="chatbox-span-1">Bot</span> */}
            {chatbotName}
          </Typography>
          {/* <IconButton
              aria-label="open menu"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={backButtonClicked}
              sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'40px',width:'40px'}}
            >
            <ArrowBackIcon sx={{color:'white',marginRight:'20px',paddingLeft:'10px'}}/>
          </IconButton> */}

        </div>
        <ThemeProvider theme={darkTheme}>
        <div className="widget-body">
            <Typography variant="h6">Show popup chat widget in your website</Typography>
            <div className="widget-code">
                <div className="widget-code-copy">
                <Tooltip title='Copy to Clipboard'>
                  <Button onClick={copyToClipboard} sx={{margin:'10px 5px -20px'}}>
                      <ContentCopyIcon sx={{color:'white'}}/>
                  </Button>
                </Tooltip>
                </div>
                <pre style={{color:'white',marginLeft:'40px',marginBottom:'20px'}}>{iframeCode}</pre>
            </div>
        </div>
        </ThemeProvider>
      </div>
  );
}