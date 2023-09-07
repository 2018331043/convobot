import '../styling/components/Sidebar.css'
import logo from '../assets/bot.png'
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ChatName from './ChatName';

export default function Sidebar(){
    return (
        <div className="sidebar-body">
            <div className='sidebar-body-title'>
                <img src={logo} alt='logo'/>
                <Typography className='sidebar-body-title-name'>Convo<span className='sidebar-span-1'>Bot</span></Typography>
            </div>
            <div className='sidebar-body-chats'>
                <Typography className='sidebar-body-chats-title'>ALL CHATBOTS</Typography>
                <div className='sidebar-body-chats-container'>
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                    <ChatName name={"Education Chatbot"} />
                </div>
                <div className='sidebar-body-addchat'>
                <Button variant="outlined" sx={{borderWidth:'1px'}} className='sidebar-body-addchat-button'>Add a Chatbot <AddIcon sx={{marginBottom:'1px',marginLeft:'5px'}}/></Button>
                </div>
            </div>
        </div>
    )
}