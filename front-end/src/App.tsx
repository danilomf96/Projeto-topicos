import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CategoriasPage from './pages/CategoriasPage';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box display="flex">
        <Sidebar />
        <Box flex={1} ml={30}>
          <Routes>
            <Route path="/" element={<Navigate to="/categorias" />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            {/* Adicione os outros routes aqui depois */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
