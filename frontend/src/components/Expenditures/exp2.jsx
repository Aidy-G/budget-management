
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { 
  Button, 
  Dialog, 
  Input, 
  Box, 
  Typography, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Chip,
  Card,
  CardContent,
  Grid,
  Checkbox,
  Tooltip,
  Switch,
  Popover,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { allExpendituresThunk } from '../../Redux/Slices/Expenditures/getExpendituresThunk';
import { getSupplierNameByLNumThunk } from '../../Redux/Slices/Suplliers/getSupplierThunk';
import { allCategoriesThunk } from '../../Redux/Slices/Categories/getCategoriesThunk';
import { getSchoolBySsymbolThunk, GetSumOfEpendituresOfSchool } from '../../Redux/Slices/Schools/getSchoolThunk';
import './expenditure.css';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import DateRangeIcon from '@mui/icons-material/DateRange';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PaymentIcon from '@mui/icons-material/Payment';
import WarningIcon from '@mui/icons-material/Warning';
import DownloadIcon from '@mui/icons-material/Download';

export const Exp = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // שמירה על הקוד המקורי
  const [search, setSearch] = useState(false);
  const [typeSearch, setTypeSearch] = useState('false');
  const [input, setInput] = useState(false);
  const [d, setD] = useState(null);
  
  // מצב חדש לשמירת ההוצאות הרלוונטיות למשתמש
  const [filteredData, setFilteredData] = useState([]);
  
  // מצבים חדשים לאישור ותשלום
  const [approvalStatus, setApprovalStatus] = useState({});
  const [paymentStatus, setPaymentStatus] = useState({});
  const [paymentAmounts, setPaymentAmounts] = useState({});
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFileName, setExportFileName] = useState('הוצאות');
  
 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const navigate  = useNavigate();
  const currUser = useSelector(u => u.user.currUser);
  const currSchool = useSelector(s => s.school.currSchool);
  const sumExps = useSelector(s => s.school.sumExps);
  const categories = useSelector(e => e.category.allCategories || []);
  const allExpenditures = useSelector(e => e.expenditure.allExpenditures || []);

  // Define table columns
  const columns = [
    { id: 'קוד הוצאה', label: 'id', minWidth: 80, align: 'center' },
    {
      id: 'סכום הוצאה',
      label: 'expenditureSum',
      minWidth: 120,
      align: 'center',
      format: (value) => value.toLocaleString('he-IL', { style: 'currency', currency: 'ILS' }),
    },
    currUser.schoolSymbol === 0 && { 
      id: 'סמל מוסד', 
      label: 'schoolSymbol', 
      minWidth: 100, 
      align: 'center'
    },
    { 
      id: 'קטגוריה', 
      label: 'categoryName', 
      minWidth: 120, 
      align: 'center',
      renderCell: (value) => (
        <Chip 
          label={value} 
          size="small" 
          icon={<CategoryIcon />} 
          sx={{ 
           backgroundColor: '#ffffff',
            color: 'black', 
            fontWeight: 500
          }} 
        />
      )
    },
    { 
      id: 'שם ספק', 
      label: 'supplierName', 
      minWidth: 150, 
      align: 'center',
      renderCell: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BusinessIcon sx={{ mr: 1, fontSize: '0.875rem', color: '#00796b' }} />
          {value}
        </Box>
      )
    },
    { 
      id: 'שם המזמין', 
      label: 'ordererName', 
      minWidth: 120, 
      align: 'center',
      
    },
    { 
      id: 'תאריך', 
      label: 'date', 
      minWidth: 100, 
      align: 'center',
      renderCell: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DateRangeIcon sx={{ mr: 1, fontSize: '0.875rem', color: '#00796b' }} />
          {formatDate(value)}
        </Box>
      )
    },
    { 
      id: 'אושר', 
      label: 'approval', 
      minWidth: 80, 
      align: 'center',
      renderCell: (row) => (
        <Box className="approval-cell">
          {currUser.schoolSymbol === 0 ? (
            <Checkbox
              checked={approvalStatus[row.id] || false}
              onChange={() => handleApprovalChange(row.id)}
              icon={<CancelIcon className="cancel-icon" />}
              checkedIcon={<CheckCircleIcon className="check-icon" />}
            />
          ) : (
            <Tooltip title={approvalStatus[row.id] ? "מאושר" : "לא מאושר"}>
              {approvalStatus[row.id] ? 
                <CheckCircleIcon className="check-icon" /> : 
                <CancelIcon className="cancel-icon" />
              }
            </Tooltip>
          )}
        </Box>
      )
    },
    { 
      id: 'סטטוס תשלום', 
      label: 'paymentStatus', 
      minWidth: 150, 
      align: 'center',
      renderCell: (row) => (
        <Box sx={{ textAlign: 'center' }}>
          {paymentStatus[row?.id] ? (
            paymentAmounts[row.id] && paymentAmounts[row.id].expenditureSum < row.expenditureSum ? (
              <Typography variant="body2" sx={{ 
                color: '#ff9800', 
                fontWeight: 600,
                fontSize: '0.75rem'
              }}>
                שולם {paymentAmounts[row.id]?.expenditureSum.toLocaleString('he-IL') || 0} ₪<br/>
                מתוך {row.expenditureSum?.toLocaleString('he-IL') || 0} ₪
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ 
                color: '#4caf50', 
                fontWeight: 600,
                fontSize: '0.8rem'
              }}>
                שולם במלואו
              </Typography>
            )
          ) : (
            <Typography variant="body2" sx={{ 
              color: '#f44336', 
              fontWeight: 600,
              fontSize: '0.8rem'
            }}>
              לא שולם
            </Typography>
          )}
        </Box>
      )
    },
    
    
  ].filter(Boolean);

  const dispatch = useDispatch();

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
  };

  // Helper function to get category color
  const getCategoryColor = (categoryName) => {
    const colors = [
      '#00796b', // teal
      '#0288d1', // blue
      '#7b1fa2', // purple
      '#c2185b', // pink
      '#d32f2f', // red
      '#f57c00', // orange
      '#689f38', // green
      '#5d4037', // brown
    ];
    
    if (!categoryName) return colors[0];
    
    // Generate consistent color based on category name
    let hash = 0;
    for (let i = 0; i < categoryName.length; i++) {
      hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Handle approval status change
  const handleApprovalChange = (id) => {
    if (currUser.schoolSymbol === 0) {
      setApprovalStatus(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

 

  ;



  // קבלת נתונים מהשרת
  // const getData = async () => {
  //   setLoading(true);
  //   setRefreshing(true);
    
  //   try {
  //     // קבלת קטגוריות
  //     await dispatch(allCategoriesThunk());
      
  //     if (currUser.schoolSymbol !== 0) {
  //       // אם זה משתמש רגיל - קבל רק את ההוצאות של בית הספר שלו
  //       await dispatch(getSchoolBySsymbolThunk(currUser.schoolSymbol));
  //     } else {
  //       // אם זה מנהל - קבל את כל ההוצאות
  //       await dispatch(allExpendituresThunk());
  //     }
  //   } catch (error) {
  //     console.error("שגיאה בטעינת נתונים:", error);
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };

  const getData = async () => {
  setLoading(true);
  setRefreshing(true);
  
  try {
    // קבלת קטגוריות - חשוב לכל המשתמשים
    await dispatch(allCategoriesThunk());
    
    if (currUser.schoolSymbol !== 0) {
      // אם זה משתמש רגיל - קבל את ההוצאות של בית הספר שלו
      await dispatch(getSchoolBySsymbolThunk(currUser.schoolSymbol));
      await dispatch(GetSumOfEpendituresOfSchool(currUser.schoolSymbol));
      
      // הוסף טעינת כל ההוצאות גם עבור משתמש רגיל כדי לקבל פרטים מלאים
      await dispatch(allExpendituresThunk());
    } else {
      // אם זה מנהל - קבל את כל ההוצאות
      await dispatch(allExpendituresThunk());
    }
  } catch (error) {
    console.error("שגיאה בטעינת נתונים:", error);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};


  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, [dispatch]);

  // עדכון נתונים כאשר הנתונים מהסטור משתנים
  // useEffect(() => {
  //   if (currUser.schoolSymbol !== 0) {
  //     // אם זה משתמש רגיל - השתמש בנתוני בית הספר
  //     if (currSchool?.expenditures?.length >= 0) {
  //       setFilteredData(currSchool.expenditures || []);
        
  //       // Initialize approval and payment status
  //       const initialApproval = {};
  //       const initialPayment = {};
  //       const initialPaymentAmounts = {};
  //       (currSchool.expenditures || []).forEach(exp => {
  //         initialApproval[exp.id] = false;
  //         initialPayment[exp.id] = false;
  //         initialPaymentAmounts[exp.id] = exp.expenditureSum;
  //       });
  //       setApprovalStatus(initialApproval);
  //       setPaymentStatus(initialPayment);
  //       setPaymentAmounts(initialPaymentAmounts);
  //     }
  //   } else {
  //     // אם זה מנהל - השתמש בכל ההוצאות
  //     if (allExpenditures?.length >= 0) {
  //       setFilteredData(allExpenditures);
        
  //       // Initialize approval and payment status
  //       const initialApproval = {};
  //       const initialPayment = {};
  //       const initialPaymentAmounts = {};
  //       allExpenditures.forEach(exp => {
  //         initialApproval[exp.id] = false;
  //         initialPayment[exp.id] = false;
  //         initialPaymentAmounts[exp.id] = exp.expenditureSum;
  //       });
  //       setApprovalStatus(initialApproval);
  //       setPaymentStatus(initialPayment);
  //       setPaymentAmounts(initialPaymentAmounts);
  //     }
  //   }
  // }, [currSchool, allExpenditures, currUser.schoolSymbol]);

useEffect(() => {
  if (currUser.schoolSymbol !== 0) {
    // אם זה משתמש רגיל - סנן מכל ההוצאות רק את אלה של בית הספר שלו
    if (allExpenditures?.length > 0) {
      const userSchoolExpenditures = allExpenditures.filter(
        exp => exp.schoolSymbol === currUser.schoolSymbol
      );
      setFilteredData(userSchoolExpenditures);
      
      // Initialize approval and payment status
      const initialApproval = {};
      const initialPayment = {};
      const initialPaymentAmounts = {};
      userSchoolExpenditures.forEach(exp => {
        initialApproval[exp.id] = false;
        initialPayment[exp.id] = false;
        initialPaymentAmounts[exp.id] = exp.expenditureSum;
      });
      setApprovalStatus(initialApproval);
      setPaymentStatus(initialPayment);
      setPaymentAmounts(initialPaymentAmounts);
    }
  } else {
    // אם זה מנהל - השתמש בכל ההוצאות
    if (allExpenditures?.length > 0) {
      setFilteredData(allExpenditures);
      
      // Initialize approval and payment status
      const initialApproval = {};
      const initialPayment = {};
      const initialPaymentAmounts = {};
      allExpenditures.forEach(exp => {
        initialApproval[exp.id] = false;
        initialPayment[exp.id] = false;
        initialPaymentAmounts[exp.id] = exp.expenditureSum;
      });
      setApprovalStatus(initialApproval);
      setPaymentStatus(initialPayment);
      setPaymentAmounts(initialPaymentAmounts);
    }
  }
}, [allExpenditures, currUser.schoolSymbol]); // הסר currSchool מהתלויות


  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    
    // Filter data based on search query
    const query = event.target.value.toLowerCase();
    
    // Get the base data to filter from
    const baseData = currUser.schoolSymbol !== 0 ? 
      (currSchool?.expenditures || []) : 
      (allExpenditures || []);
    
    if (query) {
      const filtered = baseData.filter(exp => 
        exp.supplierName?.toLowerCase().includes(query) ||
        exp.categoryName?.toLowerCase().includes(query) ||
        exp.ordererName?.toLowerCase().includes(query) ||
        exp.expenditureSum?.toString().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(baseData);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    
    // Reset to original data
    if (currUser.schoolSymbol !== 0) {
      setFilteredData(currSchool?.expenditures || []);
    } else {
      setFilteredData(allExpenditures || []);
    }
  };

  // Handle refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    await getData();
  };

  const getSupplierName = async (lNum) => {
    return await dispatch(getSupplierNameByLNumThunk(lNum));
  };

  const handleExportToExcel = () => {
    if (!filteredData || filteredData.length === 0) return;

    const safeFileName = (exportFileName || 'הוצאות').trim();
    const finalFileName = safeFileName ? `${safeFileName}.xlsx` : 'הוצאות.xlsx';

    const dataToExport = filteredData.map(exp => ({
      'קוד הוצאה': exp.id,
      'סמל מוסד': exp.schoolSymbol,
      'סכום הוצאה': exp.expenditureSum,
      'קטגוריה': exp.categoryName,
      'שם ספק': exp.supplierName,
      'שם המזמין': exp.ordererName,
      'תאריך': formatDate(exp.date),
      'אושר': approvalStatus[exp.id] ? 'כן' : 'לא',
      'סטטוס תשלום': paymentStatus[exp.id] ?
        (paymentAmounts[exp.id] && paymentAmounts[exp.id].expenditureSum < exp.expenditureSum ? 'תשלום חלקי' : 'שולם במלואו') :
        'לא שולם',
      'סכום ששולם': paymentStatus[exp.id] && paymentAmounts[exp.id]
        ? paymentAmounts[exp.id].expenditureSum ?? paymentAmounts[exp.id]
        : 0,
      'יתרה לתשלום': paymentStatus[exp.id] && paymentAmounts[exp.id]
        ? Math.max((exp.expenditureSum || 0) - (paymentAmounts[exp.id].expenditureSum ?? paymentAmounts[exp.id]), 0)
        : (exp.expenditureSum || 0),
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport, {
      header: [
        'קוד הוצאה', 'סמל מוסד', 'סכום הוצאה', 'קטגוריה',
        'שם ספק', 'שם המזמין', 'תאריך', 'אושר', 'סטטוס תשלום', 'סכום ששולם', 'יתרה לתשלום'
      ]
    });

    ws['!cols'] = [
      { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 15 },
      { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 8 }, { wch: 16 }, { wch: 12 }, { wch: 12 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'הוצאות');

    XLSX.writeFile(wb, finalFileName);
    setExportDialogOpen(false);
  };

  const ci = categories?.filter(c => c?.categoryName?.includes(d));

  return (
    <Paper className="expenditures-container" sx={{ 
      direction: 'rtl',
      width: '95%', 
      overflow: 'hidden',
      borderRadius: '16px',
      // boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      margin: '0 auto'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px',
        padding: '20px 24px 0'
      }}>
        <Box className="header-with-icon">
          <ReceiptIcon className="header-icon" />
          <Box>
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 700, 
              color: '#263238', 
              marginBottom: '8px' 
            }}>
              ניהול הוצאות
            </Typography>
            <Typography variant="body1" sx={{ color: '#546e7a' }}>
              צפייה וניהול של כל ההוצאות במערכת
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon sx={{ml:0.5}}/>}
            onClick={() => navigate('/addExpenditure')}
            sx={{
              bgcolor: '#00796b',
              '&:hover': { bgcolor: '#00695c' },
              borderRadius: '30px',
              padding: '8px 16px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            הוספת הוצאה
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<RefreshIcon sx={{ml:2, animation: refreshing ? 'spin 1s infinite linear' : 'none' }} />}
            sx={{
              borderColor: '#00796b',
              color: '#00796b',
              '&:hover': { borderColor: '#00695c', color: '#00695c' },
              borderRadius: '30px',
              padding: '8px 16px',
              textTransform: 'none',
              fontWeight: 600,
            }}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            רענון
          </Button>

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => {
              setExportFileName(
                currUser?.schoolSymbol === 0
                  ? 'הוצאות_כלל_המוסדות'
                  : `הוצאות_מוסד_${currUser?.schoolSymbol || 'נוכחי'}`
              );
              setExportDialogOpen(true);
            }}
            disabled={filteredData.length === 0}
            sx={{
              borderColor: '#00796b',
              color: '#00796b',
              '&:hover': { borderColor: '#00695c', color: '#00695c' },
              borderRadius: '30px',
              padding: '8px 16px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            ייצוא לאקסל
          </Button>

          <p>תקציב : {currSchool?.budget }</p>
          <p>סך כל ההוצאות: {sumExps}</p>
        </Box>
      </Box>
      
      <Card sx={{ 
        margin: '0 24px 24px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="חיפוש לפי ספק, קטגוריה, מזמין או סכום..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
                backgroundColor: '#ffffff',
                transition: 'box-shadow 0.3s ease',
                '&.Mui-focused': {
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00796b', 
                
                },
                
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>
      
      {/* שמירה על הקוד המקורי */}
      {search && (
        <Dialog open hidden={!search}>
          <Button onClick={() => {setTypeSearch('date'); setSearch(false); setInput(true)}}>תאריך</Button>
          <Button onClick={() => {setTypeSearch('supName'); setSearch(false); setInput(true)}}>שם ספק</Button>
          <Button onClick={() => {setTypeSearch('category'); setSearch(false); setInput(true)}}>קטגוריה</Button>
          <Button onClick={() => {setTypeSearch('school'); setSearch(false); setInput(true)}}>שם מוסד</Button>
        </Dialog>
      )}
      
      {input && <Input value={d} onChange={(t) => setD(t.target.value)} />}
      
      {typeSearch === 'category' && ci && (
        <div>
          {ci.map((c) => (
            <div key={c.id || c.categoryName} onClick={() => setD(c.categoryName)}> 
              {c.categoryName}
            </div>
          ))}
        </div>
      )}
      
      <Box className="table-wrapper" sx={{ margin: '0 24px' }}>
        <TableContainer className="expenditures-table-container" sx={{
          maxHeight: '440px',
          borderRadius: '16px',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '10px',
            '&:hover': {
              background: '#a8a8a8',
            },
          },
        }}>
          <Table stickyHeader aria-label="טבלת הוצאות" className="expenditures-table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ 
                      minWidth: column.minWidth,
                      backgroundColor: '#00796b',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {column.id}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                    <Typography>טוען נתונים...</Typography>
                  </TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                    <Typography>לא נמצאו הוצאות</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow 
                        hover 
                        role="checkbox" 
                        tabIndex={-1} 
                        key={row.id || index}
                        sx={{
                          backgroundColor: index % 2 === 0 ? 'rgba(224, 242, 241, 0.3)' : 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 121, 107, 0.08)',
                          },
                        }}
                      >
                        {columns.map((column) => {
                          if (column.label === 'approval') {
                            return (
                              <TableCell 
                                key={column.id} 
                                align={column.align}
                                sx={{
                                  padding: '8px',
                                  fontSize: '0.875rem',
                                }}
                              >
                                {column.renderCell(row)}
                              </TableCell>
                            );
                          } else if (column.label === 'payment') {
                            return (
                              <TableCell 
                                key={column.id} 
                                align={column.align}
                                sx={{
                                  padding: '8px',
                                  fontSize: '0.875rem',
                                }}
                              >
                                {column.renderCell(row)}
                              </TableCell>
                            );
                          }
                          
                          const value = row[column.label];
                          return (
                            <TableCell 
                              key={column.id} 
                              align={column.align}
                              sx={{
                                padding: '8px 16px',
                                fontSize: '0.875rem',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {column.renderCell && column.label !== 'actions' && column.label !== 'approval' && column.label !== 'payment'
                                ? column.renderCell(value)
                                : column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : column.label === 'date'
                                    ? formatDate(value)
                                    : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="שורות בעמוד:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
        sx={{ 
          borderTop: '1px solid #e0e0e0',
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiTablePagination-select, .MuiTablePagination-selectIcon': {
            fontFamily: 'inherit',
          },
          padding: '0 24px'
        }}
      />
      
      {/* Summary Card */}
      <Box sx={{ mt: 3, padding: '0 24px 24px' }}>
        <Card sx={{ 
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 121, 107, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <Typography sx={{ color: '#00796b' }}>₪</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#546e7a' }}>
                      סך הכל הוצאות
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {filteredData.reduce((sum, exp) => sum + (exp.expenditureSum || 0), 0).toLocaleString('he-IL', { style: 'currency', currency: 'ILS' })}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 121, 107, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <Typography sx={{ color: '#00796b' }}>#</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#546e7a' }}>
                      מספר הוצאות
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {filteredData.length} {filteredData.length === 1 ? 'הוצאה' : 'הוצאות'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 121, 107, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <CategoryIcon sx={{ color: '#00796b' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#546e7a' }}>
                      קטגוריות
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {new Set(filteredData.map(exp => exp.categoryName)).size}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>שם קובץ לייצוא</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="שם קובץ"
            fullWidth
            variant="outlined"
            value={exportFileName}
            onChange={(e) => setExportFileName(e.target.value)}
            placeholder="לדוגמה: הוצאות_ספטמבר"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleExportToExcel} sx={{ bgcolor: '#00796b', '&:hover': { bgcolor: '#00695c' } }}>
            שמור וקובץ Excel
          </Button>
        </DialogActions>
      </Dialog>
      
    </Paper>
  );
};

// export default Exp;
