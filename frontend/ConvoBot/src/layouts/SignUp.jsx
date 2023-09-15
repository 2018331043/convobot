import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styling/SignUp.css'
import { useState,useEffect } from 'react';
import axios from 'axios'

// http://localhost:8080/convobot/api/v1/register
// private String userName;
// private String email;
// private String password;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        convobot
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(255, 189, 6)", // Change this to your desired color
      },
      // You can also customize other colors like secondary, error, etc.
    },
  });

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(data.get('email')!==''&&data.get('password')!==''&& firstName!==''&&lastName!==''){
      let x = {
        userName: firstName + " " + lastName,
        email: data.get('email'),
        password: data.get('password'),
      }
      setUserData(userData => ({
        ...userData,...x
      }))
      console.log(userData)
    }else{
      // console.log("wow!")
    }
    // console.log({
    //   userName: firstName + " " + lastName,
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    
  };

  const [userData,setUserData] = useState({})
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")

  const onFirstNameChange = (e)=>{
    setFirstName(e.target.value)
  }

  const onLastNameChange = (e)=>{
    setLastName(e.target.value)
  }

  useEffect(()=>{
    try{
      axios.post('http://localhost:8080/convobot/api/v1/register',
        {
          userName:userData.userName,
          email:userData.email,
          password:userData.password,
        })
        .then((res)=>{
          console.log(res)
        })
        .catch(
          (e)=>{
            console.log(e)
          }
        )
      }catch(err){
      console.log(err)
    }
  },[userData])


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            borderRadius: 2,
          px: 4,
          py: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'rgb(255, 189, 6)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onFirstNameChange}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                onChange={onLastNameChange}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./signin" variant="body2" sx={{color:'rgba(1,1,1,0.7)', textDecorationColor:'rgba(1,1,1,0.7)'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}