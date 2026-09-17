import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allCategoriesThunk } from "../../Redux/Slices/Categories/getCategoriesThunk";
import { updateCategoryThunk } from "../../Redux/Slices/Categories/categoryThunk";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

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
    fontFamily: "Rubik, sans-serif",
  },
  "& .MuiInputBase-input": {
    fontFamily: "Rubik, sans-serif",
  },
}));

export const UpdateCategory = ({ category, onClose, onUpdated }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const colors = {
    primary: "#00796b",
    primaryLight: "#48a999",
    primaryDark: "#004c40",
    text: "#263238",
    textLight: "#546e7a",
    border: "#e0e0e0",
  };

  useEffect(() => {
    if (category) {
      setFormData({
        categoryName: category.categoryName || "",
      });
    }
  }, [category]);

  const handleSubmit = async () => {
    const trimmedName = formData.categoryName.trim();

    if (!trimmedName) {
      setError("יש להזין שם קטגוריה");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await dispatch(updateCategoryThunk({
        category: {
          categoryName: trimmedName,
        },
        categoryId: category.categoryId,
      }));

      if (updateCategoryThunk.fulfilled.match(result)) {
        await dispatch(allCategoriesThunk());
        onUpdated?.();
        onClose?.();
        return;
      }

      setError("לא ניתן לעדכן את הקטגוריה. נסה שוב.");
    } catch (err) {
      console.error("Error updating category:", err);
      setError("אירעה שגיאה בעדכון הקטגוריה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "20px", direction: "rtl" }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: `${colors.primary}15`,
              color: colors.primary,
              width: 60,
              height: 60,
              mr: 2,
              ml: 1.5,
            }}
          >
            <EditIcon sx={{ fontSize: 30 }} />
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontSize: "34px",
                fontWeight: 800,
                color: colors.text,
                fontFamily: "Rubik, sans-serif",
              }}
            >
              עריכת קטגוריה
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.textLight,
                fontFamily: "Rubik, sans-serif",
              }}
            >
              עדכן את שם הקטגוריה הקיימת
            </Typography>
          </Box>
        </Box>

        <IconButton
          sx={{
            color: colors.primary,
            backgroundColor: "transparent !important",
            "&:hover": {
              backgroundColor: "transparent !important",
              color: colors.primaryLight,
            },
            "&:focus": {
              backgroundColor: "transparent !important",
            },
            "&:active": {
              backgroundColor: "transparent !important",
            },
          }}
          onClick={onClose}
          disableRipple
          disableFocusRipple
          disableTouchRipple
        >
          <CloseIcon sx={{ fontSize: 40, marginRight: "7px" }} />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 2, fontFamily: "Rubik, sans-serif", direction: "rtl" }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="שם קטגוריה"
            variant="outlined"
            value={formData.categoryName}
            onChange={(e) => setFormData({ categoryName: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          sx={{
            bgcolor: colors.primary,
            color: "white",
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",
            fontFamily: "Rubik, sans-serif",
            px: 3,
            py: 1,
            "&:hover": {
              bgcolor: colors.primaryDark,
            },
          }}
        >
          {loading ? "מעדכן..." : "עדכון קטגוריה"}
        </Button>
      </Box>
    </Box>
  );
};
