// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Box,
//   Avatar,
//   Divider,
//   useMediaQuery,
//   useTheme,
//   Menu,
//   MenuItem,
//   Popover,
//   Paper
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { useDispatch, useSelector } from 'react-redux';
// import MenuIcon from '@mui/icons-material/Menu';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import BusinessIcon from '@mui/icons-material/Business';
// import CategoryIcon from '@mui/icons-material/Category';
// import PeopleIcon from '@mui/icons-material/People';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import EmailIcon from '@mui/icons-material/Email';
// import PersonIcon from '@mui/icons-material/Person';
// import { useNavigate, useLocation } from 'react-router-dom';
// import  resetUser  from '../Redux/Slices/Users/userSlice';

// // Styled components
// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   background: "#f8f9fa",
//   color: '#333',
//   boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//   height: 70,
// }));

// const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   height: 70,
//   padding: theme.spacing(0, 3),
// }));

// const LogoContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   cursor: 'pointer',
//   '& .MuiAvatar-root': {
//     width: 42,
//     height: 42,
//     transition: 'transform 0.3s ease',
//     '&:hover': {
//       transform: 'scale(1.1)',
//     }
//   },
//   '& .MuiTypography-root': {
//     fontSize: '1.3rem',
//     fontWeight: 700,
//     marginLeft: theme.spacing(1.5),
//   }
// }));

// const NavButton = styled(Button)(({ theme }) => ({
//   margin: theme.spacing(0, 1),
//   padding: theme.spacing(1, 2),
//   fontWeight: 600,
//   fontSize: '0.95rem',
//   color: '#555',
//   borderRadius: 0, // שינוי לקו ישר במקום מעוגל
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     transform: 'translateY(-2px)',
//   },
// }));

// const DrawerHeader = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2),
//   justifyContent: 'center',
//   backgroundColor: '#f5f5f5',
//   borderBottom: '1px solid #eaeaea',
// }));

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: 240,
//   flexShrink: 0,
//   '& .MuiDrawer-paper': {
//     width: 240,
//     boxSizing: 'border-box',
//     backgroundColor: '#fff',
//     borderRight: '1px solid #eaeaea',
//   },
// }));

// const UserProfilePopover = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   minWidth: 250,
//   maxWidth: 300,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   gap: theme.spacing(1.5),
// }));

// export const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const location = useLocation();

//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [userProfileAnchorEl, setUserProfileAnchorEl] = useState(null);

//   const currUser = useSelector(s => s.user.currUser);
 
//   // Primary color palette - Teal and Orange accents
//   const colors = {
//     primary: '#00796b', // Teal
//     primaryLight: '#48a999',
//     primaryDark: '#004c40',
//     secondary: '#ff8f00', // Amber/Orange
//     secondaryLight: '#ffc046',
//     secondaryDark: '#c56000',
//     text: '#263238',
//     textLight: '#546e7a',
//   };

//   const navigationOptions = [

//     {
//       title: 'דף הבית',
//       icon: <DashboardIcon />,
//       path: currUser.schoolSymbol == 0 ? '/home' : '/work',
//       color: colors.primary,
//     },
//     {
//       title: 'הוספת הוצאה',
//       icon: <AddCircleOutlineIcon />,
//       path: '/addExpenditure',
//       color: colors.primaryLight,
//     },
//     {
//       title: 'הוצאות',
//       icon: <ListAltIcon />,
//       path: '/expenitures',
//       color: colors.primaryDark,
//     },
    
//     {
//       title: 'ספקים',
//       icon: <BusinessIcon />,
//       path: '/suppliers',
//       color: colors.secondary,
//     },
//     {
//       title: 'קטגוריות',
//       icon: <CategoryIcon />,
//       path: '/categories',
//       color: colors.secondaryLight,
//     },
//     {
//       title: 'משתמשים',
//       icon: <PeopleIcon />,
//       path: '/users',
//       color: colors.secondaryDark,
//     },
//     currUser.schoolSymbol === 0&& {
//       title: 'ניהול הוצאות',
//       icon: <AddCircleOutlineIcon />,
//       path: '/schools',
//       color: colors.secondary,
//     },


