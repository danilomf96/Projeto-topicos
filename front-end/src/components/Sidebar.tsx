import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import { Link as RouterLink } from 'react-router-dom';


const Sidebar = () => (
  <Drawer variant="permanent" anchor="left">
    <List>
      <ListItemButton component={RouterLink} to="/categorias">
        <ListItemIcon><CategoryIcon /></ListItemIcon>
        <ListItemText primary="Categorias" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/produtos">
        <ListItemIcon><StoreIcon /></ListItemIcon>
        <ListItemText primary="Produtos" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/filiais">
        <ListItemIcon><BusinessIcon /></ListItemIcon>
        <ListItemText primary="Filiais" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/funcionarios">
        <ListItemIcon><PeopleIcon /></ListItemIcon>
        <ListItemText primary="Funcionários" />
      </ListItemButton>
    </List>
  </Drawer>
);

export default Sidebar;
