

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addSuppThunk } from "../../Redux/Slices/Suplliers/suplliersThunk";
// import {
//   Avatar,
//   TextField,
//   Grid,
//   InputAdornment,
//   Button,
//   Box,
//   Typography,
//   Divider,
//   CircularProgress,
//   IconButton,
//   Alert,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import BusinessIcon from "@mui/icons-material/Business";
// import NumbersIcon from "@mui/icons-material/Numbers";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import PersonIcon from "@mui/icons-material/Person";
// import SaveIcon from "@mui/icons-material/Save";
// import CloseIcon from "@mui/icons-material/Close";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";
// import { allSupplierThunk } from "../../Redux/Slices/Suplliers/getSupplierThunk";
// import { set } from "date-fns";
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

// export const AddSupplier = (props) => {
//   const setAddSupp = props.setAddSupp;
//   const supName = props.supName;
//   const setOpenSupplierDialog = props.setOpenSupplierDialog;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const suppliers = useSelector((state) => state.supplier.allSuppliers);
//   // Colors based on your theme
//   console.log("שם הספק בהוצאה "+ {supName});

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

//   const [newSupp, setNewSupp] = useState({
//     supplierName: supName || '', 
//     licensedNum: 0, 
//     bankCode: 0, 
//     numOfBankBranch: 0, 
//     numOfBankAccount: 0, 
//     nameOfOwnerAccount: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [validSupp, setValidSupp] = useState(false);

//   const addSupplier = async() => {
//     debugger
//     if(suppliers.find(supplier => supplier.licensedNum === newSupp.licensedNum)) {
//       setValidSupp(true);

//       return;
//     }

//     if (!newSupp.supplierName) {
//       return;
//     }

//     try {
//       setLoading(true);
//       var s = await dispatch(addSuppThunk(newSupp));

//       if (s.payload) {
//         await dispatch(allSupplierThunk());
//       }

//       if (setAddSupp) {
//         setAddSupp(false);
//       }
//     } catch (error) {
//       console.error("Error adding supplier:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const ActionButton = styled(Button)(({ theme }) => ({

//     padding: "10px 24px",
//     fontWeight: 700,
//     textTransform: "none",
//     fontSize: "1rem",
//    border: "none",
//     transition: "all 0.3s ease",




//   }));
//   return (
//   <Box sx={{ padding: "20px",direction:'rtl' }}>  {/* Added padding here */}


//       <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Avatar
//               sx={{
//                 bgcolor: `${colors.primary}15`,
//                 color: colors.primary,
//                 width: 60,
//                 height: 60,
//                 mr: 2,
//                 ml:1.5
//               }}
//             >
//               <AddCircleOutlineIcon sx={{ fontSize: 35 }} />
//             </Avatar>
//             <Box>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontSize: '34px',
//                   fontWeight: 800,
//                   color: colors.text,
//                   fontFamily: 'Rubik, sans-serif',
//                 }}
//               >
//                 הוספת ספק חדש 
//               </Typography>
//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: colors.textLight,
//                   fontFamily: 'Rubik, sans-serif',
//                 }}
//               >
//                 הזן את פרטי הספק החדש
//               </Typography>
//             </Box>
//           </Box>
// <IconButton
//   sx={{
//     color: colors.primary,
//     backgroundColor: 'transparent !important',
//     '&:hover': {
//       backgroundColor: 'transparent !important',
//       color: colors.primaryLight, // רק שינוי צבע
//     },
//     '&:focus': {
//       backgroundColor: 'transparent !important',
//     },
//     '&:active': {
//       backgroundColor: 'transparent !important',
//     }
//   }}
//   onClick={() => setAddSupp(false)}
//   disableRipple
//   disableFocusRipple
//   disableTouchRipple
// >
//   <CloseIcon sx={{ fontSize: 40, marginRight: "7px" }}/> 
// </IconButton>

//         </Box>


//       <Divider sx={{ mb: 3 }} />

