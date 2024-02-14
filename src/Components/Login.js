import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import "./Styles.css";
import TextField from "@mui/material/TextField";
//import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
//import TextField from '@mui/material/TextField';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      marginTop='5px'
      marginBottom='5px'
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [role, setRole] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const validateUserData = () => {
    if (username === "") {
      setUsernameError("Username cannot be empty");
      return false;
    }

    // if (email === "") {
    //   setEmailError("Email cannot be empty");
    //   return false;
    // } else if (!isValidEmail(email)) {
    //   setEmailError("Invalid email format");
    //   return false;
    // }

    if (password === "") {
      return false;
    }

    // if (role === "") {
    //   return false;
    // }

    return true;
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const loginUser = (event) => {
    event.preventDefault();
    const isValidData = validateUserData();

    if (!isValidData) {
      alert("Please check your data");
      return;
    }
    role="user";
    if (username === "mary"){
        role="admin";
    }
    else {
      role ="user";
  }
    axios
      .post("http://localhost:5095/api/Customer/Login", {
        username: username,
        email: email,
        password: password,
        role: role,
      })
      .then((userData) => {
        const currentUser=userData.data;   
        const {token}=currentUser;  
        localStorage.setItem("currentuser",JSON.stringify(currentUser))
        localStorage.setItem("token",token)
        onLogin(); // Call the parent component's callback on successful login
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          backgroundColor: "white",
        }}
        noValidate
        autoComplete="off"
      >
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                {/* <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                /> */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {/* <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="role"
                  label="Role"
                  type="role"
                  id="role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                /> */}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={loginUser}
                >
                  LogIn
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 2, mb: 2 }} />
          </Container>
        </ThemeProvider>
      </Box>
     
    </>
  );
}

export default Login;
