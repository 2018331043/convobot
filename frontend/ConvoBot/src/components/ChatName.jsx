import '../styling/components/ChatName.css'
import logo from '../assets/chatbot.png'
import { Typography } from '@mui/material'

export default function ChatName(props){
    return (
        <div className="chatname-body">
            <img src={logo} alt='chatname-logo'/>
            <Typography className='chatname-body-text'>{props.name}</Typography>
        </div>
    )
}