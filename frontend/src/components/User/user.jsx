// גרסה חדשה 
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TablePagination,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  Grid,
  Paper,
  Card,
  Avatar
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { allUsersThunk } from '../../Redux/Slices/Users/getUsersThunk';
import { addUserThunk } from '../../Redux/Slices/Users/usersThunk';
import { allSchoolsThunk } from '../../Redux/Slices/Schools/getSchoolThunk';
import { getSchoolBySsymbolThunk } from '../../Redux/Slices/Schools/getSchoolThunk';

// Icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from "@mui/icons-material/Close";

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// import './user.css';

// Styled Components - בדיוק כמו Categories
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

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  border: "1px solid #e0e0e0",
  overflow: "hidden",
  height: 'auto',
  margin: '0 auto',
  maxHeight: '70vh',
  backgroundColor: 'white',
}));

const StyledTableCell = styled(TableCell)(({ theme, header }) => ({
  textAlign: 'center',
  padding: '16px 20px',
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

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    fontSize: "0.9rem",
    fontFamily: 'Rubik, sans-serif',
    "&.Mui-focused": {
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00796b",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: 'Rubik, sans-serif',
    fontSize: "0.9rem",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#00796b",
  },
}));

export const User = () => {
  // Institution color palette - בדיוק כמו Categories
  const colors = {
    primary: "#00796b", // Teal
    primaryLight: "#48a999",
    primaryDark: "#004c40",
    secondary: "#115293", // Deep Blue
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
  const userFromServer = useSelector(s => s.user.allUsers);
  const users = [...userFromServer];
  const currUser = useSelector(s => s.user.currUser);
  const schools = useSelector(s => s.school.allSchools);

  // Local state
  const [showInput, setShowInput] = useState(false);
  const [id, setId] = useState('');
  const [UserName, setUserName] = useState('');
  const [sSymbol, setSsymbol] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [errors, setErrors] = useState({
    id: false,
    UserName: false,
    sSymbol: false
  });
  const [schoolNames, setSchoolNames] = useState({});

  const dispatch = useDispatch();

  // Fetch data
  const getData = async () => {
    setLoading(true);
    try {
      await dispatch(allUsersThunk());
    } catch (error) {
      console.error("Error fetching users:", error);
      setSnackbar({
        open: true,
        message: 'שגיאה בטעינת נתוני משתמשים',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const getSchools = async () => {
    try {
      await dispatch(allSchoolsThunk());
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  const getSchoolName = async (symbol) => {
    if (!schoolNames[symbol]) {
      try {
        const response = await dispatch(getSchoolBySsymbolThunk(symbol)).unwrap();
        if (response && response.schoolName) {
          setSchoolNames(prev => ({
            ...prev,
            [symbol]: response.schoolName
          }));
        }
      } catch (error) {
        console.error("Error fetching school name:", error);
      }
    }
  };

  // Handlers
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  // const handleSchoolFilter = (e) => {
  //   setSchoolFilter(e.target.value);
  //   setPage(0);
  // };

  // const clearFilters = () => {
  //   setSearchTerm('');
  //   setSchoolFilter('');
  //   setSortBy('');
  //   setSortDirection('asc');
  // };

  // Form validation
  const validateForm = () => {
    const newErrors = {
      id: !id.trim(),
      UserName: !UserName.trim(),
      sSymbol: !sSymbol
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error);
  };

  // Add user
  const addUser = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await dispatch(addUserThunk({ id: id, UserName: UserName, schoolSymbol: sSymbol }));

      setId('');
      setUserName('');
      setSsymbol('');
      setShowInput(false);
      getData();

      setSnackbar({
        open: true,
        message: 'המשתמש נוסף בהצלחה',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error adding user:", error);
      setSnackbar({
        open: true,
        message: 'שגיאה בהוספת המשתמש',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort users
  const getFilteredAndSortedUsers = () => {
    let filteredUsers = users.filter(user => {
      // Filter by current user's school or show all for admin
      const schoolMatch =
        String(user.schoolSymbol) === String(currUser.schoolSymbol) ||
        Number(currUser.schoolSymbol) === 0;

      // Filter by search term
      const searchMatch = searchTerm === '' ||
        (user.userName && user.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.id && String(user.id).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.schoolSymbol && String(user.schoolSymbol).includes(searchTerm));

      // Filter by selected school
      const schoolFilterMatch = schoolFilter === '' || String(user.schoolSymbol) === String(schoolFilter);

      return schoolMatch && searchMatch && schoolFilterMatch;
    });

    // Sort users
    if (sortBy) {
      filteredUsers.sort((a, b) => {
        let valueA, valueB;

        if (sortBy === 'userName') {
          valueA = a.userName || '';
          valueB = b.userName || '';
        } else if (sortBy === 'id') {
          valueA = String(a.id || '');
          valueB = String(b.id || '');
        } else if (sortBy === 'schoolSymbol') {
          valueA = Number(a.schoolSymbol || 0);
          valueB = Number(b.schoolSymbol || 0);
          // For numeric values
          return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
          valueA = a[sortBy] || '';
          valueB = b[sortBy] || '';
        }

        // For string values
        if (sortDirection === 'asc') {
          return String(valueA).localeCompare(String(valueB), 'he');
        } else {
          return String(valueB).localeCompare(String(valueA), 'he');
        }
      });
    }

    return filteredUsers;
  };

  // Effects
  useEffect(() => {
    getData();
    getSchools();
  }, []);

  useEffect(() => {
    // Fetch school names for all users
    const uniqueSchoolSymbols = [...new Set(users.map(user => user.schoolSymbol))];
    uniqueSchoolSymbols.forEach(symbol => {
      if (symbol) getSchoolName(symbol);
    });
  }, [users]);

  const filteredUsers = getFilteredAndSortedUsers();

  // Pagination
  const displayedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Active filters count for badge
  const activeFiltersCount = [
    searchTerm !== '',
    schoolFilter !== '',
    sortBy !== ''
  ].filter(Boolean).length;

  // Get school name by symbol
  const getSchoolNameBySymbol = (symbol) => {
    if (schoolNames[symbol]) {
      return schoolNames[symbol];
    }

    const school = schools.find(s => String(s.schoolSymbol) === String(symbol));
    return school ? school.schoolName : symbol;
  };

  return (
    <PageContainer sx={{ direction: 'rtl' }}>
      <ContentContainer maxWidth="lg">
        {/* Header - בדיוק כמו Categories */}
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
              <GroupIcon sx={{ fontSize: 29 }} />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: colors.text,
                  fontFamily: 'Rubik, sans-serif',
                }}
              >
                ניהול משתמשים
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.textLight,
                  fontFamily: 'Rubik, sans-serif',
                }}
              >
                ניהול וצפייה במשתמשי המערכת
              </Typography>
            </Box>
          </Box>


        </Box>

        {/* Search and Filter Section - בדיוק כמו Categories */}
        <FormCard sx={{ mb: 3 }}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <SearchField
                  fullWidth
                  placeholder="חיפוש לפי שם, קוד משתמש או סמל מוסד..."
                  value={searchTerm}
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: colors.textLight }} />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchTerm('')}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel sx={{ fontFamily: 'Rubik, sans-serif' }}>מיון לפי</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="מיון לפי"
                    sx={{
                      borderRadius: 2,
                      fontFamily: 'Rubik, sans-serif',
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                      },
                    }}
                  >
                    <MenuItem value="">ללא מיון</MenuItem>
                    <MenuItem value="userName">שם משתמש</MenuItem>
                    <MenuItem value="id">קוד משתמש</MenuItem>
                    <MenuItem value="schoolSymbol">סמל מוסד</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {sortBy && (
                    <IconButton
                      onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                      sx={{ color: colors.primary }}
                    >
                      {sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </IconButton>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={3} >
                {currUser.schoolSymbol === 0 && (
                  <ActionButton
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={() => setShowInput(true)}
                    sx={{
                      marginRight: "80px",
                      bgcolor: colors.primary,
                      color: "white",
                      "&:hover": {
                        bgcolor: colors.primaryDark,
                      },
                      fontFamily: 'Rubik, sans-serif',
                    }}
                  >
                    הוסף משתמש
                  </ActionButton>
                )}
              </Grid>
            </Grid>



          </Box>

        </FormCard>

        <StyledTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell header="true">
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 1 }}
                    onClick={() => handleSort('id')}>
                    <VpnKeyIcon sx={{ mr: 1, fontSize: 18, color: colors.primary }} />
                    קוד משתמש
                    {sortBy === 'id' && (
                      sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                    )}
                  </Box>
                </StyledTableCell>

                <StyledTableCell header="true">
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('userName')}>
                    <PersonIcon sx={{ mr: 1, fontSize: 18, color: colors.primary }} />
                    שם משתמש
                    {sortBy === 'userName' && (
                      sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                    )}
                  </Box>
                </StyledTableCell>

                <StyledTableCell header="true">
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('schoolSymbol')}>
                    <SchoolIcon sx={{ mr: 1, fontSize: 18, color: colors.primary }} />
                    מוסד
                    {sortBy === 'schoolSymbol' && (
                      sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                    )}
                  </Box>
                </StyledTableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <StyledTableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                    <CircularProgress sx={{ color: colors.primary }} />
                    <Typography sx={{ mt: 2, fontFamily: 'Rubik, sans-serif', color: colors.textLight }}>
                      טוען נתונים...
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              ) : displayedUsers.length === 0 ? (
                <TableRow>
                  <StyledTableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography sx={{ fontFamily: 'Rubik, sans-serif', color: colors.textLight }}>
                      לא נמצאו משתמשים
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              ) : (
                displayedUsers.map((user, index) => (
                  <TableRow
                    key={user.id || index}
                    sx={{
                      '&:hover': {
                        backgroundColor: `${colors.primary}05`,
                      },
                      '&:nth-of-type(even)': {
                        backgroundColor: '#fafafa',
                      },
                    }}
                  >
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}>
                          {user.id}
                        </Typography>
                      </Box>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}>
                          {user.userName || 'לא צוין'}
                        </Typography>
                      </Box>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SchoolIcon sx={{ mr: 1, fontSize: 16, color: colors.textLight }} />
                        <Box>
                          <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: '0.9rem' }}>
                            {getSchoolNameBySymbol(user.schoolSymbol)}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Rubik, sans-serif', color: colors.textLight, fontSize: '0.75rem' }}>
                            סמל: {user.schoolSymbol}
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>


                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="שורות בעמוד:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
            sx={{
              borderTop: `1px solid ${colors.border}`,
              '& .MuiTablePagination-toolbar': {
                fontFamily: 'Rubik, sans-serif',
              },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontFamily: 'Rubik, sans-serif',
              },
            }}
          />
        </StyledTableContainer>



        {/* Information Card - בדיוק כמו Categories */}
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
              • ניתן לחפש לפי שם משתמש, קוד משתמש או סמל מוסד
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textLight, fontFamily: 'Rubik, sans-serif' }}>
              • השתמש בסינונים כדי למצוא במהירות את המשתמש המבוקש
            </Typography>
          </Paper>
        </Box>

        {/* Add User Dialog - בדיוק כמו Categories */}
        <Dialog
          open={showInput}
          onClose={() => setShowInput(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              width: "590px",
              borderRadius: 4,
              pt: 5,
              pb: 3,

              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: `1px solid ${colors.border}`,
            },
          }}
        >
          <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: `${colors.primary}15`,
                  color: colors.primary,
                  width: 50,
                  height: 50,
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
                    fontWeight: 800,
                    color: colors.text,
                    fontFamily: 'Rubik, sans-serif',
                  }}
                >
                  הוספת משתמש חדש
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: colors.textLight,
                    fontFamily: 'Rubik, sans-serif',
                  }}
                >
                  הזן את פרטי המשתמש החדש
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
              onClick={() => (setShowInput(false))}

            >
              <CloseIcon sx={{ fontSize: 47, marginRight: "7px", ml: 4 }} />
            </IconButton>
          </Box>


          <Divider sx={{ mb: 3 }} />
          <DialogContent sx={{
            p: 0,
            '&:first-of-type': {
              pt: 0
            }
          }}>

            <Box sx={{ p: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="קוד משתמש *"
                    variant="outlined"
                    value={id}
                    onChange={(e) => {
                      setId(e.target.value);
                      if (errors.id) setErrors(prev => ({ ...prev, id: false }));
                    }}
                    error={errors.id}
                    helperText={errors.id ? "שדה חובה" : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon sx={{ color: errors.id ? colors.error : colors.primary }} />
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="שם משתמש *"
                    variant="outlined"
                    value={UserName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      if (errors.UserName) setErrors(prev => ({ ...prev, UserName: false }));
                    }}
                    error={errors.UserName}
                    helperText={errors.UserName ? "שדה חובה" : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: errors.UserName ? colors.error : colors.primary }} />
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

                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={errors.sSymbol}
                  >
                    <InputLabel sx={{ fontFamily: 'Rubik, sans-serif' }}>בחר מוסד *</InputLabel>
                    <Select
                      value={sSymbol}
                      onChange={(e) => {
                        setSsymbol(e.target.value);
                        if (errors.sSymbol) setErrors(prev => ({ ...prev, sSymbol: false }));
                      }}
                      label="בחר מוסד *"
                      startAdornment={
                        <InputAdornment position="start">
                          <SchoolIcon sx={{ color: errors.sSymbol ? colors.error : colors.primary, ml: 1 }} />
                        </InputAdornment>
                      }
                      sx={{
                        borderRadius: 2,
                        fontFamily: 'Rubik, sans-serif',
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.primary,
                        },
                      }}
                    >
                      <MenuItem value={0}>מנהל מערכת</MenuItem>
                      {schools.map((school) => (
                        <MenuItem key={school.schoolSymbol} value={school.schoolSymbol}>
                          {school.schoolName} (סמל: {school.schoolSymbol})
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.sSymbol && (
                      <Typography variant="caption" sx={{ color: colors.error, mt: 1, mr: 2, fontFamily: 'Rubik, sans-serif' }}>
                        שדה חובה
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>



          <ActionButton
            variant="contained"
            onClick={addUser}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            sx={{
              bgcolor: colors.primary,
              color: "white",
              ml: 30,
              mr: 30,

              fontFamily: 'Rubik, sans-serif',
              '&:hover': {
                bgcolor: colors.primaryDark
              }
            }}
          >
            לאישור
          </ActionButton>

        </Dialog>

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
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
            
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ContentContainer>
    </PageContainer>
  );
};










