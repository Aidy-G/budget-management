import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getSchoolBySsymbolThunk, getExpendituresOfSchool, GetSumOfEpendituresOfSchool } from '../../Redux/Slices/Schools/getSchoolThunk';
import { allCategoriesThunk } from '../../Redux/Slices/Categories/getCategoriesThunk';
import { Box, Paper, Typography, Grid, Card, CardContent, Button, Avatar, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import DownloadIcon from '@mui/icons-material/Download';
import { styled } from '@mui/material/styles';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import * as XLSX from 'xlsx';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  marginBottom: 20,
}));

const StatCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  padding: 12,
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#F1948A'];

export const SchoolDetail = () => {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const school = useSelector(s => s.school?.currSchool || {});
  const expenditures = useSelector(s => s.school?.exp || []);
  const totalSum = useSelector(s => s.school?.sumExps || 0);
  const categories = useSelector(s => s.category?.allCategories || []);

  useEffect(() => {
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
  }, [symbol, dispatch]);

  const remainingBudget = useMemo(() => {
    const budget = Number(school?.budget) || 0;
    return budget - Number(totalSum || 0);
  }, [school, totalSum]);

  const byCategory = useMemo(() => {
    const map = {};
    (expenditures || []).forEach(e => {
      const name = e.categoryName || 'לא משוייך';
      map[name] = (map[name] || 0) + (Number(e.expenditureSum) || 0);
    });
    return Object.keys(map).map((k, i) => ({ name: k, value: map[k], color: COLORS[i % COLORS.length] }));
  }, [expenditures]);

  const monthlyTrend = useMemo(() => {
    const map = {};
    (expenditures || []).forEach(e => {
      const d = new Date(e.date);
      if (isNaN(d)) return;
      const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
      map[key] = (map[key] || 0) + (Number(e.expenditureSum) || 0);
    });
    return Object.keys(map).sort().map(k => ({ month: k, value: map[k] }));
  }, [expenditures]);

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet((expenditures || []).map(e => ({
      id: e.id,
      date: e.date,
      sum: e.expenditureSum,
      category: e.categoryName,
      supplier: e.supplierName,
      orderer: e.ordererName,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'expenditures');
    XLSX.writeFile(wb, `expenditures_${symbol || 'school'}.xlsx`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Header>
        <Avatar sx={{ bgcolor: '#00796b', width: 56, height: 56 }}>
          <SchoolIcon />
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{school?.schoolName || symbol}</Typography>
          <Typography variant="body2" color="text.secondary">סמל מוסד: {school?.schoolSymbol || symbol}</Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={exportCSV}>ייצוא הוצאות</Button>
        </Box>
      </Header>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="subtitle2">תקציב</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{school?.budget ? `${Number(school.budget).toLocaleString()} ₪` : 'לא הוגדר'}</Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="subtitle2">הוצאות סה"כ</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{Number(totalSum || 0).toLocaleString()} ₪</Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="subtitle2">יתרת תקציב</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{remainingBudget.toLocaleString()} ₪</Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="subtitle2">מספר הוצאות</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{(expenditures || []).length}</Typography>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>מגמת הוצאות חודשי</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
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
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>חלוקת הוצאות לפי קטגוריה</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {byCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>הוצאות אחרונות</Typography>
            <Divider sx={{ mb: 2 }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>תאריך</TableCell>
                  <TableCell>סכום</TableCell>
                  <TableCell>קטגוריה</TableCell>
                  <TableCell>ספק</TableCell>
                  <TableCell>שם מזמין</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(expenditures || []).slice(0, 20).map(row => (
                  <TableRow key={row.id} hover>
                    <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                    <TableCell>{Number(row.expenditureSum).toLocaleString()} ₪</TableCell>
                    <TableCell>{row.categoryName}</TableCell>
                    <TableCell>{row.supplierName}</TableCell>
                    <TableCell>{row.ordererName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SchoolDetail;
