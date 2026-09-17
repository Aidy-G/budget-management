import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './home.css';

import { allCategoriesThunk } from "../../Redux/Slices/Categories/getCategoriesThunk";
import { allSupplierThunk } from "../../Redux/Slices/Suplliers/getSupplierThunk";
import { allUsersThunk } from "../../Redux/Slices/Users/getUsersThunk";
import { allSchoolsThunk } from "../../Redux/Slices/Schools/getSchoolThunk";

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
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
import { CardMedia } from "@mui/material";

// Styled components with updated theme - IDENTICAL to main.jsx
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#f8f9fa",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(4),
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: "center",
  padding: theme.spacing(1, 0),
  background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(247,247,247,0.5) 100%)",
  borderRadius: 16,
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 16,
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  border: "1px solid #e0e0e0",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
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
    boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
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

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const schools = useSelector(s => s.school?.allSchools || []);
  const categories = useSelector(s => s.category?.allCategories || []);
  const suppliers = useSelector(s => s.supplier?.allSuppliers || []);
  const users = useSelector(s => s.user?.allUsers || []);
  const currUser = useSelector(s => s.user?.currUser || {});

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

  // Updated color palette with muted amber/orange - IDENTICAL to main.jsx
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

  // Navigation options for admin
  const navigationOptions = [
    {
      title: "ניהול מוסדות",
      description: "צפייה וניהול של מוסדות במערכת",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: colors.secondaryLight,
      path: "/schools",
      gradient: `linear-gradient(135deg, ${colors.secondaryLight}30 0%, ${colors.secondaryLight}30 100%)`,
    },
    {
      title: "ניהול ספקים",
      description: "צפייה וניהול של ספקים",
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      color: colors.secondary,
      path: "/suppliers",
      gradient: `linear-gradient(135deg, ${colors.secondary}20 0%, ${colors.secondaryLight}20 100%)`,

    },
    {
      title: "ניהול קטגוריות",
      description: "צפייה וניהול של קטגוריות הוצאה",
      icon: <CategoryIcon sx={{ fontSize: 40 }} />,
      color: colors.secondaryDark,
      path: "/categories",
      gradient: `linear-gradient(135deg, ${colors.secondaryDark}25 0%, ${colors.secondaryDark}25 100%)`,

    },
    {
      title: "ניהול משתמשים",
      description: "צפייה וניהול של משתמשי המערכת",
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: colors.secondaryDark,
      path: "/users",
      gradient: `linear-gradient(135deg, ${colors.secondaryDark}25 0%, ${colors.secondaryDark}25 100%)`,
    },
    {
      title: "דוחות וסטטיסטיקות",
      description: "צפייה בדוחות מרוכזים מכל המוסדות",
      icon: <BarChartIcon sx={{ fontSize: 40 }} />,
      color: colors.secondary,
      path: "/reports",
      gradient: `linear-gradient(135deg, ${colors.secondary}20 0%, ${colors.secondaryLight}20 100%)`,

    },
    {
      title: "הגדרות מערכת",
      description: "הגדרות והתאמות אישיות למערכת",
      icon: <SettingsIcon sx={{ fontSize: 40 }} />,
      color: colors.secondaryLight,
      path: "/settings",
      gradient: `linear-gradient(135deg, ${colors.secondaryLight}30 0%, ${colors.secondaryLight}30 100%)`,

    },
  ];

  return (
    <PageContainer>
      <ContentContainer maxWidth="lg">
        {/* Welcome Section with gradient background - IDENTICAL to main.jsx */}
        <WelcomeSection>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>



            <Typography
              sx={{
                fontSize: "1.9rem",
                fontWeight: 400,
                color: colors.text,
                mt: 0.1,
                mb: 1.5,
              }}
            >
              מערכת ניהול המוסדות
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: colors.textLight,
                textAlign: "center",
                fontWeight: 500,
                maxWidth: 800,
                mx: "auto",
                mb: 4
              }}
            >
              {currUser?.name ? `${currUser.name}, ` : ""}
              כאן תוכל לנהל את כל המוסדות, המשתמשים, הספקים והקטגוריות במערכת
            </Typography>

            {/* Quick Actions with swapped positions */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mt: 5, mb: 0.5 }}>
              <ActionButton
                variant="outlined"
                startIcon={<ListAltIcon sx={{ pl: 1 }} />}
                sx={{

                  width: 250,
                  borderColor: colors.primary,
                  color: colors.primary,
                  "&:hover": {
                    borderColor: colors.primaryDark,
                    bgcolor: `${colors.primary}10`,
                  },
                }}
                onClick={() => navigate("/schools")}
              >
                צפייה במוסדות
              </ActionButton>
              <ActionButton
                variant="contained"
                startIcon={<AddCircleOutlineIcon sx={{ pl: 1 }} />}
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
                onClick={() => navigate("/addSchool")}
              >
                הוספת מוסד חדש
              </ActionButton>
            </Box>
          </Box>
        </WelcomeSection>

        {/* Tabs Section with updated colors - IDENTICAL to main.jsx */}
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

        {/* Tab Panels with updated styling - IDENTICAL to main.jsx */}
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
                    {/* Decorative header instead of image */}
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
                          pb: 1
                        }}
                      >
                        {option.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textLight,
                          textAlign: "center",
                          flexGrow: 1
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
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: colors.text,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <TrendingUpIcon sx={{ color: colors.primary }} />
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
                    <SchoolIcon sx={{ color: colors.primary, fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>
                    {schools?.length || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textLight }}>
                    מוסדות
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
                    <PeopleIcon sx={{ color: colors.secondary, fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: colors.secondary, mb: 1 }}>
                    {users?.length || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textLight }}>
                    משתמשים
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
                    <BusinessIcon sx={{ color: colors.accent, fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: colors.accent, mb: 1 }}>
                    {suppliers?.length || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textLight }}>
                    ספקים
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
                    <CategoryIcon sx={{ color: colors.info, fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: colors.info, mb: 1 }}>
                    {categories?.length || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textLight }}>
                    קטגוריות
                  </Typography>
                </StatsCard>
              </Grid>
            </Grid>
          </Box>

          {/* Schools Overview Section */}
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: colors.text,
                mb: 3,
                mt: 10,
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <SchoolIcon sx={{ color: colors.primary }} />
              מוסדות במערכת
            </Typography>

            {schools && schools.length > 0 ? (
              <Grid container spacing={3}>
                {schools.slice(0, 6).map((school, index) => (
                  <Grid item xs={12} sm={6} md={4} key={school.id || index}>
                    <Card sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      border: `1px solid ${colors.border}`,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      },
                    }}>
                      <CardActionArea onClick={() => navigate(`/school/${school.schoolSymbol}`)}>
                        <Box sx={{
                          height: 8,
                          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                        }} />
                        <CardContent>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: `${colors.primary}15`,
                                color: colors.primary,
                                mr: 2
                              }}
                            >
                              <SchoolIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.text }}>
                                {school.schoolName || `מוסד ${index + 1}`}
                              </Typography>
                              <Typography variant="body2" sx={{ color: colors.textLight }}>
                                סמל מוסד: {school.schoolSymbol || `00${index + 1}`}
                              </Typography>
                            </Box>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box sx={{ textAlign: "center" }}>
                                <Typography variant="body2" sx={{ color: colors.textLight }}>
                                  תקציב
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary }}>
                                  {school.budget ? `${school.budget.toLocaleString()} ₪` : "לא הוגדר"}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ textAlign: "center" }}>
                                <Typography variant="body2" sx={{ color: colors.textLight }}>
                                  הוצאות
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: colors.secondary }}>
                                  {school.expenditures ? `${school.expenditures.length}` : "0"}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  border: `1px solid ${colors.border}`,
                }}
              >
                <SchoolIcon sx={{ fontSize: 60, color: `${colors.primary}40`, mb: 2 }} />
                <Typography variant="h6" sx={{ color: colors.textLight, mb: 2 }}>
                  לא נמצאו מוסדות במערכת
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    bgcolor: colors.accent,
                    color: "white",
                    "&:hover": {
                      bgcolor: colors.accentDark,
                    },
                    borderRadius: 8,
                  }}
                  onClick={() => navigate("/addSchool")}
                >
                  הוספת מוסד חדש
                </Button>
              </Paper>
            )}

            {schools && schools.length > 6 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    borderRadius: 30,
                    px: 4,
                  }}
                  onClick={() => navigate("/schools")}
                >
                  צפייה בכל המוסדות
                </Button>
              </Box>
            )}
          </Box>
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
                gap: 1
              }}
            >
              <ReceiptIcon sx={{ color: colors.primary }} />
              פעילות אחרונה במערכת
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
                <ReceiptIcon sx={{ fontSize: 60, color: `${colors.primary}40`, mb: 2 }} />
                <Typography variant="h6" sx={{ color: colors.textLight, mb: 2 }}>
                  פעילות אחרונה תוצג כאן
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    borderRadius: 8,
                    px: 3,
                  }}
                  onClick={() => navigate("/activity")}
                >
                  צפייה בכל הפעילויות
                </Button>
              </Box>
            </Paper>
          </Box>
        </TabPanel>

        {/* Quick Actions Section */}
        {/* <Box sx={{ mt: 6, mb: 3 }}>
          <Divider sx={{ mb: 4 }}>
            <Chip
              label="פעולות מהירות"
              sx={{
                px: 2,
                fontWeight: 600,
                bgcolor: `${colors.primary}10`,
                color: colors.primary,
              }}
            />
          </Divider>

          <Grid container spacing={2} justifyContent="center">
            {[
              { icon: <AddCircleOutlineIcon />, label: "הוספת הוצאה", path: "/addExpenditure", color: colors.primary },
              { icon: <PeopleIcon />, label: "הוספת משתמש", path: "/addUser", color: colors.secondary },
              { icon: <BusinessIcon />, label: "הוספת ספק", path: "/addSupplier", color: colors.accent },
              { icon: <SchoolIcon />, label: "הוספת מוסד", path: "/addSchool", color: colors.info },
              { icon: <ReceiptIcon />, label: "הוצאות", path: "/expenitures", color: colors.primary },
              { icon: <SettingsIcon />, label: "הגדרות", path: "/settings", color: colors.textLight }
            ].map((item, index) => (
              <Grid item key={index}>
                <Button
                  variant="outlined"
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderColor: `${item.color}50`,
                    color: item.color,
                    borderRadius: 8,
                    px: 2,
                    py: 1,
                    "&:hover": {
                      borderColor: item.color,
                      bgcolor: `${item.color}10`,
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box> */}

        {/* Footer Section */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body2" sx={{ color: colors.textLight }}>
            © {new Date().getFullYear()} מערכת ניהול תקציבים | כל הזכויות שמורות
          </Typography>
        </Box>
      </ContentContainer>
    </PageContainer>
  );
};


