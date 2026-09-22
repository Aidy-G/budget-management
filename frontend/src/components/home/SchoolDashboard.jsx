import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSchoolBySsymbolThunk, getExpendituresOfSchool, GetSumOfEpendituresOfSchool } from '../../Redux/Slices/Schools/getSchoolThunk';
import { allCategoriesThunk } from '../../Redux/Slices/Categories/getCategoriesThunk';
import { Box, Paper, Typography, Grid, Card, CardContent, Button, Avatar, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';

const Page = styled(Box)(({ theme }) => ({
  minHeight: '70vh',
  padding: theme.spacing(3),
}));

const Stat = styled(Card)(({ theme }) => ({ padding: theme.spacing(1.5), borderRadius: 12 }));

const COLORS = ['#00796b', '#0288d1', '#ff9800', '#4caf50', '#8e24aa'];

const colors = {
  primary: '#00796b',
  secondary: '#0288d1',
  text: '#263238',
  textLight: '#546e7a',
  border: '#e0e0e0',
};

export const SchoolDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector(s => s.user?.currUser || {});
  const school = useSelector(s => s.school?.currSchool || {});
  const expenditures = useSelector(s => s.school?.exp || []);
  const totalSum = useSelector(s => s.school?.sumExps || 0);
  const categories = useSelector(s => s.category?.allCategories || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const symbol = currUser?.schoolSymbol ?? currUser?.institutionId ?? currUser?.schoolId;
    if (symbol === undefined || symbol === null) return;

    const load = async () => {
      setLoading(true);
      try {
        await dispatch(getSchoolBySsymbolThunk(symbol)).unwrap();
        await dispatch(getExpendituresOfSchool(symbol)).unwrap();
        await dispatch(GetSumOfEpendituresOfSchool(symbol)).unwrap();
        await dispatch(allCategoriesThunk()).unwrap();
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    load();
  }, [currUser, dispatch]);

  const remaining = useMemo(() => {
    const b = Number(school?.budget) || 0;
    return b - Number(totalSum || 0);
  }, [school, totalSum]);

  const byCategory = useMemo(() => {
    const map = {};
    (expenditures || []).forEach(e => {
      const k = e.categoryName || 'לא משוייך';
      map[k] = (map[k] || 0) + (Number(e.expenditureSum) || 0);
    });
    return Object.keys(map).map((k, i) => ({ name: k, value: map[k], color: COLORS[i % COLORS.length] }));
  }, [expenditures]);

  const monthly = useMemo(() => {
    const map = {};
    (expenditures || []).forEach(e => {
      const d = new Date(e.date);
      if (isNaN(d)) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      map[key] = (map[key] || 0) + (Number(e.expenditureSum) || 0);
    });
    return Object.keys(map).sort().map(k => ({ month: k, value: map[k] }));
  }, [expenditures]);

  const exportXlsx = () => {
    const ws = XLSX.utils.json_to_sheet((expenditures || []).map(e => ({ date: e.date, sum: e.expenditureSum, category: e.categoryName, supplier: e.supplierName })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'exp');
    XLSX.writeFile(wb, `${currUser.schoolSymbol || 'school'}_expenditures.xlsx`);
  };

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


  const symbol = currUser?.schoolSymbol ?? currUser?.institutionId ?? currUser?.schoolId;
  if (symbol === undefined || symbol === null) {
    return (
      <Page>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ color: colors.text }}>אין סמל מוסד למשתמש הנוכחי</Typography>
          <Typography variant="body2" sx={{ color: colors.textLight }}>רק משתמשים המשויכים למוסד יראו כאן נתונים. אם אתה אמור להיות משויך למוסד, בדוק פרטי המשתמש.</Typography>
        </Paper>
      </Page>
    );
  }

  // Admin (schoolSymbol === 0) sees reports instead of single-school dashboard
  if (Number(symbol) === 0) {
    return (
      <Page>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ color: colors.text }}>אתה משתמש בעל הרשאות מנהל</Typography>
          <Typography variant="body2" sx={{ color: colors.textLight, mb: 2 }}>כלי זה מיועד ללוח בקרה של מוסד בודד. עבור לצפייה בדוחות מערכת או בחר מוסד ספציפי.</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={() => navigate('/reports')}>דוחות מערכת</Button>
            <Button variant="outlined" onClick={() => navigate('/schools')}>בחר מוסד</Button>
          </Box>
        </Paper>
      </Page>
    );
  }

  return (
    <Page>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ bgcolor: '#00796b' }}><SchoolIcon /></Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: colors.text }}>{school?.schoolName || symbol}</Typography>
          <Typography variant="body2" sx={{ color: colors.textLight }}>סמל: {symbol}</Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>

          
          <ActionButton
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={exportXlsx}
            sx={{direction:'rtl',width:'auto',height:'auto',mr:90}}
          >
ייצוא לאקסל
          </ActionButton>
           
           
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Stat>
            <CardContent>
              <Typography variant="caption" sx={{fontSize:15,fontWeight:400}}>תקציב</Typography>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>{school?.budget ? `${Number(school.budget).toLocaleString()} ₪` : 'לא הוגדר'}</Typography>
            </CardContent>
          </Stat>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stat>
            <CardContent>
              <Typography variant="caption" sx={{fontSize:15,fontWeight:400}}>הוצאות עד כה</Typography >
              <Typography variant="h6" sx={{ fontWeight: 900 }}>{Number(totalSum || 0).toLocaleString()} ₪</Typography>
            </CardContent>
          </Stat>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stat>
            <CardContent>
              <Typography variant="caption" sx={{fontSize:15,fontWeight:400}}>יתרת חשבון</Typography>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>{remaining.toLocaleString()} ₪</Typography>
            </CardContent>
          </Stat>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stat>
            <CardContent>
              <Typography variant="caption" sx={{fontSize:15,fontWeight:400}}>מספר הוצאות</Typography>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>{(expenditures || []).length}</Typography>
            </CardContent>
          </Stat>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 340 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>מגמת הוצאות</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#00796b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 340 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>חלוקה לפי קטגוריות</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {byCategory.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>הוצאות אחרונות</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>תאריך</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>סכום</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>קטגוריה</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>ספק</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>שם מזמין</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(expenditures || []).slice(0, 10).map(e => (
                  <TableRow key={e.id} hover>
                    <TableCell align="right" sx={{ py: 0.6, fontSize: '0.95rem' }}>{new Date(e.date).toLocaleDateString()}</TableCell>
                    <TableCell align="right" sx={{ py: 0.6, fontWeight: 700 }}>{Number(e.expenditureSum).toLocaleString()} ₪</TableCell>
                    <TableCell align="right" sx={{ py: 0.6 }}>{e.categoryName || '-'}</TableCell>
                    <TableCell align="right" sx={{ py: 0.6 }}>{e.supplierName || '-'}</TableCell>
                    <TableCell align="right" sx={{ py: 0.6 }}>{e.ordererName || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default SchoolDashboard;
