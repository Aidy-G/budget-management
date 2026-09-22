          





import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './main.css';

import { allCategoriesThunk } from "../../Redux/Slices/Categories/getCategoriesThunk";
import { allSupplierThunk } from "../../Redux/Slices/Suplliers/getSupplierThunk";
import { allUsersThunk } from "../../Redux/Slices/Users/getUsersThunk";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Avatar,
  useTheme,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Tabs,
  Tab,
  Divider,
  IconButton,
  CardMedia
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolDashboard from "./SchoolDashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useEffect, useState } from "react";
import { allSchoolsThunk } from "../../Redux/Slices/Schools/getSchoolThunk";

// Styled components with updated theme
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#f8f9fa",
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(4),
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: "center",
  padding: theme.spacing(4, 0),
  borderRadius: 16,
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 12,
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  border: "1px solid #e0e0e0",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 20px rgba(0,121,107,0.1)",
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  background: "#fff",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #e0e0e0",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0,121,107,0.08)",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: "10px 24px",
  fontWeight: 700,
  textTransform: "none",
  fontSize: "1rem",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  fontFamily: 'Rubik, sans-serif',
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

export const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const schools = useSelector(s => s.school?.allSchools || []);  
  const categories = useSelector(s => s.category?.allCategories || []);
  const suppliers = useSelector(s => s.supplier?.allSuppliers || []);
  const users = useSelector(s => s.user?.allUsers || []);
  const currUser = useSelector(s => s.user?.currUser || {});
  const userSymbol = currUser?.schoolSymbol ?? currUser?.institutionId ?? currUser?.schoolId;
  const isAdmin = String(userSymbol) === '0' || Number(userSymbol) === 0;

  const getData = async () => {
    await dispatch(allSchoolsThunk());
    await dispatch(allCategoriesThunk());
    await dispatch(allSupplierThunk());
    await dispatch(allUsersThunk());
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Updated color palette with site colors
  const colors = {
    primary: "#00796b", // Main teal/green color
    primaryLight: "#48a999",
    primaryDark: "#004c40",
    secondary: "#0288d1", // Blue
    secondaryLight: "#5e88ff",
    secondaryDark: "#005b9f",
    accent: "#ff9800", // Orange for accent
    accentLight: "#ffc",//947
    accentDark: "#c66900",
    text: "#263238",
    textLight: "#546e7a",
    background: "#ffffff",
    card: "#ffffff",
    border: "#e0e0e0",
    success: "#4caf50",
    warning: "#ff9800",
    error: "#f44336",
    info: "#2196f3",
  };

  // Navigation options with updated colors
  const navigationOptions = [
    {
      title: "ניהול ספקים",
      description: "צפייה וניהול של ספקים",
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      color: colors.secondaryLight,
      path: "/suppliers",
      gradient: `linear-gradient(135deg, ${colors.secondaryLight}30 0%, ${colors.secondaryLight}30 100%)`,
    },
    {
      title: "ניהול קטגוריות",
      description: "צפייה וניהול של קטגוריות הוצאה",
      icon: <CategoryIcon sx={{ fontSize: 40 }} />,
      color: colors.secondary,
      path: "/categories",
      gradient: `linear-gradient(135deg, ${colors.secondary}20 0%, ${colors.secondaryLight}20 100%)`,
    },
    {
      title: "ניהול משתמשים",
      description: "צפייה וניהול של משתמשי המערכת",
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: colors.secondaryDark,
      path: "/users",
      gradient: `linear-gradient(135deg, ${colors.secondaryDark}25 0%, ${colors.secondaryDark}25 100%)`,
    },
  ];

  return (
    <PageContainer>
      <ContentContainer maxWidth="lg">
        {/* Welcome Section with gradient background */}
        <WelcomeSection>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          
            <Typography
              // variant="h3"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 400,
                color: colors.text,
               
                mb: 2,
              }}
            >
               מערכת ניהול הוצאות
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: colors.textLight,
                textAlign: "center",
                fontWeight: 500,
                maxWidth: 800,
                mx: "auto",
                mb: 4,
                // fontFamily: 'Rubik, sans-serif',
              }}
            >    {currUser?.userName ? `${currUser.userName}, ` : ""}
          
              כאן תוכל לנהל את כל ההוצאות, הספקים והקטגוריות של המוסד שלך
            </Typography>
            
            {/* Quick Actions with swapped positions */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mb: 4 }}>
              <ActionButton
                variant="outlined"
                startIcon={<ListAltIcon sx={{marginLeft: "0.5rem" }} />}
                sx={{
                  width: 250,
                  borderColor: colors.primary,
                  color: colors.primary,
                  "&:hover": {
                    borderColor: colors.primaryDark,
                    bgcolor: `${colors.primary}10`,
                  },
                }}
                onClick={() => navigate("/expenitures")}
              >
                צפייה בהוצאות
              </ActionButton>
              <ActionButton
                variant="contained"
                startIcon={<AddCircleOutlineIcon sx={{marginLeft: "0.5rem" }} />}
                sx={{
                  bgcolor: `${colors.primary}25`,
                  
                  color: colors.primary,
                  borderColor: colors.primary,
                  width: 250,
                  "&:hover": {
                    borderColor: colors.primaryDark,
                    bgcolor: `${colors.primary}10`,
                    
                  },
                }}
                onClick={() => navigate("/addExpenditure")}
              >
                הוספת הוצאה חדשה
              </ActionButton>
              {/* הלוח מוצג תחת הטאב 'נתונים וסטטיסטיקות' - כפתור הוסר */}
            </Box>
          </Box>
        </WelcomeSection>

        {/* Tabs Section with updated colors */}
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: "divider", 
          mb: 3,
          borderRadius: "8px 8px 0 0",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              background: "#ffffff",
              "& .MuiTab-root": {
                fontWeight: 700,
                fontSize: "1rem",
                color: colors.textLight,
                py: 2,
                fontFamily: 'Rubik, sans-serif',
                "&.Mui-selected": {
                  color: colors.primary,
                }
              },
              "& .MuiTabs-indicator": {
                backgroundColor: colors.primary,
                height: 3,
              }
            }}
          >
            <Tab label="ניהול מערכת" />
            <Tab label="נתונים וסטטיסטיקות" />
            <Tab label="פעילות אחרונה" />
          </Tabs>
        </Box>

        {/* Tab Panels with updated styling */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {navigationOptions.map((option, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard sx={{ 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  border: `1px solid ${option.color}40`,
                  height: "100%"
                }}>
                  <CardActionArea 
                    onClick={() => navigate(option.path)}
                    sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                  >
                    {/* Decorative header */}
                    <Box
                      sx={{
                        height: 80,
                        width: "100%",
                        background: option.gradient,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottom: `1px solid ${option.color}30`,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: option.color,
                          width: 60,
                          height: 60,
                          boxShadow: `0 4px 8px ${option.color}40`,
                        }}
                      >
                        {option.icon}
                      </Avatar>
                    </Box>
                    <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700, 
                          color: colors.text,
                          mb: 2,
                          textAlign: "center",
                          borderBottom: `2px solid ${option.color}40`,
                          pb: 1,
                          fontFamily: 'Rubik, sans-serif',
                        }}
                      >
                        {option.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: colors.textLight,
                          textAlign: "center",
                          flexGrow: 1,
                          fontFamily: 'Rubik, sans-serif',
                        }}
                      >
                        {option.description}
                      </Typography>
                      <Box 
                        sx={{ 
                          mt: 2, 
                          display: "flex", 
                          justifyContent: "center" 
                        }}
                      >
                        <Chip
                          label="לחץ לניהול"
                          size="small"
                          sx={{
                            bgcolor: `${option.color}15`,
                            color: option.color,
                            fontWeight: 600,
                            border: `1px solid ${option.color}40`,
                            fontFamily: 'Rubik, sans-serif',
                          }}
                        />
                      </Box>
                    </CardContent>
                    </CardActionArea>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {userSymbol && !isAdmin ? (
            <SchoolDashboard symbol={userSymbol} />
          ) : (
            <>
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700, 
                    color: colors.text, 
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontFamily: 'Rubik, sans-serif',
                  }}
                >
                  <BarChartIcon sx={{ color: colors.primary }} />
                  סטטיסטיקות מערכת
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                      <Avatar
                        sx={{
                          bgcolor: `${colors.primary}15`,
                          width: 60,
                          height: 60,
                          mb: 2,
                        }}
                      >
                        <CategoryIcon sx={{ color: colors.primary, fontSize: 30 }} />
                      </Avatar>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: colors.primary, mb: 1, fontFamily: 'Rubik, sans-serif' }}>
                        {categories?.length || 0}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
                        קטגוריות
                      </Typography>
                    </StatsCard>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                      <Avatar
                        sx={{
                          bgcolor: `${colors.secondary}15`,
                          width: 60,
                          height: 60,
                          mb: 2,
                        }}
                      >
                        <BusinessIcon sx={{ color: colors.secondary, fontSize: 30 }} />
                      </Avatar>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: colors.secondary, mb: 1, fontFamily: 'Rubik, sans-serif' }}>
                        {suppliers?.length || 0}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
                        ספקים
                      </Typography>
                    </StatsCard>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                      <Avatar
                        sx={{
                          bgcolor: `${colors.accent}15`,
                          width: 60,
                          height: 60,
                          mb: 2,
                        }}
                      >
                        <PeopleIcon sx={{ color: colors.accent, fontSize: 30 }} />
                      </Avatar>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: colors.accent, mb: 1, fontFamily: 'Rubik, sans-serif' }}>
                        {users?.length || 0}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
                        משתמשים
                      </Typography>
                    </StatsCard>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                      <Avatar
                        sx={{
                          bgcolor: `${colors.info}15`,
                          width: 60,
                          height: 60,
                          mb: 2,
                        }}
                      >
                        <SchoolIcon sx={{ color: colors.info, fontSize: 30 }} />
                      </Avatar>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: colors.info, mb: 1, fontFamily: 'Rubik, sans-serif' }}>
                        {new Set(users?.map(user => user.schoolSymbol)).size || 0}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
                        מוסדות
                      </Typography>
                    </StatsCard>
                  </Grid>
                </Grid>
              </Box>

              {/* Expenditure Trends Section */}
              <Box sx={{ mt: 5 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700, 
                    color: colors.text, 
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontFamily: 'Rubik, sans-serif',
                    mt:10
                  }}
                >
                  <TrendingUpIcon sx={{ color: colors.primary }} />
                  מגמות הוצאות
                </Typography>

                <Paper 
                  sx={{ 
                    p: 3, 
                    borderRadius: 3, 
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    border: `1px solid ${colors.border}`,
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(to bottom, ${colors.card}, ${colors.card})`,
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <BarChartIcon sx={{ fontSize: 60, color: `${colors.primary}40`, mb: 2 }} />
                    <Typography variant="h6" sx={{ color: colors.textLight, mb: 2, fontFamily: 'Rubik, sans-serif' }}>
                      נתוני הוצאות יוצגו כאן
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        borderColor: colors.primary, 
                        color: colors.primary,
                        borderRadius: 8,
                        px: 3,
                        fontFamily: 'Rubik, sans-serif',
                      }}
                    >
                      צפייה בדוחות
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                color: colors.text, 
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontFamily: 'Rubik, sans-serif',
              }}
            >
              <ReceiptIcon sx={{ color: colors.primary }} />
              פעילות אחרונה במערכת
            </Typography>
            
            <Paper 
              sx={{ 
                borderRadius: 3, 
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                border: `1px solid ${colors.border}`,
              }}
            >
              {/* Activity List - Placeholder */}
              {[1, 2, 3, 4, 5].map((item, index) => (
                <React.Fragment key={index}>
                  <Box 
                    sx={{ 
                      p: 2, 
                      display: "flex", 
                      alignItems: "center",
                      gap: 2,
                      bgcolor: index % 2 === 0 ? `${colors.primary}05` : colors.card,
                      transition: "background-color 0.2s",
                      "&:hover": {
                        bgcolor: `${colors.primary}10`,
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: `${colors.primary}15`, 
                        color: colors.primary,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <ReceiptIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: colors.text, fontFamily: 'Rubik, sans-serif' }}>
                        {["הוספת הוצאה חדשה", "עדכון פרטי ספק", "הוספת קטגוריה", "אישור תשלום", "עדכון תקציב"][index]}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
                        {`לפני ${[2, 5, 12, 18, 24][index]} שעות`}
                      </Typography>
                    </Box>
                    <Chip 
                      label={["הוצאה", "ספק", "קטגוריה", "תשלום", "תקציב"][index]} 
                      size="small"
                      sx={{ 
                        bgcolor: [
                          `${colors.primary}15`, 
                          `${colors.secondary}15`, 
                          `${colors.accent}15`,
                          `${colors.success}15`,
                          `${colors.info}15`
                        ][index],
                        color: [
                          colors.primary, 
                          colors.secondary, 
                          colors.accent,
                          colors.success,
                          colors.info
                        ][index],
                        fontWeight: 600,
                        fontFamily: 'Rubik, sans-serif',
                      }}
                    />
                  </Box>
                  {index < 4 && <Divider />}
                </React.Fragment>
              ))}
            </Paper>
            
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button 
                variant="outlined"
                sx={{ 
                  borderColor: colors.primary, 
                  color: colors.primary,
                  borderRadius: 30,
                  px: 4,
                  fontFamily: 'Rubik, sans-serif',
                }}
              >
                צפייה בכל הפעילויות
              </Button>
            </Box>
          </Box>
        </TabPanel>

        
        <Box sx={{ mt: 6, mb: 3 ,textAlign: 'center'}}>
          <Divider sx={{ mb: 4 ,background:colors.accentLight  }} />
          
                                 
                                 <Typography variant="body2" sx={{ color: colors.textLight }}>
                                   © {new Date().getFullYear()} מערכת ניהול תקציבים | כל הזכויות שמורות
                                 </Typography>
                               </Box>
        
      </ContentContainer>
    </PageContainer>
  );
};


