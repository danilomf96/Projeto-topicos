import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CategoriasPage from './pages/CategoriasPage';
import ProdutosPage from './pages/ProdutosPage';
import FiliaisPage from './pages/FiliaisPage';
import FuncionariosPage from './pages/FuncionariosPage';
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
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/filiais" element={<FiliaisPage />} />
            <Route path="/funcionarios" element={<FuncionariosPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
