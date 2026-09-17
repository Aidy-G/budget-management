




// חידוד קטגוריות בספק
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allSupplierThunk } from '../../Redux/Slices/Suplliers/getSupplierThunk';
import { addSuppThunk } from '../../Redux/Slices/Suplliers/suplliersThunk';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
  TablePagination,
  Avatar,
  Tooltip,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from "@mui/icons-material/Category";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import { allCategoriesThunk } from '../../Redux/Slices/Categories/getCategoriesThunk';
import { AddCategory } from './addCategory';
import { UpdateCategory } from './updateCategory';

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

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00796b',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#00796b',
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'Ariel, sans-serif',
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Ariel, sans-serif',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  border: "1px solid #e0e0e0",
  overflow: "hidden",
  height: 'auto',
  width: "100%",
  margin: '0 auto',
  maxHeight: '70vh',
  backgroundColor: 'white',
  width: "100%",
  maxWidth: "100%",

}));
const StyledTableCell = styled(TableCell)(({ theme, header }) => ({
  align: 'center',
  padding: '15px 16px',
  fontFamily: 'Rubik, sans-serif',
  ...(header && {
    backgroundColor: "#f8f9fa",
    color: "#00796b",
    fontWeight: 700,
    fontSize: "0.9rem",
    position: 'sticky',
    top: 0,
    zIndex: 10,
    borderBottom: "2px solid #e0e0e0",
  }),
}));


