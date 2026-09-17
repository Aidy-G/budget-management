

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategoryThunk, updateCategoryThunk } from "../../Redux/Slices/Categories/categoryThunk";
import {
  TextField,
  Grid,
  InputAdornment,
  Button,
  Box,
  Typography,
  Divider,
  CircularProgress,
  IconButton,
  Avatar,
  FormHelperText
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CategoryIcon from "@mui/icons-material/Category";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { allCategoriesThunk } from "../../Redux/Slices/Categories/getCategoriesThunk";

// Styled components
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00796b",
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
  },
}));

const FormButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: "10px 24px",
  fontWeight: 700,
  textTransform: "none",
  fontSize: "0.9rem",
  fontFamily: 'Rubik, sans-serif',
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({

  padding: "10px 24px",
  fontWeight: 800,
  textTransform: "none",
  fontSize: "1rem",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
  },
}));

export const AddCategory = (props) => {
  const setAddCtgr = props.setAddCtgr;
  const addCtgr = props.addCtgr;
  const selectedCategory = props.selectedCategory;
  const dispatch = useDispatch();

  // Colors based on your theme
  const colors = {
    primary: "#00796b", // Teal
    primaryLight: "#48a999",
    primaryDark: "#004c40",
    secondary: "#ff5722", // Deep Orange
    secondaryLight: "#ff8a50",
    secondaryDark: "#c41c00",
    text: "#263238",
    textLight: "#546e7a",
    background: "#f5f5f5",
    card: "#ffffff",
    border: "#e0e0e0",
    error: "#f44336"
  };

  // אתחול ה-state המקומי עם ערכי הקטגוריה הנבחרת אם קיימת
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    id: null
  });

  // עדכון ה-state המקומי כאשר selectedCategory משתנה
  useEffect(() => {
    if (selectedCategory) {
      setNewCategory({
        categoryName: selectedCategory.categoryName || '',
        id: selectedCategory.id || null
      });
    }
  }, [selectedCategory]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCategoryNameChange = (e) => {
    setNewCategory({ ...newCategory, categoryName: e.target.value });
    if (error) {
      setError(false);
    }
  };

  const validateForm = () => {
    if (!newCategory.categoryName.trim()) {
      setError(true);
      return false;
    }
    return true;
  };

  const saveCategory = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      if (selectedCategory && selectedCategory.categoryId) {
        await dispatch(updateCategoryThunk({
          category: {
            categoryName: newCategory.categoryName.trim(),
          },
          categoryId: selectedCategory.categoryId,
        }));
      } else {
        await dispatch(addCategoryThunk({
          categoryName: newCategory.categoryName.trim(),
        }));
      }

      if (setAddCtgr) {
        setAddCtgr(false);
      }
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
      await dispatch(allCategoriesThunk());
    }
  };

  const resetForm = () => {
    debugger
    setNewCategory({ categoryName: '', id: null });
    setError(false);
    
      setAddCtgr(false);
    
  };

  // קביעת כותרת הדיאלוג בהתאם למצב (הוספה או עריכה)
  const dialogTitle = selectedCategory ? "עריכת קטגוריה" : "הוספת קטגוריה חדשה";
  const dialogSubtitle = selectedCategory ? "שנה את פרטי הקטגוריה" : "הזן את פרטי הקטגוריה החדשה";
  const buttonText = selectedCategory ? "עדכן" : "לאישור";
  const dialogIcon = selectedCategory ? <EditIcon sx={{ fontSize: 35 }} /> : <AddCircleOutlineIcon sx={{ fontSize: 35 }} />;

  return (
    <Box sx={{ padding: "15px", direction: "rtl" }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>

          <Avatar
            sx={{
              bgcolor: `${colors.primary}15`,
              color: colors.primary,
              width: 50,
              height: 50,
              ml: 2,
            }}
          >
            {dialogIcon}
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: "1.6rem",
                color: colors.text,
                fontFamily: 'Rubik, sans-serif',
                // margin: "10px",
              }}
            >
              {dialogTitle}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.textLight,
                fontFamily: 'Rubik, sans-serif',
              }}
            >
              {dialogSubtitle}
            </Typography>
          </Box>
        </Box>

        <IconButton
       
          sx={{
    color: colors.primary,
    backgroundColor: 'transparent !important',
    '&:hover': {
      backgroundColor: 'transparent !important',
      color: colors.primaryLight, // רק שינוי צבע
    },
    '&:focus': {
      backgroundColor: 'transparent !important',
    },
    '&:active': {
      backgroundColor: 'transparent !important',
    }
  }}
          onClick={resetForm}
        >

          <CloseIcon 
            sx={{ fontSize: 37, marginRight: "7px",ml:1 }} />

        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <StyledTextField
            sx={{ width: "400px", marginBottom: "35px", marginTop: "10px" }}
            fullWidth
            label="שם קטגוריה"
            variant="outlined"
            value={newCategory.categoryName}
            onChange={handleCategoryNameChange}
            error={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon sx={{ color: error ? colors.error : colors.primary, fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <FormHelperText error sx={{ mt: -1, mb: 1, mx: 1 }}>
              שדה חובה - יש להזין שם קטגוריה
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <FormButton
            variant="contained"
            onClick={saveCategory}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon sx={{ marginLeft: "9px" }} />}
            sx={{
              bgcolor: colors.primary,
              color: "white",
              fontSize: "0.8rem",
              // marginLeft: "19px",
              "&:hover": {
                bgcolor: colors.primaryDark,
              },
            }}
          >
            {loading ? "שומר..." : buttonText}
          </FormButton>
        </Grid>
      </Grid>
    </Box>
  );
};

