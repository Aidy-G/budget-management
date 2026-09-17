// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   TextField,
//   Grid,
//   InputAdornment,
//   Button,
//   Box,
//   Typography,
//   Divider,
//   CircularProgress,
//   IconButton,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import CategoryIcon from "@mui/icons-material/Category";
// import SaveIcon from "@mui/icons-material/Save";
// import CloseIcon from "@mui/icons-material/Close";
// import { addSchoolThunk } from "../../Redux/Slices/Schools/schoolThunk";

// // Styled components
// const StyledTextField = styled(TextField)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   "& .MuiOutlinedInput-root": {
//     borderRadius: 8,
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#00796b",
//     },
//   },
//   "& .MuiInputLabel-root.Mui-focused": {
//     color: "#00796b",
//   },
//   "& .MuiInputLabel-root": {
//     fontFamily: 'Rubik, sans-serif',
//   },
//   "& .MuiInputBase-input": {
//     fontFamily: 'Rubik, sans-serif',
//   },
// }));

// const FormButton = styled(Button)(({ theme }) => ({
//   borderRadius: 30,
//   padding: "10px 24px",
//   fontWeight: 700,
//   textTransform: "none",
//   fontSize: "0.9rem",
//   fontFamily: 'Rubik, sans-serif',
//   boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
//   },
// }));

// export const AddSchool = (props) => {
//   const setAddScl = props.setAddScl;
//   const dispatch = useDispatch();
  
//   // Colors based on your theme
//   const colors = {
//     primary: "#00796b", // Teal
//     primaryLight: "#48a999",
//     primaryDark: "#004c40",
//     secondary: "#ff5722", // Deep Orange
//     secondaryLight: "#ff8a50",
//     secondaryDark: "#c41c00",
//     text: "#263238",
//     textLight: "#546e7a",
//     background: "#f5f5f5",
//     card: "#ffffff",
//     border: "#e0e0e0",
//   };
  
//   const [newScl, setNewScl] = useState({
//     schoolSymbol: 0,schoolName: '',budget: '0',
//   });
  
//   const [loading, setLoading] = useState(false);
  
//   const addCategory = async() => {
//     if (!newScl.scholName) {
//       return;
//     }
    
//     try {
//       setLoading(true);
//       await dispatch(addSchoolThunk(newScl));
      
//       if (setNewScl) {
//         setNewScl(false);
//       }
//     } catch (error) {
//       console.error("Error adding category:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography 
//           variant="h6" 
//           sx={{ 
//             fontWeight: 700, 
//             color: colors.text,
//             fontFamily: 'Rubik, sans-serif',
//           }}
//         >
//           פרטי קטגוריה
//         </Typography>
        
//         {setAddScl && (
//           <IconButton 
//             onClick={() => setAddScl(false)}
//             sx={{ color: colors.textLight }}
//           >
//             <CloseIcon />
//           </IconButton>
//         )}
//       </Box>
      
//       <Divider sx={{ mb: 3 }} />
      
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <StyledTextField
//             fullWidth
//             label="שם מוסד"
//             variant="outlined"
//             value={newScl.scholName}
//             onChange={(i) => setAddScl({ ...newScl, schoolName: i.target.value })}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <CategoryIcon sx={{ color: colors.primary }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
        
//         <Grid item xs={12} sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//           <FormButton
//             variant="contained"
//             onClick={addCategory}
//             disabled={loading}
//             startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
//             sx={{
//               bgcolor: colors.primary,
//               color: "white",
//               "&:hover": {
//                 bgcolor: colors.primaryDark,
//               },
//             }}
//           >
//             {loading ? "שומר..." : "לאישור"}
//           </FormButton>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };









// 
// גרסא שניה

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Avatar,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import SaveIcon from "@mui/icons-material/Save";
import NumbersIcon from "@mui/icons-material/Numbers";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfoIcon from "@mui/icons-material/Info";
import { addSchoolThunk } from "../../Redux/Slices/Schools/schoolThunk";
import { useNavigate } from "react-router-dom";

// Styled components
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

const FormCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  border: "1px solid #e0e0e0",
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
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

