import Typography from '@mui/material/Typography';
import logo from '../assets/bot.png'
import Button from '@mui/material/Button';
import '../styling/Home.css'
import { useEffect, useState } from 'react';

export default function Home(){
    const signUpButtonClicked = ()=>{
        window.location.assign('/signup')
    }
    const signInButtonClicked = ()=>{
        window.location.assign('/signin')
    }

    return (
        <>
            <div className='home-body'>
                <div className='home-body-first'>
                    <div className='home-body-first-left'>
                        <img src={logo} alt='logo'/>
                        <Typography className='home-body-first-left-name'>Convo<span className='home-span-1'>Bot</span></Typography>
                    </div>
                    <div className='home-body-first-right'>
                        <Button variant="text" onClick={signInButtonClicked} className='home-body-first-right-button-1'>Sign in</Button>
                        <Button variant="outlined" onClick={signUpButtonClicked} className='home-body-first-right-button-1'>Sign up</Button>
                    </div>
                </div>
                <div className='home-body-second'>
                    <div  className='home-body-second-left'>
                        <div>
                        <Typography className='home-body-second-left-title'>Elevate Business Operations </Typography>
                        <Typography className='home-body-second-left-title'>with <span className='home-span-1'>AI Chatbots</span></Typography>
                        </div>
                    </div>
                    <div className='home-body-second-right'>

                    </div>
                </div>
            </div>
        </>
    )
}