export const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Institution color palette - Teal and Orange accents (matching addExpenditure)
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
  const categories = useSelector(state => state.category?.allCategories || []);
  const currUser = useSelector(state => state.user?.currUser || {});

  // Local state
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('categoryName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [expandedRow, setExpandedRow] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(allCategoriesThunk());
  }, [dispatch]);

  // Sort functions
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Pagination functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Dialog functions
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenEditDialog = (category) => {
    setSelectedCategory(category);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedCategory(null);
    setOpenEditDialog(false);
  };

  // Toggle row expansion
  const handleToggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Filter and sort categories
  const filteredCategories = categories
    .filter(category =>
      // Filter by current institution
      category.institutionId === currUser?.institutionId &&
      // Filter by search term
      (
        category.categoryId?.toString().includes(searchTerm) ||
        category.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      // Sort by selected field
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';

      // Handle numeric sorting
      if (!isNaN(aValue) && !isNaN(bValue)) {
        return sortDirection === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      // Handle string sorting
      if (sortDirection === 'asc') {
        return String(aValue).localeCompare(String(bValue), 'he');
      } else {
        return String(bValue).localeCompare(String(aValue), 'he');
      }
    });

  // Calculate categories to display on current page
  const displayedCategories = filteredCategories
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <PageContainer sx={{ direction: "rtl" }}>
      <ContentContainer maxWidth="lg">
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
              <CategoryIcon sx={{ fontSize: 29 }} />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: colors.text,

                }}
              >
                ניהול קטגוריות
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.textLight,
                  fontFamily: 'Rubik, sans-serif',
                }}
              >
                צפייה, הוספה ועריכה של קטגוריות במערכת
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

        {/* Search and Actions */}
        <FormCard sx={{ mb: 4 }}>
          <FormSection>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <SearchField
                  fullWidth
                  placeholder="חיפוש קטגוריה..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: colors.primary }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="sort-field-label" sx={{ fontFamily: 'Rubik, sans-serif' }}>מיון לפי</InputLabel>
                  <Select
                    labelId="sort-field-label"
                    value={sortField}
                    label="מיון לפי"
                    onChange={(e) => handleSort(e.target.value)}
                    sx={{
                      borderRadius: 2,
                      fontFamily: 'Rubik, sans-serif',
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.border,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                      },
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        {sortDirection === 'asc' ?
                          <ArrowUpwardIcon fontSize="small" sx={{ color: colors.primary }} /> :
                          <ArrowDownwardIcon fontSize="small" sx={{ color: colors.primary }} />
                        }
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="categoryName" sx={{ fontFamily: 'Rubik, sans-serif' }}>שם קטגוריה</MenuItem>
                    <MenuItem value="categoryId" sx={{ fontFamily: 'Rubik, sans-serif' }}>קוד קטגוריה</MenuItem>

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <ActionButton
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon sx={{ marginLeft: '6px' }} />}
                  sx={{
                    bgcolor: colors.primary,
                    color: "white",
                    "&:hover": {
                      bgcolor: colors.primaryDark,
                    },
                    fontFamily: 'Rubik, sans-serif',
                  }}
                  onClick={handleOpenAddDialog}
                >
                  הוספת קטגוריה חדשה
                </ActionButton>
              </Grid>
            </Grid>
          </FormSection>
        </FormCard>
        {/* Suppliers Table */}
        {displayedCategories.length > 0 ? (
          <Box>
            <StyledTableContainer sx={{
              maxHeight: '70vh',
              maxWidth: '100%',
              margin: '0 auto',
              marginBottom: 0,
            }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell header="true" align="center">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleSort('categoryId')}
                      >
                        <VpnKeyIcon sx={{ mr: 1, fontSize: 16, color: colors.primary }} />
                        קוד קטגוריה
                        {sortField === 'categoryId' && (
                          <Box component="span" sx={{ mr: 1 }}>
                            {sortDirection === 'asc' ?
                              <ArrowUpwardIcon fontSize="small" sx={{ color: colors.primary }} /> :
                              <ArrowDownwardIcon fontSize="small" sx={{ color: colors.primary }} />
                            }
                          </Box>
                        )}
                      </Box>
                    </StyledTableCell>

                    <StyledTableCell header="true" align="center">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleSort('categoryName')}
                      >
                        <CategoryIcon sx={{ mr: 1, fontSize: 16, color: colors.primary }} />
                        שם קטגוריה
                        {sortField === 'categoryName' && (
                          <Box component="span" sx={{ mr: 1 }}>
                            {sortDirection === 'asc' ?
                              <ArrowUpwardIcon fontSize="small" sx={{ color: colors.primary }} /> :
                              <ArrowDownwardIcon fontSize="small" sx={{ color: colors.primary }} />
                            }
                          </Box>
                        )}
                      </Box>
                    </StyledTableCell>

                    <StyledTableCell header="true" align="center" sx={{ width: 180 }}>
                      פעולות
                    </StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {displayedCategories.map((category, index) => (
                    <TableRow
                      key={category.categoryId || category.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? 'rgba(224, 242, 241, 0.3)' : 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 121, 107, 0.08)',
                        },
                      }}
                    >
                      <StyledTableCell align="center">
                        {category.categoryId || 'לא צוין'}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography sx={{ fontWeight: 600, fontFamily: 'Rubik, sans-serif' }}>
                          {category.categoryName}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            bgcolor: colors.primary,
                            color: 'white',
                            borderRadius: 2,
                            fontWeight: 700,
                            textTransform: 'none',
                            fontFamily: 'Rubik, sans-serif',
                            '&:hover': {
                              bgcolor: colors.primaryDark,
                            },
                          }}
                          onClick={() => handleOpenEditDialog(category)}
                        >
                          עריכה
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <TablePagination
                component="div"
                count={filteredCategories.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="שורות בעמוד:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
                rowsPerPageOptions={[5, 10, 25, 50]}
                sx={{
                  borderTop: `1px solid ${colors.border}`,
                  '& .MuiTablePagination-toolbar': {
                    fontFamily: 'Rubik, sans-serif',
                  },
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    fontFamily: 'Rubik, sans-serif',
                  },
                  '& .MuiTablePagination-select': {
                    fontFamily: 'Rubik, sans-serif',
                  }
                }}
              />
            </StyledTableContainer>
          </Box>
        ) : (
          // שאר הקוד של "לא נמצאו קטגוריות" נשאר כמו שהוא
          <FormCard sx={{ mb: 4 }}>
            <Box sx={{
              p: 6,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Avatar
                sx={{
                  bgcolor: `${colors.primary}15`,
                  color: colors.primary,
                  width: 80,
                  height: 80,
                  mb: 2
                }}
              >
                <BusinessIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: colors.text,
                  mb: 1,
                  fontFamily: 'Rubik, sans-serif'
                }}
              >
                לא נמצאו קטגוריות
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.textLight,
                  mb: 3,
                  maxWidth: 500,
                  fontFamily: 'Rubik, sans-serif'
                }}
              >
                {searchTerm ?
                  'לא נמצאו קטגוריות התואמות את החיפוש שלך' :
                  'עדיין לא הוספת קטגוריה למערכת. לחץ על הכפתור למטה כדי להוסיף קטגוריה חדשה.'
                }
              </Typography>
              <ActionButton
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  bgcolor: colors.primary,
                  color: "white",
                  "&:hover": {
                    bgcolor: colors.primaryDark,
                  },
                  fontFamily: 'Rubik, sans-serif',
                }}
                onClick={handleOpenAddDialog}
              >
                הוספת קטגוריה חדשה
              </ActionButton>
            </Box>
          </FormCard>
        )}






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
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: colors.text,
                mb: 1,
                fontFamily: 'Rubik, sans-serif'
              }}
            >
              <InfoIcon sx={{ verticalAlign: "middle", mr: 1, color: colors.primary }} />
              מידע חשוב
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: colors.textLight,
                fontFamily: 'Rubik, sans-serif',
                mb: 0.5
              }}
            >
              • ניתן לחפש ספקים לפי שם,וקוד קטגוריה
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: colors.textLight,
                fontFamily: 'Rubik, sans-serif'
              }}
            >
              • ניתן למיין את הטבלה לפי שם קטגוריה
            </Typography>
          </Paper>
        </Box>

        {/* Add Category Dialog */}
        <Dialog
          open={openAddDialog}
          onClose={handleCloseAddDialog}
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
              <AddCategory setAddCtgr={setOpenAddDialog} addCtgr={openAddDialog} />
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
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
          <DialogContent sx={{ p: 0, '&:first-of-type': { pt: 0 } }}>
            <Box sx={{ p: 3 }}>
              {selectedCategory && (
                <UpdateCategory
                  category={selectedCategory}
                  onClose={handleCloseEditDialog}
                  onUpdated={() => {
                    setSnackbar({ open: true, message: 'הקטגוריה עודכנה בהצלחה', severity: 'success' });
                  }}
                />
              )}
            </Box>
          </DialogContent>
        </Dialog>
        
        {/* Success Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            variant="filled"
            sx={{
              width: '100%',
              borderRadius: 2,
              fontFamily: 'Rubik, sans-serif'
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ContentContainer>
    </PageContainer>
  );
};












