import { useState } from "react";

import "./RegisterUser.css";
import axios from "axios";
import "./Styles.css";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function Register() {
  const roles = ["User", "Admin"];
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [role, setRole] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const checkUserData = () => {
    if (username === "") {
      setUsernameError("Username cannot be empty");
      return false;
    }

    if (email === "") {
      return false;
    }

    if (password === "" || repassword === "") {
      return false;
    }

    if (password !== repassword) {
      return false;
    }

    if (role === "Select Role") {
      return false;
    }

    return true;
  };

  const signUp = (event) => {
    event.preventDefault();
    const isValidData = checkUserData();

    if (!isValidData) {
      alert("Please check your data");
      return;
    }

    axios
      .post("http://localhost:5095/api/Customer/Register", {
        username: username,
        email: email,
        role: "user",
        password: password,
      })
      .then((response) => {
        // Handle success, e.g., redirect to login page
        console.log(response.data);
        alert("Registration successful! Redirect to login.");
      })
      .catch((error) => {
        // Handle error, e.g., display an error message
        console.error(error);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <form className="registerForm">
      {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square> */}
      <Box
        sx={{
          // my: 8,
          // mx: 4,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main", mt: 2 }}></Avatar>
        {/* <Typography component="h1" variant="h5" className='main-container-heading'> */}
        <div
          style={{
            margin: "0",
            fontFamily: "Roboto Helvetica Arial sans-serif",
            fontWeight: "400",
            fontSize: "1.5rem",
            lineHeight: "1.334",
            letterSpacing: "0em",
          }}
        ></div>
        Register
        {/* </Typography> */}
          <div className="registrationForm-container">
          <label className="form-control">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        {/* <label className="alert alert-danger">{usernameError}</label> */}
        <label className="form-control">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label className="form-control">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label className="form-control">Re-Type Password</label>
        <input
          type="password"
          className="form-control"
          value={repassword}
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
        />
        {/* <label className="form-control">Role</label>
        <select
          className="form-select"
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option value="select">Select Role</option>
          {roles.map((r) => (
            <option value={r} key={r}>
              {r}
            </option>
          ))}
        </select> */}
        <br />
        <button className="btn btn-primary button" onClick={signUp}>
          Sign Up
        </button>
        <button
          className="btn btn-danger button"
          onClick={() => {
            /* Handle cancel action */
          }}
        >
          Cancel
        </button>
          </div>
      </Box>
      {/* </Grid> */}
    </form>
  );
}

export default Register;
