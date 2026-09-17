/**
 * LogIn component for user authentication in a school budget management system.
 * 
 * This component provides a login interface where users can enter their username and user ID.
 * It handles user authentication by dispatching a Redux thunk to verify user credentials,
 * and navigates to different routes based on the user's school symbol.
 * 
 * @component
 * @returns {React.ReactElement} A login form with username and password inputs
 * 
 * @features
 * - Password visibility toggle
 * - Input validation
 * - Error handling for invalid credentials
 * - Responsive design with Material-UI components
 * - Animated login interface
 * 
 * @dependencies
 * - React
 * - Redux
 * - React Router
 * - Material-UI
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { alllUsersThunk, getUserById } from "../../Redux/Slices/Users/getUsersThunk";
import { setUser } from "../../Redux/Slices/Users/userSlice";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Avatar,
  Fade,
  Alert,
  CircularProgress,
  Divider,
  Grow,
  Zoom,
  Icon,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
// import LoginIcon from "@mui/icons-material/Login";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import './logIn.css';

// Animations

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(0,121,107,0.3);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 8px 25px rgba(0,121,107,0.5);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(0,121,107,0.3);
  }
`;


// Styled components
const LoginContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "98vh",
  // background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
  padding: theme.spacing(3),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2300796b' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    zIndex: -1,
  },
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  borderRadius: 24,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  backdropFilter: "blur(10px)",
  background: "rgba(255, 255, 255, 0.95)",
  border: "4px solid rgba(11, 79, 59, 0.3)",
  // transition: "transform 0.3s ease, box-shadow 0.3s ease",
  
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  backgroundColor: "white",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  margin: "0 auto",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(3),
  "& .MuiSvgIcon-root": {
    fontSize: 60,
    color: "#00796b",
  },
}));

const LoginForm = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&.Mui-focused": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00796b",
        borderWidth: "2px",
      },
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#00796b",
  },
  "& .MuiInputLabel-root": {
    fontFamily: 'Rubik, sans-serif',
  },
  "& .MuiInputBase-input": {
    fontFamily: 'Rubik, sans-serif',
    padding: "16px 14px",
  },
}));



const LoginButton = styled(Button)(({ theme }) => ({
  minWidth: 100, // שנה מ-maxWidth ל-minWidth
  width: 'auto', // הוסף זה
  minHeight: 35, // שנה מ-maxHeight ל-minHeight
  height: 'auto', // הוסף זה
  borderRadius: 30,
  padding: "8px 16px",
  fontWeight: 500,
  // textTransform: "none",
  fontSize: "0.95rem",
  fontFamily: 'Rubik, sans-serif',
  background: `linear-gradient(135deg, #00796b 0%, #009688 50%, #004d40 100%)`,
  boxShadow: "0 4px 15px rgba(0,121,107,0.3)",
  // transition: "all 0.3s ease",
  marginTop: theme.spacing(2),
  
  position: "relative",
  overflow: "hidden",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '7px', // רווח בין האייקון לטקסט
  

}));

export const LogIn = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(s => s.user.alllUsers);
  const currUser = useSelector(s => s.user.currUser);

  const getUsers = async () => {
    await dispatch(alllUsersThunk());
  };

  useEffect(() => {
    getUsers();
    // Set mounted to true after a small delay for entrance animation
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };







  const checkUser = async () => {
    debugger
    if (!name.trim() || !id.trim() || !(/^\d+$/.test(id))) {
      setMsg(true);
      return;
    }

    try {
      setLoading(true);
      setMsg(false);

      console.log("לפני קריאה לשרת, id:", id);
      const response = await dispatch(getUserById(id));
      console.log("תשובה מהשרת:", response);

      // בדיקה אם התשובה קיימת בכלל
      if (!response) {
        console.error("לא התקבלה תשובה מהשרת");
        setMsg(true);
        return;
      }

      // בדיקה אם יש payload
      if (!response.payload) {
        console.error("אין payload בתשובה");
        setMsg(true);
        return;
      }

      console.log("Payload:", response.payload);

      // בדיקת שם המשתמש
      if (response.payload.userName === name) {
        dispatch(setUser(response.payload));

        if (response.payload.schoolSymbol === 0) {
          navigate('home');
        } else if (response.payload.schoolSymbol !== 0) {
          navigate('/work');
        }
      } else {
        console.error("שם המשתמש לא תואם");
        setMsg(true);
      }

      setId("");
    } catch (error) {
      console.error("שגיאת התחברות:", error);
      setMsg(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkUser();
    }
  };

  return (

    <LoginContainer maxWidth="xl" sx={{ direction: 'rtl' }}>
      <Zoom in={mounted} timeout={800}>
        <LoginCard elevation={0}>
          <LoginForm>
            <StyledAvatar




              sx={{
                '& .MuiAvatar-img': {  // ← שליטה על התמונה עצמה
                  width: '100%',         // התמונה תתפוס 60% מה-Avatar
                  height: '100%',
                  objectFit: 'contain', // שמירה על יחסי התמונה
                }
              }}
              src="../images/logo.jpg"  // ← נסה עם נקודה
            >

            </StyledAvatar>
            <Grow in={mounted} timeout={1200} style={{ transformOrigin: '0 0 0' }}>
              <StyledTextField
                label="שם משתמש"
                variant="outlined"
                fullWidth
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#00796b" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grow>

            <Grow in={mounted} timeout={1400} style={{ transformOrigin: '0 0 0' }}>
              <StyledTextField
                label="קוד משתמש"
                variant="outlined"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#00796b" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grow>

            {msg && (
              <Fade in={msg}>
                <Alert
                  severity="error"
                  sx={{
                    borderRadius: 12,
                    fontFamily: 'Rubik, sans-serif',
                    animation: `${pulse} 2s infinite ease-in-out`,
                    boxShadow: "0 4px 15px rgba(244,67,54,0.2)",
                  }}
                >
                  שם משתמש או קוד שגויים. נסה שנית.
                </Alert>
              </Fade>
            )}

            <Grow in={mounted} timeout={1600} style={{ transformOrigin: '0 0 0' }}>









              <LoginButton
              sx={{ml:10,mr:10}}
                variant="contained"
                onClick={checkUser}
                disabled={loading}
              >
                {loading ? (
                  <>
                    מתחבר...
                    <CircularProgress size={20} color="inherit" />
                  </>
                ) : (
                  <>
                    התחבר
                    <ExitToAppIcon sx={{
                      transform: 'scaleX(-1)',
                      fontSize: '1.3rem'
                    }} />
                  </>
                )}



              </LoginButton>

            </Grow>

            <Grow in={mounted} timeout={1800} style={{ transformOrigin: '0 0 0' }}>
              <Box sx={{ mt: 3 }}>
                <Divider>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#78909c",
                      fontFamily: 'Rubik, sans-serif',
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <AccountBalanceIcon fontSize="small" />
                    מערכת ניהול תקציב בית ספרי
                  </Typography>
                </Divider>
              </Box>
            </Grow>
          </LoginForm>
        </LoginCard>
      </Zoom>

      <Fade in={mounted} timeout={2000}>
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 4,
            color: "#546e7a",
            fontFamily: 'Rubik, sans-serif',
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          © {new Date().getFullYear()} מערכת ניהול תקציב | כל הזכויות שמורות
        </Typography>
      </Fade>
    </LoginContainer>
  );
};

