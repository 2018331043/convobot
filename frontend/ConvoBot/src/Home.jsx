import Typography from '@mui/material/Typography';
import logo from '../src/assets/bot.png'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import './styling/Home.css'

export default function Home(){
    return (
        <>
            <div className='home-body'>
                <div className='home-body-first'>
                    <div className='home-body-first-left'>
                        <img src={logo} alt='logo'/>
                        <Typography className='home-body-first-left-name'>Convo<span className='home-span-1'>Bot</span></Typography>
                    </div>
                    <div className='home-body-first-right'>
                        <Button variant="text" className='home-body-first-right-button-1'>Sign in</Button>
                        <Button variant="outlined" className='home-body-first-right-button-1'>Sign up</Button>
                    </div>
                </div>
                <div className='home-body-second'>
                    <div  className='home-body-second-left'>
                    <Typography className='home-body-second-left-title'>Elevate Business Operations with <span className='home-span-1'>AI Chatbots</span></Typography>
                    </div>
                    <div className='home-body-second-right'>

                    </div>
                </div>
            </div>
        </>
    )
}