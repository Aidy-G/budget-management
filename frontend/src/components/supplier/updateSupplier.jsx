import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allSupplierThunk } from "../../Redux/Slices/Suplliers/getSupplierThunk";
import { updateSuppThunk } from "../../Redux/Slices/Suplliers/suplliersThunk";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BusinessIcon from "@mui/icons-material/Business";
import NumbersIcon from "@mui/icons-material/Numbers";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

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

const FormButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: "10px 24px",
  fontWeight: 700,
  textTransform: "none",
  fontSize: "0.9rem",
  fontFamily: "Rubik, sans-serif",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
  },
}));

export const UpdateSupplier = ({ supplier, onClose, onUpdated }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    supplierName: "",
    licensedNum: 0,
    bankCode: 0,
    numOfBankBranch: 0,
    numOfBankAccount: 0,
    nameOfOwnerAccount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const colors = {
    primary: "#00796b",
    primaryLight: "#48a999",
    primaryDark: "#004c40",
    text: "#263238",
    textLight: "#546e7a",
    background: "#f5f5f5",
    card: "#ffffff",
    border: "#e0e0e0",
  };

  useEffect(() => {
    if (supplier) {
      setFormData({
        supplierName: supplier.supplierName || "",
        licensedNum: supplier.licensedNum || 0,
        bankCode: supplier.bankCode || 0,
        numOfBankBranch: supplier.numOfBankBranch || 0,
        numOfBankAccount: supplier.numOfBankAccount || 0,
        nameOfOwnerAccount: supplier.nameOfOwnerAccount || "",
      });
    }
  }, [supplier]);

  const handleFieldChange = (field) => (event) => {
    const value = field === "supplierName" || field === "nameOfOwnerAccount"
      ? event.target.value
      : Number(event.target.value || 0);

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.supplierName?.trim()) {
      setError("יש להזין שם ספק");
      return;
    }

    if (!formData.licensedNum || formData.licensedNum <= 0) {
      setError("מספר עסק מורשה חייב להיות תקין");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await dispatch(updateSuppThunk({
        supplier: {
          ...formData,
          supplierName: formData.supplierName.trim(),
          nameOfOwnerAccount: formData.nameOfOwnerAccount.trim(),
        },
        licensedNum: supplier.licensedNum,
      }));

      if (updateSuppThunk.fulfilled.match(result)) {
        await dispatch(allSupplierThunk());
        onUpdated?.();
        onClose?.();
        return;
      }

      setError("לא ניתן לעדכן את הספק. נסה שוב.");
    } catch (err) {
      console.error("Error updating supplier:", err);
      setError("אירעה שגיאה בעדכון הספק");
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
              עריכת ספק
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.textLight,
                fontFamily: "Rubik, sans-serif",
              }}
            >
              עדכן את פרטי הספק הקיים
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
        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            label="שם ספק"
            variant="outlined"
            value={formData.supplierName}
            onChange={handleFieldChange("supplierName")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            type="number"
            label="מספר עסק מורשה"
            variant="outlined"
            value={formData.licensedNum === 0 ? "" : formData.licensedNum}
            onChange={handleFieldChange("licensedNum")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            type="number"
            label="קוד בנק"
            variant="outlined"
            value={formData.bankCode === 0 ? "" : formData.bankCode}
            onChange={handleFieldChange("bankCode")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            type="number"
            label="מספר סניף"
            variant="outlined"
            value={formData.numOfBankBranch === 0 ? "" : formData.numOfBankBranch}
            onChange={handleFieldChange("numOfBankBranch")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            type="number"
            label="מספר חשבון בנק"
            variant="outlined"
            value={formData.numOfBankAccount === 0 ? "" : formData.numOfBankAccount}
            onChange={handleFieldChange("numOfBankAccount")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            label="שם בעל החשבון"
            variant="outlined"
            value={formData.nameOfOwnerAccount}
            onChange={handleFieldChange("nameOfOwnerAccount")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <FormButton
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: colors.primary,
            color: colors.primary,
            "&:hover": {
              borderColor: colors.primaryDark,
              bgcolor: `${colors.primary}10`,
            },
          }}
        >
          ביטול
        </FormButton>
        <FormButton
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            bgcolor: colors.primary,
            color: "white",
            "&:hover": {
              bgcolor: colors.primaryDark,
            },
          }}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
        >
          {loading ? "שומר..." : "שמור שינויים"}
        </FormButton>
      </Box>
    </Box>
  );
};