export const AddSchool = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Institution color palette - Teal and Orange accents
  const colors = {
    primary: "#00796b", // Teal
    primaryLight: "#48a999",
    primaryDark: "#004c40",
    secondary: "#115293", // Deep Orange
    secondaryLight: "#ff8a50",
    secondaryDark: "#c41c00",
    text: "#263238",
    textLight: "#546e7a",
    background: "#f5f5f5",
    card: "#ffffff",
    border: "#e0e0e0",
    success: "#4caf50",
    warning: "#ff9800",
    error: "#f44336",
    info: "#2196f3",
  };

  // Local state
  const [schoolDetails, setSchoolDetails] = useState({
    schoolSymbol: '',
    schoolName: '',
    budget: '',
  });
  
  const [errors, setErrors] = useState({
    schoolSymbol: false,
    schoolName: false,
    budget: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Handle input change and clear errors when field is filled
  const handleInputChange = (field, value) => {
    setSchoolDetails(prev => ({ ...prev, [field]: value }));
    if (value && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };
  
  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      schoolName: !schoolDetails.schoolName.trim(),
      schoolSymbol: !schoolDetails.schoolSymbol || isNaN(schoolDetails.schoolSymbol) || parseInt(schoolDetails.schoolSymbol) <= 0,
      budget: schoolDetails.budget && (isNaN(schoolDetails.budget) || parseFloat(schoolDetails.budget) < 0)
    };
    
    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error);
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    await addSchool();
  };
  
  // Add school to the system
  const addSchool = async () => {
    try {
      setLoading(true);
      
      const newSchool = {
        schoolSymbol: parseInt(schoolDetails.schoolSymbol),
        schoolName: schoolDetails.schoolName,
        budget: schoolDetails.budget ? parseFloat(schoolDetails.budget) : 0,
      };
      
      await dispatch(addSchoolThunk(newSchool));
      
      setSuccess(true);
      
      // Reset form after successful submission
      setSchoolDetails({
        schoolSymbol: '',
        schoolName: '',
        budget: '',
      });
      
    } catch (error) {
      console.error("Error adding school:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle success message close
  const handleSuccessClose = () => {
    setSuccess(false);
    navigate("/home");
  };

  return (
    <PageContainer sx={{direction: "rtl"}}>
      <ContentContainer maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: `${colors.primary}15`,
                color: colors.primary,
                width: 55,
                height: 55,
                mr: 2,
                ml:3
              }}
            >
              <AddCircleOutlineIcon sx={{ fontSize: 29 }} />
            </Avatar>
            <Box >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: colors.text,
                }}
              >
                הוספת מוסד חדש
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.textLight,
                  fontFamily: 'Rubik, sans-serif',
                }}
              >
                הזן את פרטי המוסד החדש
              </Typography>
            </Box>
          </Box>
          <ActionButton
            variant="outlined"
            sx={{
              borderColor: colors.primary,
              color: colors.primary,
              "&:hover": {
                borderColor: colors.primaryDark,
                bgcolor: `${colors.primary}10`,
              },
              fontFamily: 'Rubik, sans-serif',
            }}
            onClick={() => navigate(-1)}
          >
            חזרה
            <ArrowBackIcon sx={{ fontSize: 19, marginRight: "7px" }}/>
          </ActionButton>
        </Box>

        {/* Form Card */}
        <FormCard>
          <FormSection>
            <Grid container spacing={3}>
              {/* School Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="שם מוסד"
                  variant="outlined"
                  value={schoolDetails.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  error={errors.schoolName}
                  helperText={errors.schoolName ? "יש להזין שם מוסד" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon sx={{ color: colors.primary }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary,
                    },
                    "& .MuiInputLabel-root": {
                      fontFamily: 'Rubik, sans-serif',
                    },
                    "& .MuiInputBase-input": {
                      fontFamily: 'Rubik, sans-serif',
                    },
                  }}
                />
              </Grid>

              {/* School Symbol */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="סמל מוסד"
                  variant="outlined"
                  type="number"
                  value={schoolDetails.schoolSymbol}
                  onChange={(e) => handleInputChange('schoolSymbol', e.target.value)}
                  error={errors.schoolSymbol}
                  helperText={errors.schoolSymbol ? "יש להזין סמל מוסד תקין (מספר חיובי)" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <NumbersIcon sx={{ color: colors.primary }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary,
                    },
                    "& .MuiInputLabel-root": {
                      fontFamily: 'Rubik, sans-serif',
                    },
                    "& .MuiInputBase-input": {
                      fontFamily: 'Rubik, sans-serif',
                    },
                  }}
                />
              </Grid>

              {/* Budget */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="תקציב כללי"
                  variant="outlined"
                  type="number"
                  value={schoolDetails.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  error={errors.budget}
                  helperText={errors.budget ? "יש להזין תקציב תקין (מספר חיובי)" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBalanceWalletIcon sx={{ color: colors.primary }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary,
                    },
                    "& .MuiInputLabel-root": {
                      fontFamily: 'Rubik, sans-serif',
                    },
                    "& .MuiInputBase-input": {
                      fontFamily: 'Rubik, sans-serif',
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <ActionButton
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddCircleOutlineIcon sx={{marginLeft:"10px"}}/>}
                sx={{
                  bgcolor: colors.primary,
                  color: "white",
                  minWidth: 200,
                  "&:hover": {
                    bgcolor: colors.primaryDark,
                  },
                  fontFamily: 'Rubik, sans-serif',
                }}
                onClick={handleSubmit}
              >
                {loading ? "מוסיף מוסד..." :"לאישור"}
              </ActionButton>
            </Box>
          </FormSection>
        </FormCard>

        {/* Information Card */}
        <Box sx={{ mt: 4 }}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: `1px dashed ${colors.primary}`,
              bgcolor: `${colors.primary}08`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.text, mb: 1, fontFamily: 'Rubik, sans-serif' }}>
              <InfoIcon sx={{ verticalAlign: "middle", mr: 1, color: colors.primary }} />
              מידע חשוב
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
              • סמל המוסד חייב להיות מספר חיובי ייחודי
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
              • שם המוסד הוא שדה חובה
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
              • התקציב הכללי הוא שדה אופציונלי (ברירת מחדל: 0)
            </Typography>
          </Card>
        </Box>

        {/* Success Snackbar */}
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleSuccessClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSuccessClose}
            severity="success"
            variant="filled"
            sx={{
              width: '100%', borderRadius: 2, fontFamily: 'Rubik, sans-serif',
              backgroundColor: 'white', // רקע לבן
              border: '2px solid black', // מסגרת שחורה
              color: 'black', // טקסט שחור
              '& .MuiAlert-icon': {
                color: colors.success
              }, // צבע האייקון
            }}
          >
            המוסד נוסף בהצלחה!
          </Alert>
        </Snackbar>
      </ContentContainer>
    </PageContainer>
  );
};
