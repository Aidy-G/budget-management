import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSchoolBySsymbolThunk, getExpendituresOfSchool, GetSumOfEpendituresOfSchool } from '../../Redux/Slices/Schools/getSchoolThunk';
import { allCategoriesThunk } from '../../Redux/Slices/Categories/getCategoriesThunk';
import { Box, Paper, Typography, Grid, Card, CardContent, Button, Avatar, Divider } from '@mui/material';
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
    const load = async () => {
      if (!currUser?.schoolSymbol) return;
      setLoading(true);
      try {
        await dispatch(getSchoolBySsymbolThunk(currUser.schoolSymbol)).unwrap();
        await dispatch(getExpendituresOfSchool(currUser.schoolSymbol)).unwrap();
        await dispatch(GetSumOfEpendituresOfSchool(currUser.schoolSymbol)).unwrap();
        await dispatch(allCategoriesThunk()).unwrap();
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    load();
  }, [currUser?.schoolSymbol, dispatch]);

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

  if (!currUser?.schoolSymbol) {
    return (
      <Page>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">אין סמל מוסד למשתמש הנוכחי.</Typography>
          <Typography variant="body2">רק משתמשים המשויכים למוסד יראו כאן נתונים.</Typography>
        </Paper>
      </Page>
    );
  }

  return (
    <Page>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ bgcolor: '#00796b' }}><SchoolIcon /></Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{school?.schoolName || currUser.schoolSymbol}</Typography>
          <Typography variant="body2" color="text.secondary">סמל: {currUser.schoolSymbol}</Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={exportXlsx}>ייצוא</Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Stat>
            <CardContent>
              <Typography variant="caption">תקציב</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{school?.budget ? `${Number(school.budget).toLocaleString()} ₪` : 'לא הוגדר'}</Typography>
            </CardContent>
          </Stat>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stat>
            <CardContent>
              <Typography variant="caption">הוצאות עד כה</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{Number(totalSum || 0).toLocaleString()} ₪</Typography>
            </CardContent>
          </Stat>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stat>
            <CardContent>
              <Typography variant="caption">יתרת חשבון</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{remaining.toLocaleString()} ₪</Typography>
            </CardContent>
          </Stat>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stat>
            <CardContent>
              <Typography variant="caption">מספר הוצאות</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{(expenditures || []).length}</Typography>
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
            {(expenditures || []).slice(0, 10).map(e => (
              <Box key={e.id} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
                <Typography>{new Date(e.date).toLocaleDateString()}</Typography>
                <Typography>{e.categoryName}</Typography>
                <Typography sx={{ fontWeight: 700 }}>{Number(e.expenditureSum).toLocaleString()} ₪</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default SchoolDashboard;
