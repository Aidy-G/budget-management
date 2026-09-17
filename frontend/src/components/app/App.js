import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routing } from '../Routing';
import { Layout } from '../Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routing />
      </Layout>
    </Router>
  );
}

export default App;