//       <Grid container spacing={3}>  {/* Changed spacing from 2 to 3 for more space */}
//         <Grid item xs={12} md={6}>
//           <StyledTextField
//             fullWidth
//             label="שם ספק"
//             variant="outlined"
//             value={newSupp.supplierName}
//             onChange={(i) => setNewSupp({ ...newSupp, supplierName: i.target.value })}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <BusinessIcon sx={{ color: colors.primary }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <StyledTextField
//             fullWidth
//             type="number"
//             label="מספר עסק מורשה"
//             variant="outlined"
//             value={newSupp.licensedNum === 0 ? '' : newSupp.licensedNum}
//             onChange={(i) =>{ setNewSupp({ ...newSupp, licensedNum: +i.target.value });setValidSupp(false);}}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <NumbersIcon sx={{ color: colors.primary }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//  {validSupp && <Alert 
//                         severity="info" 
//                         sx={{ 
//                           borderRadius: 2, 
//                           flex: 1,
//                           mr: 1,
//                           fontFamily: 'Rubik, sans-serif',
//                           direction: 'rtl',
//                           marginLeft: "20px",
//                           bgcolor: `${colors.primary}15`,                        }}
//                       >
//                         מספר רישוי זה כבר קיים במערכת ע"ש ספק אחר
//                       </Alert>}
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <StyledTextField
//             fullWidth
//             type="number"
//             label="קוד בנק"
//             variant="outlined"
//             value={newSupp.bankCode === 0 ? '' : newSupp.bankCode}
//             onChange={(i) => setNewSupp({ ...newSupp, bankCode: +i.target.value })}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <AccountBalanceIcon sx={{ color: colors.primary }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <StyledTextField
//             fullWidth
//             type="number"
//             label="מספר סניף"
//             variant="outlined"
//             value={newSupp.numOfBankBranch === 0 ? '' : newSupp.numOfBankBranch}
//             onChange={(i) => setNewSupp({ ...newSupp, numOfBankBranch: +i.target.value })}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <AccountBalanceIcon sx={{ color: colors.primary }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <StyledTextField
//             fullWidth
//             type="number"
//             label="מספר חשבון"
//             variant="outlined"
//             value={newSupp.numOfBankAccount === 0 ? '' : newSupp.numOfBankAccount}
//             onChange={(i) => setNewSupp({ ...newSupp, numOfBankAccount: +i.target.value })}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <CreditCardIcon sx={{ color: colors.primary }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <StyledTextField
//             fullWidth
//             label="שם בעל החשבון"
//             variant="outlined"
//             value={newSupp.nameOfOwnerAccount}
//             onChange={(i) => setNewSupp({ ...newSupp, nameOfOwnerAccount: i.target.value })}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <PersonIcon sx={{ color: colors.primary }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//           <FormButton
//             variant="contained"
//             onClick={addSupplier}
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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSuppThunk } from "../../Redux/Slices/Suplliers/suplliersThunk";
import {
  Avatar,
  TextField,
  Grid,
  InputAdornment,
  Button,
  Box,
  Typography,
  Divider,
  CircularProgress,
  IconButton,
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { allSupplierThunk } from "../../Redux/Slices/Suplliers/getSupplierThunk";

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

export const AddSupplier = (props) => {
  const setAddSupp = props.setAddSupp;
  const supName = props.supName;

  const dispatch = useDispatch();

  const suppliers = useSelector(
    (state) => state.supplier.allSuppliers || []
  );

  const colors = {
    primary: "#00796b",
    primaryLight: "#48a999",
    primaryDark: "#004c40",
    success: "#2e7d32",
    text: "#263238",
    textLight: "#546e7a",
  };

  const [newSupp, setNewSupp] = useState({
    supplierName: supName || "",
    licensedNum: "",
    bankCode: "",
    numOfBankBranch: "",
    numOfBankAccount: "",
    nameOfOwnerAccount: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [validSupp, setValidSupp] = useState(false);

  // הודעת הצלחה
  const [successMessage, setSuccessMessage] = useState(false);

  // סגירת הודעת הצלחה
  const handleSuccessClose = () => {
    setSuccessMessage(false);
  };

  /*
   * עדכון שדה טקסט
   */
  const handleTextChange = (field) => (event) => {
    const value = event.target.value;

    setNewSupp((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /*
   * עדכון שדה מספרי
   */
  const handleNumberChange = (field) => (event) => {
    const value = event.target.value;

    // מאפשר רק ספרות או ערך ריק
    if (!/^\d*$/.test(value)) {
      return;
    }

    setNewSupp((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    if (field === "licensedNum") {
      setValidSupp(false);
    }
  };

  /*
   * בדיקת תקינות של הטופס
   */
  const validateForm = () => {
    const newErrors = {};

    if (!newSupp.supplierName.trim()) {
      newErrors.supplierName = "יש להזין שם ספק";
    }

    if (!newSupp.licensedNum) {
      newErrors.licensedNum = "יש להזין מספר עסק מורשה";
    } else if (!/^\d+$/.test(newSupp.licensedNum)) {
      newErrors.licensedNum =
        "מספר עסק מורשה חייב להכיל ספרות בלבד";
    }

    if (!newSupp.bankCode) {
      newErrors.bankCode = "יש להזין קוד בנק";
    } else if (!/^\d+$/.test(newSupp.bankCode)) {
      newErrors.bankCode = "קוד בנק חייב להכיל ספרות בלבד";
    }

    if (!newSupp.numOfBankBranch) {
      newErrors.numOfBankBranch = "יש להזין מספר סניף";
    } else if (!/^\d+$/.test(newSupp.numOfBankBranch)) {
      newErrors.numOfBankBranch = "מספר סניף חייב להכיל ספרות בלבד";
    }

    if (!newSupp.numOfBankAccount) {
      newErrors.numOfBankAccount = "יש להזין מספר חשבון";
    } else if (!/^\d+$/.test(newSupp.numOfBankAccount)) {
      newErrors.numOfBankAccount = "מספר חשבון חייב להכיל ספרות בלבד";
    }

    if (!newSupp.nameOfOwnerAccount.trim()) {
      newErrors.nameOfOwnerAccount = "יש להזין שם בעל החשבון";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
   * יצירת ספק
   */
  const addSupplier = async () => {
    setValidSupp(false);
    setSuccessMessage(false);

    // בדיקת תקינות כללית
    if (!validateForm()) {
      return;
    }

    /*
     * בדיקה האם מספר העסק המורשה כבר קיים
     */
    const supplierExists = suppliers.some(
      (supplier) =>
        String(supplier.licensedNum) ===
        String(newSupp.licensedNum)
    );

    if (supplierExists) {
      setValidSupp(true);

      setErrors((prev) => ({
        ...prev,
        licensedNum: "מספר עסק מורשה זה כבר קיים במערכת",
      }));

      return;
    }

    try {
      setLoading(true);

      const supplierToAdd = {
        supplierName: newSupp.supplierName.trim(),
        licensedNum: Number(newSupp.licensedNum),
        bankCode: Number(newSupp.bankCode),
        numOfBankBranch: Number(newSupp.numOfBankBranch),
        numOfBankAccount: Number(newSupp.numOfBankAccount),
        nameOfOwnerAccount: newSupp.nameOfOwnerAccount.trim(),
      };

      const result = await dispatch(addSuppThunk(supplierToAdd));

      if (result.payload) {
        await dispatch(allSupplierThunk());

        // הצגת הודעת הצלחה
        setSuccessMessage(true);

        // סגירת הטופס לאחר 3 שניות
        setTimeout(() => {
          setSuccessMessage(false);

          if (setAddSupp) {
            setAddSupp(false);
          }
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding supplier:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
            <AddCircleOutlineIcon sx={{ fontSize: 35 }} />
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
              הוספת ספק חדש
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: colors.textLight,
                fontFamily: "Rubik, sans-serif",
              }}
            >
              הזן את פרטי הספק החדש
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
          onClick={() => setAddSupp(false)}
          disableRipple
          disableFocusRipple
          disableTouchRipple
        >
          <CloseIcon
            sx={{
              fontSize: 40,
              marginRight: "7px",
            }}
          />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* הודעת הצלחה */}
      {/* {successMessage && (
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          variant="outlined"
          sx={{
            width: "100%",
            mb: 3,
            borderRadius: 2,
            fontFamily: "Rubik, sans-serif",
            backgroundColor: "white",
            border: "2px solid black",
            color: "black",
            direction: "rtl",
            "& .MuiAlert-icon": {
              color: colors.success,
            },
          }}
        >
          הספק נוצר בהצלחה!
        </Alert>
      )} */}

      <Grid container spacing={3}>
        {/* שם ספק */}
        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            required
            label="שם ספק"
            variant="outlined"
            value={newSupp.supplierName}
            onChange={handleTextChange("supplierName")}
            error={Boolean(errors.supplierName)}
            helperText={errors.supplierName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* מספר עסק מורשה */}
        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            required
            type="text"
            inputMode="numeric"
            label="מספר עסק מורשה"
            variant="outlined"
            value={newSupp.licensedNum}
            onChange={handleNumberChange("licensedNum")}
            error={Boolean(errors.licensedNum) || validSupp}
            helperText={
              errors.licensedNum ||
              (validSupp
                ? "מספר עסק מורשה זה כבר קיים במערכת"
                : "")
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* קוד בנק */}
        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            required
            type="text"
            inputMode="numeric"
            label="קוד בנק"
            variant="outlined"
            value={newSupp.bankCode}
            onChange={handleNumberChange("bankCode")}
            error={Boolean(errors.bankCode)}
            helperText={errors.bankCode}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon
                    sx={{ color: colors.primary }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* מספר סניף */}
        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            required
            type="text"
            inputMode="numeric"
            label="מספר סניף"
            variant="outlined"
            value={newSupp.numOfBankBranch}
            onChange={handleNumberChange("numOfBankBranch")}
            error={Boolean(errors.numOfBankBranch)}
            helperText={errors.numOfBankBranch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon
                    sx={{ color: colors.primary }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* מספר חשבון */}
        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            required
            type="text"
            inputMode="numeric"
            label="מספר חשבון"
            variant="outlined"
            value={newSupp.numOfBankAccount}
            onChange={handleNumberChange("numOfBankAccount")}
            error={Boolean(errors.numOfBankAccount)}
            helperText={errors.numOfBankAccount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon
                    sx={{ color: colors.primary }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* שם בעל החשבון */}
        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            required
            label="שם בעל החשבון"
            variant="outlined"
            value={newSupp.nameOfOwnerAccount}
            onChange={handleTextChange("nameOfOwnerAccount")}
            error={Boolean(errors.nameOfOwnerAccount)}
            helperText={errors.nameOfOwnerAccount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* כפתור אישור */}
        <Grid
          item
          xs={12}
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormButton
            variant="contained"
            onClick={addSupplier}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress
                  size={20}
                  color="inherit"
                />
              ) : (
                <SaveIcon />
              )
            }
            sx={{
              bgcolor: colors.primary,
              color: "white",

              "&:hover": {
                bgcolor: colors.primaryDark,
              },
            }}
          >
            {loading ? "שומר..." : "לאישור"}
          </FormButton>
        </Grid>
      </Grid>


      {successMessage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Alert
            onClose={handleSuccessClose}
            severity="success"
            variant="outlined"
            sx={{
              width: "fit-content",
              minWidth: "300px",
              maxWidth: "500px",
              borderRadius: 2,
              fontFamily: "Rubik, sans-serif",
              backgroundColor: "white",
              border: "2px solid black",
              color: "black",
              direction: "rtl",
              "& .MuiAlert-icon": {
                color: colors.success,
              },
            }}
          >
            הספק נוצר בהצלחה!
          </Alert>
        </Box>
      )}


    </Box>
  );
};

