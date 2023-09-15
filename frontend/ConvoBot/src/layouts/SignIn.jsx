import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from "@mui/material/Container";
import '../styling/SignIn.css'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import authService from "../services/Auth.Service";
import localStorageService from '../services/LocalStorageService'


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
  

export default function SignIn() {
    const customTheme = createTheme({
        palette: {
          primary: {
            main: "rgb(255, 189, 6)", // Change this to your desired color
          },
          // You can also customize other colors like secondary, error, etc.
        },
      });


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // })
    let emailData = data.get('email')
    let passwordData = data.get('password')
    if(emailData!==null&&passwordData!==null){
      authService.signIn((res)=>{
        console.log(res)
        let token = res.data.token
        let userName = res.data.userName
        localStorageService.setToken(token)
        localStorageService.setUserInfo({user:userName,email:emailData,password:passwordData})
         window.location.replace('./dashboard')
      },(err)=>{
        console.log(err)
      },{email:emailData,password:passwordData})
    }
  };

  return (
    <ThemeProvider theme={customTheme}>

    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'rgb(255, 189, 6)' }}>
            <LockOutlinedIcon />
          </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button className="signin-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{color:'rgba(1,1,1,0.7)', textDecorationColor:'rgba(1,1,1,0.7)'}}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="./signup" variant="body2" sx={{color:'rgba(1,1,1,0.7)', textDecorationColor:'rgba(1,1,1,0.7)'}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    </ThemeProvider>
  )
}