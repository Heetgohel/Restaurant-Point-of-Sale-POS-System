import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import KitchenView from './pages/KitchenView'; // This is the kitchen-side module

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KitchenView />} />
      </Routes>
    </Router>
  );
}

export default App;