//   ];

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleUserProfileOpen = (event) => {
//     setUserProfileAnchorEl(event.currentTarget);
//   };
// const handleLogout = () => {
//   debugger
//   // כאן תוסיף לוגיקת התנתקות
//   dispatch(resetUser())
//     navigate('/');

//   handleUserProfileClose();
// };
//   const handleUserProfileClose = () => {
//     setUserProfileAnchorEl(null);
//   };

//   const handleNavigate = (path) => {
//     navigate(path);
//     if (isMobile) {
//       setDrawerOpen(false);
//     }
//     handleMenuClose();
//   };

//   const drawer = (
//     <>
//       <Divider />
//       <List>
//         {navigationOptions.map((option, index) => (
//           <ListItem
//             button
//             key={index}
//             onClick={() => handleNavigate(option.path)}
//             sx={{
//               borderRight: location.pathname === option.path ? `4px solid ${option.color}` : 'none',
//               backgroundColor: location.pathname === option.path ? `${option.color}10` : 'transparent',
//             }}
//           >
//             <ListItemIcon sx={{ color: option.color }}>
//               {option.icon}
//             </ListItemIcon>
//             <ListItemText
//               primary={option.title}
//               primaryTypographyProps={{ fontWeight: location.pathname === option.path ? 700 : 500 }}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </>
//   );

//   return (
//     <>
//       <StyledAppBar position="fixed">
//         <StyledToolbar>
//           {isMobile ? (
//             <>
//               <IconButton
//                 edge="start"
//                 color="inherit"
//                 aria-label="menu"
//                 onClick={toggleDrawer}
//                 sx={{ mr: 1 }}
//               >
//                 <MenuIcon />
//               </IconButton>

//             </>
//           ) : (
//             <>

//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Avatar
//                   sx={{
//                     bgcolor: colors.secondary,
//                     width: 35,
//                     height: 35,
//                     cursor: 'pointer'
//                   }}
//                   onClick={handleUserProfileOpen}
//                 >
//                   <AccountCircleIcon />
//                 </Avatar>
//               </Box>
//               <Box sx={{ flexGrow: 1, display: 'flex' }}>
//                 {/* הצגת כל האפשרויות בתפריט העליון - כולל קטגוריות ומשתמשים */}
//                 {navigationOptions.map((option, index) => (
//                   <NavButton
//                     key={index}
                    
//                     onClick={() => handleNavigate(option.path)}
//                     sx={{
//                       marginRight: 5,
//                       borderTop: location.pathname === option.path ? `3px solid ${option.color}` : 'none',
//                       color: location.pathname === option.path ? option.color : '#555',
//                     }}
                    
//                   >
//                     {option.title}
//                   </NavButton>
//                 ))}
//               </Box>
//             </>
//           )}

//           <Box
//             component="img"
//             src={`${process.env.PUBLIC_URL}/images/logo.jpg`} // גישה ישירה לתמונה
//             alt="סמל המוסד"
//             sx={{
//               width: 142, // או כל גודל שתרצה
//               height:"auto",
//               objectFit: 5, // רווח מהאייקון של הפרופיל
//             }}
//           />
//         </StyledToolbar>
//       </StyledAppBar>

//       <StyledDrawer
//         variant="temporary"
//         anchor="right"
//         open={drawerOpen}
//         onClose={toggleDrawer}
//       >
//         {drawer}
//       </StyledDrawer>

//       {/* פופאפ פרטי משתמש */}
//       <Popover
//         open={Boolean(userProfileAnchorEl)}
//         anchorEl={userProfileAnchorEl}
//         onClose={handleUserProfileClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//       >

//         <UserProfilePopover>
//           <Avatar
//             sx={{
//               bgcolor: colors.primary,
//               width: 60,
//               height: 60,
//             }}
//           >
//             <PersonIcon sx={{ fontSize: 40 }} />
//           </Avatar>

//           <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center' }}>
//             {currUser?.userName || 'משתמש'}
//           </Typography>

          

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <PeopleIcon fontSize="small" color="action" />
//             <Typography variant="body2">
//               {currUser?.role === 1 ? 'מנהל' : 'משתמש רגיל'}
//             </Typography>
//           </Box>

//           <Divider sx={{ width: '100%', my: 1 }} />

//           <Button
//             variant="outlined"
          
//             size="small"
//             onClick={handleUserProfileClose}
//             fullWidth
//           >
//             סגור
//           </Button>
//           <Box sx={{ display: 'flex', gap: 1 }}>
  

//   <Button
//     variant="contained"
//     size="small"
//     startIcon={<LogoutIcon />}
//     onClick={handleLogout}
//     sx={{
//       bgcolor: colors.primary,
//       color: "white",
//       width: '50%',
//       borderRadius: 20,
//       textTransform: "none",
//       fontWeight: 600,
//       fontFamily: 'Rubik, sans-serif',
//       flex: 1,
//       '&:hover': {
//         bgcolor: colors.secondaryDark,
//       }
//     }}
//   >
//     התנתקות
//   </Button>
// </Box>
//         </UserProfilePopover>
//       </Popover>

//       {/* Add toolbar spacing to prevent content from hiding under the AppBar */}
//       <Toolbar />
//     </>
//   );
// };

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Popover,
  Paper,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';
import {resetUser} from '../Redux/Slices/Users/userSlice';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  color: '#263238',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  height: 80,
  borderBottom: '1px solid rgba(0, 121, 107, 0.1)',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 80,
  padding: theme.spacing(0, 4),
  justifyContent: 'space-between',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& img': {
    height: 50,
    width: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    }
  }
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0, 0.5),
  padding: theme.spacing(1.5, 2.5),
  fontWeight: 600,
  fontSize: '0.95rem',
  fontFamily: 'Rubik, sans-serif',
  color: active ? '#00796b' : '#546e7a',
  borderRadius: '12px',
  position: 'relative',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  minHeight: '44px',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: active ? '80%' : '0%',
    height: '3px',
    backgroundColor: '#00796b',
    borderRadius: '2px 2px 0 0',
    transition: 'width 0.3s ease',
  },
  
  '&:hover': {
    backgroundColor: 'rgba(0, 121, 107, 0.08)',
    transform: 'translateY(-2px)',
    color: '#00796b',
    '&::before': {
      width: '80%',
    }
  },
}));

