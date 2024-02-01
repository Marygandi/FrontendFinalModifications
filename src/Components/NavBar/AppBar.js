import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import { useNavigate } from "react-router-dom";



function ResponsiveAppBar({ isLoggedIn,handleLogout,role }) {

  let pages = ["Home", "Surveys", "Create Survey", "Survey Reports"];
  const settings = ["Profile", "Logout"];
  const mainmenu = ["Home", "Login", "Register"];


  if(role=='admin'){
    pages=["Home", "Surveys","Surveys List", "Create Survey", "Survey Reports"];
  }
  else 
  if(role=='user'){
    pages=["Home", "Surveys"];
  }


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  console.log('ResponsiveAppBar',isLoggedIn)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (value) => {
    if (value === "Create Survey") {
      navigate("/create-survey");
    }
    if (value === "Home") {
      navigate("/home");
    }
    if (value === "Surveys") {
      navigate("/surveys");
    }
    if (value === "Survey Reports") {
      navigate("/survey-reports");
    }
    if (value === "Profile") {
      navigate("/Profile");
    }
    if (value === "Login") {
      navigate("/login");
    }
    if (value === "Register") {
      navigate("/register");
    }

     if(value==="Surveys List"){

       navigate("/surveyslist")
     }
    // if(value==="SurveyEditComponent"){

    //      navigate("/SurveyEditComponent")
    //    }
   
    if(value==="Logout"){
      handleLogout()
    }
   
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{background:'darkcyan',color:'##FF8C40',fontSize:'2rem'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <QuestionAnswerRoundedIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
         <QuestionAnswerRoundedIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <b style={{cursor:"pointer"}}>Feedback</b>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
           {anchorElNav &&  <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <div className="menu-container">
              {isLoggedIn
                ? pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))
                : mainmenu.map((page) => (
                    <MenuItem
                      key={page}
                      style={{color:'orange'}}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}

              </div>
              
            </Menu> }
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
          <QuestionAnswerRoundedIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <b style={{cursor:"pointer"}}>Feedback</b>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {isLoggedIn
                ? pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))
                : mainmenu.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
          </Box>
          
          {isLoggedIn
                && 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
           {  anchorElUser 
           && 
           <Menu
           sx={{ mt: "45px" }}
           id="menu-appbar"
           anchorEl={anchorElUser}
           anchorOrigin={{
             vertical: "top",
             horizontal: "right",
           }}
           keepMounted
           transformOrigin={{
             vertical: "top",
             horizontal: "right",
           }}
           open={Boolean(anchorElUser)}
           onClose={handleCloseUserMenu}
         >
           {settings.map((setting) => (
             <MenuItem key={setting} onClick={()=>handleCloseNavMenu(setting)}>
               <Typography textAlign="center">{setting}</Typography>
             </MenuItem>
           ))}
         </Menu>
           } 
          </Box>
        }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
