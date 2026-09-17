import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Routing } from '../Routing';
import { Layout } from '../Layout';
import { restoreUserFromSession } from '../../Redux/Slices/Users/userSlice';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUserFromSession());
  }, [dispatch]);

  return (
    <Layout>
      <Routing />
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;