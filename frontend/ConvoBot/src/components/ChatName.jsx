import '../styling/components/ChatName.css'
import logo from '../assets/chatbot.png'
import { Typography } from '@mui/material'

export default function ChatName({backStyle,name,onClick}){
    const selectedStyle = {
        background: 'rgba(255, 255, 255, 0.233)'
    }
    return (
        <div style={backStyle?selectedStyle:null} className="chatname-body" onClick={onClick}>
            <img src={logo} alt='chatname-logo'/>
            <Typography className='chatname-body-text'>{name}</Typography>
        </div>
    )
}