const UserProfileButton = styled(IconButton)(({ theme }) => ({
  padding: '8px',
  borderRadius: '12px',
  backgroundColor: 'rgba(0, 121, 107, 0.1)',
  border: '2px solid rgba(0, 121, 107, 0.2)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: 'rgba(0, 121, 107, 0.15)',
    borderColor: 'rgba(0, 121, 107, 0.3)',
    transform: 'scale(1.05)',
  },
  
  '& .MuiAvatar-root': {
    width: 40,
    height: 40,
    backgroundColor: '#00796b',
    fontSize: '1.2rem',
    fontWeight: 600,
  }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 280,
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    borderRight: '1px solid rgba(0, 121, 107, 0.1)',
    boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3, 2),
  backgroundColor: 'rgba(0, 121, 107, 0.05)',
  borderBottom: '1px solid rgba(0, 121, 107, 0.1)',
  
  '& img': {
    height: 60,
    width: 'auto',
    borderRadius: '8px',
    marginBottom: theme.spacing(1),
  }
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  backgroundColor: active ? 'rgba(0, 121, 107, 0.1)' : 'transparent',
  borderRight: active ? '4px solid #00796b' : '4px solid transparent',
  
  '&:hover': {
    backgroundColor: 'rgba(0, 121, 107, 0.08)',
    transform: 'translateX(-4px)',
  },
  
  '& .MuiListItemIcon-root': {
    color: active ? '#00796b' : '#546e7a',
    minWidth: '40px',
    transition: 'color 0.3s ease',
  },
  
  '& .MuiListItemText-primary': {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: active ? 600 : 500,
    color: active ? '#00796b' : '#263238',
  }
}));

const UserProfileCard = styled(Card)(({ theme }) => ({
  minWidth: 280,
  maxWidth: 320,
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  border: '1px solid rgba(0, 121, 107, 0.1)',
  overflow: 'hidden',
}));

const UserProfileHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00796b 0%, #004d40 100%)',
  padding: theme.spacing(3),
  textAlign: 'center',
  color: 'white',
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1, 2),
  fontFamily: 'Rubik, sans-serif',
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: '#ff5722',
  color: 'white',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: '#e64a19',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(255, 87, 34, 0.3)',
  }
}));

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userProfileAnchorEl, setUserProfileAnchorEl] = useState(null);

  const currUser = useSelector(s => s.user.currUser);

  const colors = {
    primary: '#00796b',
    primaryLight: '#48a999',
    primaryDark: '#004c40',
    secondary: '#ff8f00',
    secondaryLight: '#ffc046',
    secondaryDark: '#c56000',
    text: '#263238',
    textLight: '#546e7a',
  };

  const navigationOptions = [
    {
      title: 'דף הבית',
      icon: <DashboardIcon />,
      path: currUser.schoolSymbol == 0 ? '/home' : '/work',
      color: colors.primary,
    },
    {
      title: 'הוספת הוצאה',
      icon: <AddCircleOutlineIcon />,
      path: '/addExpenditure',
      color: colors.primaryLight,
    },
    {
      title: 'הוצאות',
      icon: <ListAltIcon />,
      path: '/expenitures',
      color: colors.primaryDark,
    },
    {
      title: 'ספקים',
      icon: <BusinessIcon />,
      path: '/suppliers',
      color: colors.secondary,
    },
    {
      title: 'קטגוריות',
      icon: <CategoryIcon />,
      path: '/categories',
      color: colors.secondaryLight,
    },
    {
      title: 'משתמשים',
      icon: <PeopleIcon />,
      path: '/users',
      color: colors.secondaryDark,
    },
    currUser.schoolSymbol === 0 && {
      title: 'ניהול הוצאות',
      icon: <AddCircleOutlineIcon />,
      path: '/schools',
      color: colors.secondary,
    },
  ].filter(Boolean);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserProfileOpen = (event) => {
    setUserProfileAnchorEl(event.currentTarget);
  };

  const handleUserProfileClose = () => {
    setUserProfileAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(resetUser());
    navigate('/');
    handleUserProfileClose();
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const drawer = (
    <>
      <DrawerHeader>
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
          alt="סמל המוסד"
        />
        <Typography variant="h6" sx={{ 
          fontFamily: 'Rubik, sans-serif', 
          fontWeight: 600,
          color: colors.primary,
          textAlign: 'center'
        }}>
          מערכת ניהול הוצאות
        </Typography>
      </DrawerHeader>
      
      <List sx={{ padding: theme.spacing(1, 0) }}>
        {navigationOptions.map((option, index) => (
          <StyledListItem
            button
            key={index}
            active={location.pathname === option.path}
            onClick={() => handleNavigate(option.path)}
          >
            <ListItemIcon>
              {option.icon}
            </ListItemIcon>
            <ListItemText primary={option.title} />
          </StyledListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ 
                  mr: 2,
                  backgroundColor: 'rgba(0, 121, 107, 0.1)',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 121, 107, 0.15)',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              
              <LogoContainer>
                <Box
                  component="img"
                  src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
                  alt="סמל המוסד"
                />
              </LogoContainer>
              
              <UserProfileButton onClick={handleUserProfileOpen}>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </UserProfileButton>
            </>
          ) : (
            <>
              <LogoContainer>
                <Box
                  component="img"
                  src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
                  alt="סמל המוסד"
                />
              </LogoContainer>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {navigationOptions.map((option, index) => (
                  <NavButton
                    key={index}
                    active={location.pathname === option.path}
                    onClick={() => handleNavigate(option.path)}
                  >
                    {option.title}
                  </NavButton>
                ))}
              </Box>

              <UserProfileButton onClick={handleUserProfileOpen}>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </UserProfileButton>
            </>
          )}
        </StyledToolbar>
      </StyledAppBar>

      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {drawer}
      </StyledDrawer>

      {/* User Profile Popover */}
      <Popover
        open={Boolean(userProfileAnchorEl)}
        anchorEl={userProfileAnchorEl}
        onClose={handleUserProfileClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { borderRadius: '16px', overflow: 'visible' }
        }}
      >
        <UserProfileCard>
          <UserProfileHeader>
            <Avatar
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                width: 64,
                height: 64,
                margin: '0 auto 16px',
                fontSize: '2rem',
                border: '3px solid rgba(255,255,255,0.3)',
              }}
            >
              <PersonIcon sx={{ fontSize: '2rem' }} />
            </Avatar>
            
            <Typography variant="h6" sx={{ 
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 700,
              marginBottom: '4px'
            }}>
              {currUser?.userName || 'משתמש'}
            </Typography>
            
            <Typography variant="body2" sx={{ 
              opacity: 0.9,
              fontFamily: 'Rubik, sans-serif'
            }}>
              {currUser?.role === 1 ? 'מנהל מערכת' : 'משתמש רגיל'}
            </Typography>
          </UserProfileHeader>

          <CardContent sx={{ padding: '24px' }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              alignItems: 'center'
            }}>
              {/* User Info */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                padding: '12px 16px',
                backgroundColor: 'rgba(0, 121, 107, 0.05)',
                borderRadius: '12px',
                width: '100%',
                justifyContent: 'center'
              }}>
                <PeopleIcon fontSize="small" sx={{ color: colors.primary }} />
                <Typography variant="body2" sx={{ 
                  fontFamily: 'Rubik, sans-serif',
                  fontWeight: 500,
                  color: colors.text
                }}>
                  {currUser?.schoolSymbol === 0 ? 'מנהל כללי' : `מוסד ${currUser?.schoolSymbol}`}
                </Typography>
              </Box>

              <Divider sx={{ width: '100%', margin: '8px 0' }} />

              {/* Action Buttons */}
              <Box sx={{ 
                display: 'flex', 
                gap: 1.5,
                width: '100%'
              }}>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={handleUserProfileClose}
                  sx={{
                    flex: 1,
                    borderRadius: '12px',
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderColor: "white",
                    color: colors.primary,
                    '&:hover': {
                      borderColor: colors.primaryDark,
                      backgroundColor: 'rgba(0, 121, 107, 0.04)',
                    }
                  }}
                >
                  סגור
                </Button>

                <LogoutButton
                  size="medium"
                  startIcon={<LogoutIcon sx={{ml:0.5}}/>}
                  onClick={handleLogout}
                  sx={{ flex: 1 ,color:colors.primaryDark,bgcolor:"white", '&:hover': { bgcolor: colors.primaryDark, color: 'white' }}}
                >
                  התנתק
                </LogoutButton>
              </Box>
            </Box>
          </CardContent>
        </UserProfileCard>
      </Popover>

      {/* Toolbar Spacer */}
      <Box sx={{ height: '80px' }} />
    </>
  );
};
