import '../styling/components/ChatbotInfo.css'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import BlockIcon from '@mui/icons-material/Block';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import ChatBox from './Chatbox.jsx'
import { useEffect } from 'react';
import authService from '../services/auth.service.js';
import LoadingDialog from './LoadingDialog';
import displayToast from '../services/toast.service.js';
import chatService from '../services/chat.service';
import Widget from './Widget';
import Advanced from './Advanced';

export default function ChatbotInfo({apiList,chatActive,setChatActive,selectedChatbot,setSelectedChatbot,
  selectedChatbotInfo,setChatBotList,openWidget,setOpenWidget,chatbotList,
  openAdvanced,setOpenAdvanced}){
  const [openAddChatbot, setOpenAddChatbot] = useState(false);
  const [chatbotName,setChatbotName] = useState("")
  const [chatbotPrompt,setChatbotPrompt] = useState("")
  const [chatbotRestriction,setChatbotRestriction] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [loadingTitle,setLoadingTitle] = useState('Loading')
  // console.log(selectedChatbot)

  const openWidgetClicked = ()=>{
    setOpenWidget(true)
  }
        const handleClickOpen = () => {
            setOpenAddChatbot(true);
        };

        const handleClose = () => {
            setOpenAddChatbot(false);
        };
        
    const customTheme = createTheme({
        palette: {
          primary: {
            main: "rgb(255, 189, 6)", 
          },
        },
      });
      const autoPromptButtonClicked =()=>{
        setLoadingTitle('Auto Prompt Generation in Progress!')
        setIsLoading(true)
        try{
          authService.generatePrompt((res)=>{
            setChatbotPrompt(res)
            setIsLoading(false)
            setLoadingTitle('Loading')
          },(e)=>{
          },chatbotName)
        }catch(e){
          displayToast.info('please try again')
        }
      }

      useEffect(()=>{
        try{
          setChatbotName(selectedChatbotInfo.name)
          setChatbotPrompt(selectedChatbotInfo.prompt)
          setChatbotRestriction(selectedChatbotInfo.restriction)
        }catch(e){
          setChatbotName("")
          setChatbotPrompt("")
          setChatbotRestriction("")
        }
      },[selectedChatbotInfo])

      const generateChatbot = ()=>{
        if(selectedChatbot===null){
          displayToast.warning('Please create a chatbot first')
        }
        else if(selectedChatbot===-3){
          setLoadingTitle('Chatbot creation in progress!')
          setIsLoading(true)
          chatService.createChatbot((res)=>{
            authService.getAllChatbots((res)=>{
              let list = res.data
              setChatBotList(list)
            },(err)=>{
            })
            setSelectedChatbot(chatbotList[chatbotList.length-1].id)
            setIsLoading(false)
            displayToast.success('Successfully Chatbot Created!')
          },
          (e)=>{
            displayToast.error('Error Occured!')
          },
          {
            prompt:chatbotPrompt,
            restriction:chatbotRestriction,
            chatbotName:selectedChatbotInfo.name,
            description:selectedChatbotInfo.description,
          })
        }else{
          if(selectedChatbotInfo.prompt!==chatbotPrompt||selectedChatbotInfo.restriction!==chatbotRestriction){
            setLoadingTitle('Chatbot updating in progress!')
            setIsLoading(true)
            chatService.updateChatbot((res)=>{
                authService.getAllChatbots((res)=>{
                  let list = res.data
                  setChatBotList(list)
              },(err)=>{
              })
              setSelectedChatbot(chatbotList[chatbotList.length-1].id)
              setTimeout(() => {
                setIsLoading(false)
                displayToast.success('Successfully Chatbot Updated!')
              }, 2000)
            },(e)=>{
              displayToast.error('Error Occured!')
              setIsLoading(false)
            },{id:selectedChatbot,
              prompt:chatbotPrompt,
              restriction:chatbotRestriction,
              chatbotName:selectedChatbotInfo.name,
              description:selectedChatbotInfo.description,})
          }
        }
      }

      const deleteItem = ()=>{
        handleClose()
        setIsLoading(true)
        setLoadingTitle('Deletion in progress!')

        chatService.deleteChatbot((res)=>{
          authService.getAllChatbots((res)=>{
            let list = res.data
            setTimeout(()=>{
              setIsLoading(false)
              setLoadingTitle('')
              displayToast.info('Chatbot deleted',2000)
              setChatBotList(list)
            },1500)
          },(err)=>{
            setIsLoading(false)
            setLoadingTitle('')
          })
          setSelectedChatbot(chatbotList[chatbotList.length-1].id)
        },(e)=>{
            setIsLoading(false)
            setLoadingTitle('')
        },selectedChatbot)
      }

    return (
        <ThemeProvider theme={customTheme}>
        {
          openAdvanced?(<Advanced selectedChatbot={selectedChatbot} setSelectedChatbot={setSelectedChatbot} 
            selectedChatbotInfo ={selectedChatbotInfo} setChatBotList={setChatBotList}
            openAdvanced= {openAdvanced} setOpenAdvanced={setOpenAdvanced}/>):(
            
              openWidget?(
                <Widget apiList={apiList} selectedChatbot={selectedChatbot} chatbotName={chatbotName} setOpenWidget={setOpenWidget}/>
              ):(chatActive? (<ChatBox apiList={apiList} selectedChatbot={selectedChatbot} chatbotName={chatbotName} setChatActive={setChatActive}/>) : (<>
                <div className='chatbotInfo-body'>
                    <div className='chatbotInfo-body-head' style={{borderTopRightRadius:'13px',borderTopLeftRadius:'13px',
                    borderBottom:'solid', borderBottomColor:'rgba(255, 189, 6, 0.849)'}}>
                        <Typography variant='h6' sx={{marginLeft:'30px',color:'rgba(255,255,255,1)',marginBottom:'0', display: 'flex', alignItems: 'center'}}>{chatbotName}</Typography>
                        <div className='chatbotInfo-body-head-buttons'>
                        <Tooltip title="">
                          <Button variant="outlined" onClick={autoPromptButtonClicked}>Auto Prompt</Button>
                        </Tooltip>
                        <Tooltip title="Delete Chatbot">
                          <Button onClick={handleClickOpen} ><DeleteIcon/></Button>
                        </Tooltip>
                        </div>
                    </div>
                    <div className='chatbotInfo-body-container'>
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <div>
                        <TextField
                        className='chatbotInfo-body-container-textfield'
                        id="outlined-multiline-static"
                        label="Base Prompt"
                        multiline
                        rows={7}
                        value= {chatbotPrompt}
                        onChange={(e)=>{
                          setChatbotPrompt(e.target.value)
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton>
                                <AdbIcon sx={{color:'rgba(0,0,0,.8)'}} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        />
        
                        <TextField
                        className='chatbotInfo-body-container-textfield'
                        id="outlined-multiline-static"
                        label="Restrictions for the Chatbot"
                        multiline
                        rows={7}
                        value= {chatbotRestriction}
                        onChange={(e)=>{
                          setChatbotRestriction(e.target.value)
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton>
                                <BlockIcon sx={{color:'rgba(0,0,0,.8)'}} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        />
                    </div>
                    </Box>
                    </div>
                    <div className='chatbotInfo-body-footer'>         
                        <Button variant='contained' size='string' className='chatbotInfo-body-footer-button' onClick={generateChatbot} sx={{marginLeft:'auto'}}><SettingsSuggestIcon sx={{marginRight:'5px',marginBottom:'3px'}}/>Generate Chatbot</Button>
                    </div>       
                </div>
                <LoadingDialog loadingAnimation={isLoading} title={loadingTitle}/>
                <Dialog open={openAddChatbot} onClose={handleClose} sx={{background:'rgba(255,255,255,.6)'}}>
                        <DialogTitle sx={{background:'rgba(0,0,0,0.9)',color:'white',marginBottom:'20px'}} >Convo<span className='sidebar-span-1'>Bot</span></DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this Chatbot?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteItem}>Ok</Button>
                        </DialogActions>
                 </Dialog>
                 </>
                  ))
          )
        } 
        </ThemeProvider>
    )
}