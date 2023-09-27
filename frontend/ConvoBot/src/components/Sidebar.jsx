import '../styling/components/Sidebar.css'
// import { useState } from 'react';
import logo from '../assets/bot.png'
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ChatName from './ChatName';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, forwardRef, useEffect, useCallback} from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import authService from '../services/auth.service';
import { useParams } from 'react-router-dom';
import displayToast from '../services/toast.service';
import chatService from "../services/chat.service";
import apiKeyService from "../services/api.key.service";

export default function Sidebar({chatActive,setChatActive,selectedChatbot,setSelectedChatbot,setSelectedChatbotInfo,
    chatbotList,setChatBotList,openWidget,setOpenWidget,openAdvanced,setOpenAdvanced}){
    const [openAddChatbot, setOpenAddChatbot] = useState(false);
    
    const [newChatbotName,setNewChatbotName] = useState("")
    const [newChatbotDescription,setNewChatbotDescription] = useState("")
    const [tempChatName,setTempChatName] = useState('')
    const [tempChatDes,setTempChatDes] = useState('') 
    const {userId} = useParams()

        const handleClickOpen = () => {
            setOpenAddChatbot(true);
        };

        const handleClose = () => {
            setOpenAddChatbot(false);
        };
        const newChatbotButtonClicked = ()=>{
            console.log(chatbotList)
            if(newChatbotName!==""&&newChatbotDescription!==""){
                // console.log(newChatbotName)
                // console.log(newChatbotDescription)
                setChatBotList(chatbotList.filter(item=>item.id!==-3))
                handleClose()
                setTempChatName(newChatbotName)
                setTempChatDes(newChatbotDescription)
                let item = {
                    restriction: `Do not answer any questions out of the topic.\n\nBe brief and  precise with your answers\n\nIf anyone asks question out of the topic, you respond saying something like "Sorry I can't help you with that"`,
                    description:newChatbotDescription,
                    id:-3,
                    name:newChatbotName,
                    ownerId:userId,
                    prompt:'- Write a base prompt for your chatbot.',

                }
                setChatActive(false)
                setOpenWidget(false)
                setOpenAdvanced(false)
                setSelectedChatbot(item.id)
                setSelectedChatbotInfo(item)
                setNewChatbotName('')
                setNewChatbotDescription('')
                setChatBotList(array=>[...array,item])
                displayToast.warning('Generate a Chatbot, otherwise it will be removed from the sidebar later.',5000)
            }
        }

        const customTheme = createTheme({
            palette: {
              primary: {
                main: "rgb(255, 189, 6)", // Change this to your desired color
                // main: "rgb(0,0,0,.9)",
              },
              // You can also customize other colors like secondary, error, etc.
            },
          });

          const itemClicked = useCallback((item) => {
            // console.log(item);
            setOpenAdvanced((false))
            setChatActive(false)
            setSelectedChatbot(item.id)
            setSelectedChatbotInfo(item)
            setOpenWidget(false)
            setOpenAdvanced(false)
          }, [setSelectedChatbot,openWidget,chatActive]);

        //   const itemClicked = useCallback((id)=>{
        //     console.log(id)
        //     // props.setSelectedChatbot(id)
        //   },[])
        useEffect(()=>{
            // console.log(chatbotList)
            try{
                let x = chatbotList[chatbotList.length - 1]
                setSelectedChatbot(x.id)
                setSelectedChatbotInfo(x)
            }catch(e){

            }
        },[chatbotList])

          useEffect(()=>{
            authService.getAllChatbots((res)=>{
                let list = res.data
                setChatBotList(list)
            },(err)=>{
                // console.log(err)
            })

          },[])
    return (
        <div className="sidebar-body">
            <div className='sidebar-body-title'>
                <img src={logo} alt='logo'/>
                <Typography className='sidebar-body-title-name'>Convo<span className='sidebar-span-1'>Bot</span></Typography>
            </div>
            <div className='sidebar-body-chats'>
                <Typography className='sidebar-body-chats-title'>ALL CHATBOTS</Typography>
                <div className='sidebar-body-chats-container'>
                    {/* {
                        tempChatName!==''&&tempChatDes!==''?(
                            <ChatName name={tempChatName} />
                        ):null
                    } */}
                    {
                        chatbotList.map(item =>{
                            return (
                                <ChatName backStyle={item.id===selectedChatbot?1:0} key={item.id} onClick={()=>itemClicked(item)} name={item.name} /> 
                            )
                        })
                    }
                </div>
                <div className='sidebar-body-addchat'>
                <Button variant="outlined" sx={{borderWidth:'1px'}} onClick={handleClickOpen} className='sidebar-body-addchat-button'>Add a Chatbot <AddIcon sx={{marginBottom:'1px',marginLeft:'5px'}}/></Button>
                </div>
            </div>
            <ThemeProvider theme={customTheme}>
            <Dialog open={openAddChatbot} onClose={handleClose} sx={{background:'rgba(255,255,255,.6)'}}>
                <DialogTitle sx={{zIndex:'1000',background:'rgba(0,0,0,0.9)',color:'white',marginBottom:'20px'}} >Convo<span className='sidebar-span-1'>Bot</span></DialogTitle>
                <DialogContent>
                <DialogContentText sx={{marginBottom:'10px'}}> 
                    Let us know about your chatbot.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    multiline
                    fullWidth
                    minRows={1}
                    maxRows={1}
                    defaultValue=""
                    inputProps={{ maxLength: 25 }}
                    onChange={(e)=>{
                        setNewChatbotName(e.target.value)
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Short Description"
                    multiline
                    fullWidth
                    minRows={4}
                    maxRows={4}
                    defaultValue=""
                    onChange={(e)=>{
                        setNewChatbotDescription(e.target.value)
                    }}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={newChatbotButtonClicked}>Confirm</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        </div>
    )
}