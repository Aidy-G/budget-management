import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allExpendituresThunk } from '../../Redux/Slices/Expenditures/getExpendituresThunk';
import { allSchoolsThunk } from '../../Redux/Slices/Schools/getSchoolThunk';
import { Box, Paper, Typography, Grid, Card, CardContent, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

const StatCard = styled(Card)(({ theme }) => ({ padding: 12, borderRadius: 12 }));

export const Reports = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const expenditures = useSelector(s => s.expenditure?.allExpenditures || []);
  const schools = useSelector(s => s.school?.allSchools || []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await dispatch(allExpendituresThunk()).unwrap();
        await dispatch(allSchoolsThunk()).unwrap();
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    load();
  }, [dispatch]);

  const totalsBySchool = useMemo(() => {
    const map = {};
    (expenditures || []).forEach(e => {
      const s = e.schoolSymbol || 'לא ידוע';
      map[s] = (map[s] || 0) + (Number(e.expenditureSum) || 0);
    });
    return Object.keys(map).map(k => ({ schoolSymbol: k, total: map[k] }));
  }, [expenditures]);

  const exportAll = () => {
    const ws = XLSX.utils.json_to_sheet(expenditures.map(e => ({
      id: e.id,
      date: e.date,
      sum: e.expenditureSum,
      school: e.schoolSymbol,
      category: e.categoryName,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'expenditures');
    XLSX.writeFile(wb, `all_expenditures.xlsx`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>דוחות מערכת</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="subtitle2">סה"כ הוצאות מערכת</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{(expenditures || []).reduce((s, e) => s + (Number(e.expenditureSum) || 0), 0).toLocaleString()} ₪</Typography>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="subtitle2">מספר מוסדות</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{(schools || []).length}</Typography>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="contained" onClick={exportAll}>ייצוא כל ההוצאות</Button>
          <TextField label="מסנן חיפוש" variant="outlined" size="small" />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>סה"כ לפי מוסד</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={totalsBySchool.map((r, i) => ({ id: i, ...r }))} columns={[{ field: 'schoolSymbol', headerName: 'מוסד', width: 200 }, { field: 'total', headerName: 'סה"כ הוצאות', width: 200 }]} pageSize={10} rowsPerPageOptions={[10]} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
