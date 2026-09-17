

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Avatar,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from '@mui/icons-material/Close';

import { allCategoriesThunk } from "../../Redux/Slices/Categories/getCategoriesThunk";
import { allSupplierThunk } from "../../Redux/Slices/Suplliers/getSupplierThunk";
import { addExpThunk } from "../../Redux/Slices/Expenditures/add";
import { AddSupplier } from "../supplier/addSupplier";
import { AddCategory } from "../Categories/addCategory";

import { getSchoolBySsymbolThunk, GetSumOfEpendituresOfSchool } from "../../Redux/Slices/Schools/getSchoolThunk";

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

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  padding: "6px 12px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.875rem",
  transition: "all 0.2s ease",
  marginTop: theme.spacing(1),
}));

export const AddExpenditure = () => {
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

  // Redux state
  const categories = useSelector(s => s.category.allCategories || []);
  const suppliers = useSelector(s => s.supplier.allSuppliers || []);
  const currUser = useSelector(u => u.user.currUser || {});
  const currSchool = useSelector(s => s.school.currSchool || {});
  const sumExps = useSelector(s => s.school.sumExps);

  // Local state
  const [expDetails, setExpDetails] = useState({
    expSum: '',
    supName: '',
    ordererName: '',
    categoryName: '',
    invoiceNum: ''
  });

  const [errors, setErrors] = useState({
    expSum: false,
    supName: false,
    ordererName: false,
    categoryName: false,
    invoiceNum: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openSupplierDialog, setOpenSupplierDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!currUser?.schoolSymbol) return;

      await dispatch(allCategoriesThunk());
      await dispatch(allSupplierThunk());
      await dispatch(getSchoolBySsymbolThunk(currUser.schoolSymbol));
      await dispatch(GetSumOfEpendituresOfSchool(currUser.schoolSymbol));
    };

    fetchData();
  }, [dispatch, currUser?.schoolSymbol]);

  // Filter suppliers based on input
  useEffect(() => {
    if (expDetails.supName.trim() !== '') {
      const filtered = suppliers?.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(expDetails.supName.toLowerCase())
      ) || [];
      setFilteredSuppliers(filtered);
    } else {
      setFilteredSuppliers(suppliers || []);
    }
  }, [expDetails.supName, suppliers]);

  // Filter categories based on input
  useEffect(() => {
    if (expDetails.categoryName.trim() !== '') {
      const filtered = categories?.filter(category =>
        category.categoryName.toLowerCase().includes(expDetails.categoryName.toLowerCase())
      ) || [];
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories || []);
    }
  }, [expDetails.categoryName, categories]);

  // Handle input change and clear errors when field is filled
  const handleInputChange = (field, value) => {
    setExpDetails(prev => ({ ...prev, [field]: value }));
    if (value && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      expSum: !expDetails.expSum || isNaN(expDetails.expSum) || parseFloat(expDetails.expSum) <= 0,
      supName: !expDetails.supName.trim(),
      ordererName: !expDetails.ordererName.trim(),
      categoryName: !expDetails.categoryName.trim(),
      invoiceNum: !expDetails.invoiceNum || isNaN(expDetails.invoiceNum) || parseInt(expDetails.invoiceNum) <= 0
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error);
  };

  // Check if supplier exists
  const checkSupplierExists = () => {
    return suppliers?.some(supplier =>
      supplier.supplierName.toLowerCase() === expDetails.supName.toLowerCase()
    );
  };

  // Check if category exists
  const checkCategoryExists = () => {
    return categories?.some(category =>
      category.categoryName.toLowerCase() === expDetails.categoryName.toLowerCase()
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // Check if supplier exists
    if (!checkSupplierExists()) {
      setOpenSupplierDialog(true);
      return;
    }

    // Check if category exists
    if (!checkCategoryExists()) {
      setOpenCategoryDialog(true);
      return;
    }

    // All validations passed, submit the form
    await addExpenditure();
  };

  // Add expenditure to the system
  const addExpenditure = async () => {
    try {
      setLoading(true);

      const selectedSupplier = suppliers.find(
        supplier => supplier.supplierName?.trim().toLowerCase() === expDetails.supName.trim().toLowerCase()
      );

      const selectedCategory = categories.find(
        category => category.categoryName?.trim().toLowerCase() === expDetails.categoryName.trim().toLowerCase()
      );

      // const newExp = {
      //   schoolSymbol: currUser.schoolSymbol ?? currSchool.schoolSymbol,
      //   schoolName: currSchool.schoolName || '',
      //   budget: Number(currSchool.budget) || 0,
      //   expenditureSum: Number(expDetails.expSum),
      //   categoryName: selectedCategory?.categoryName || expDetails.categoryName.trim(),
      //   supplierName: selectedSupplier?.supplierName || expDetails.supName.trim(),
      //   categoryId: selectedCategory?.id ?? null,
      //   supplierId: selectedSupplier?.id ?? null,
      //   date: new Date().toISOString(),
      //   ordererName: expDetails.ordererName.trim(),
      //   invoiceNum: Number(expDetails.invoiceNum),
      //   isAccepted: false,
      //   amountPaid: 0,
      //   remainToPay: Number(expDetails.expSum)
      // };

const newExp = {
  schoolSymbol: currUser.schoolSymbol ?? currSchool.schoolSymbol,
  expenditureSum: Number(expDetails.expSum),
  categoryId: Number(selectedCategory?.categoryId ?? selectedCategory?.id ?? 0),
  categoryName: selectedCategory?.categoryName || expDetails.categoryName.trim(),
  supplierId: Number(selectedSupplier?.licensedNum ?? selectedSupplier?.id ?? 0),
  supplierName: selectedSupplier?.supplierName || expDetails.supName.trim(),
  date: new Date().toISOString(),
  ordererName: expDetails.ordererName.trim(),
  invoiceNum: Number(expDetails.invoiceNum),
  isAccepted: false,
  amountPaid: 0
};

      const currentTotal = Number(sumExps) || 0;
      const schoolBudget = Number(currSchool.budget) || 0;

      if (currentTotal + newExp.expenditureSum > schoolBudget) {
        alert("הסכום הכולל של ההוצאות חורג מהתקציב של המוסד");
        return;
      }

      // Log payload to verify what is sent to the backend
      console.log('Posting expenditure payload:', JSON.stringify(newExp));
      await dispatch(addExpThunk(newExp));
      await dispatch(GetSumOfEpendituresOfSchool(currUser.schoolSymbol ?? currSchool.schoolSymbol));

      setSuccess(true);

      // Reset form after successful submission
      setExpDetails({
        expSum: '',
        supName: '',
        ordererName: '',
        categoryName: '',
        invoiceNum: ''
      });

    } catch (error) {
      console.error("Error adding expenditure:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle supplier dialog close
  const handleCloseSupplierDialog = () => {
    setOpenSupplierDialog(false);
  };

  // Handle category dialog close
  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };

  // Handle success message close
  const handleSuccessClose = () => {
    setSuccess(false);
    navigate("/work");
  };

  // Handle opening supplier dialog
  const handleOpenSupplierDialog = () => {
    console.log("Opening supplier dialog");
    setOpenSupplierDialog(true);
  };

  // Handle opening category dialog
  const handleOpenCategoryDialog = () => {
    console.log("Opening category dialog");
    setOpenCategoryDialog(true);
  };

  return (
    <PageContainer sx={{ direction: "rtl" }}>
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
                ml: 3
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
                הוספת הוצאה חדשה
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.textLight,
                  fontFamily: 'Rubik, sans-serif',
                }}
              >
                הזן את פרטי ההוצאה החדשה
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
            <ArrowBackIcon sx={{ fontSize: 19, marginRight: "7px" }} />
          </ActionButton>
        </Box>

<p>סך הוצאות עד כה: {sumExps}</p>
        {/* Form Card */}
        <FormCard>
          <FormSection>
            <Grid container spacing={3}>
              {/* Expense Amount */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="סכום הוצאה"
                  variant="outlined"
                  value={expDetails.expSum}
                  onChange={(e) => handleInputChange('expSum', e.target.value)}
                  error={errors.expSum}
                  helperText={errors.expSum ? "יש להזין סכום הוצאה תקין (מספר חיובי)" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon sx={{ color: colors.primary }} />
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

              {/* Invoice Number */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="מספר חשבונית"
                  variant="outlined"
                  value={expDetails.invoiceNum}
                  onChange={(e) => handleInputChange('invoiceNum', e.target.value)}
                  error={errors.invoiceNum}
                  helperText={errors.invoiceNum ? "יש להזין מספר חשבונית תקין" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ReceiptIcon sx={{ color: colors.primary }} />
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

              {/* Supplier Name */}
              <Grid item xs={12} md={6}>
                <Autocomplete

                  freeSolo
                  options={filteredSuppliers.map((option) => option.supplierName)}
                  inputValue={expDetails.supName}
                  onInputChange={(event, newInputValue) => {
                    handleInputChange('supName', newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="שם ספק"
                      variant="outlined"
                      error={errors.supName}
                      helperText={errors.supName ? "יש להזין שם ספק" : ""}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessIcon sx={{ color: colors.primary }} />
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
                  )}
                />
                {expDetails.supName && filteredSuppliers.length === 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Alert
                      severity="info"
                      sx={{
                        borderRadius: 2,
                        flex: 1,
                        mr: 1,
                        fontFamily: 'Rubik, sans-serif',
                        direction: 'rtl',
                        marginLeft: "20px",
                        bgcolor: `${colors.primary}15`,
                      }}
                    >
                      הספק לא נמצא במערכת
                    </Alert>
                    <AddButton
                      variant="contained"
                      onClick={handleOpenSupplierDialog}
                      sx={{
                        bgcolor: colors.secondary,
                        color: "white",
                        "&:hover": {
                          bgcolor: colors.secondaryDark,
                        },
                        fontFamily: 'Rubik, sans-serif',
                      }}
                    >
                      הוסף ספק
                    </AddButton>
                  </Box>
                )}
              </Grid>

              {/* Category Name */}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  freeSolo
                  options={filteredCategories.map((option) => option.categoryName)}
                  inputValue={expDetails.categoryName}
                  onInputChange={(event, newInputValue) => {
                    handleInputChange('categoryName', newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="קטגוריה"
                      variant="outlined"
                      error={errors.categoryName}
                      helperText={errors.categoryName ? "יש להזין קטגוריה" : ""}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CategoryIcon sx={{ color: colors.primary }} />
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
                  )}
                />
                {expDetails.categoryName && filteredCategories.length === 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Alert
                      severity="info"
                      sx={{
                        borderRadius: 2,
                        flex: 1,
                        mr: 1,
                        fontFamily: 'Rubik, sans-serif',
                        direction: 'rtl',
                        marginLeft: "20px",
                        bgcolor: `${colors.primary}15`,
                      }}
                    >
                      הקטגוריה לא נמצאה במערכת
                    </Alert>
                    <AddButton
                      variant="contained"
                      // startIcon={<AddIcon />}
                      onClick={handleOpenCategoryDialog}
                      sx={{
                        bgcolor: colors.secondary,
                        color: "white",
                        "&:hover": {
                          bgcolor: colors.secondaryDark,
                        },
                        fontFamily: 'Rubik, sans-serif',
                      }}
                    >
                      הוסף קטגוריה
                    </AddButton>
                  </Box>
                )}
              </Grid>

              {/* Orderer Name */}
              <Grid item xs={12}>
                <TextField

                  fullWidth
                  label="שם מזמין"
                  variant="outlined"
                  value={expDetails.ordererName}
                  onChange={(e) => handleInputChange('ordererName', e.target.value)}
                  error={errors.ordererName}
                  helperText={errors.ordererName ? "יש להזין שם מזמין" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: colors.primary }} />
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
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddCircleOutlineIcon sx={{ marginLeft: "10px" }} />}
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
                {loading ? "מוסיף הוצאה..." : "הוסף הוצאה"}
              </ActionButton>
            </Box>
          </FormSection>
        </FormCard>

        {/* Information Card */}
        <Box sx={{ mt: 4 }}>
          <Paper
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
              • סכום ההוצאה חייב להיות מספר חיובי
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
              • אם הספק או הקטגוריה לא קיימים במערכת, תוכל להוסיף אותם ישירות מטופס זה
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
              • מספר החשבונית חייב להיות מספר חיובי
            </Typography>
          </Paper>
        </Box>

        {/* Supplier Dialog - עיצוב משופר */}
        <Dialog
          open={openSupplierDialog}
          onClose={handleCloseSupplierDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: `1px solid ${colors.border}`,
            },
          }}
        >


          {openSupplierDialog && <DialogContent


            sx={{
              p: 0,
              '&:first-of-type': {
                pt: 0
              }
            }}>
            <Box sx={{ p: 3 }}>
              <AddSupplier setOpenSupplierDialog={setOpenSupplierDialog} />
            </Box>
          </DialogContent>}

          <DialogActions sx={{
            p: 3,
            bgcolor: '#f8f9fa',
            borderTop: `1px solid ${colors.border}`,
            display: 'flex',
            justifyContent: 'flex-end'
          }}>


          </DialogActions>
        </Dialog>

        {/* Category Dialog - עיצוב משופר */}
        <Dialog
          open={openCategoryDialog}
          onClose={handleCloseCategoryDialog}
          minWidth="60px"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: `1px solid ${colors.border}`,
            },
          }}
        >


          <DialogContent sx={{
            p: 0,
            '&:first-of-type': {
              pt: 0
            }
          }}>


            <Box sx={{ p: 3 }}>
              <AddCategory />
            </Box>
          </DialogContent>


        </Dialog>

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
            variant="outlined"
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
            ההוצאה נוספה בהצלחה!
          </Alert>
        </Snackbar>
      </ContentContainer>
    </PageContainer>
  );
};
