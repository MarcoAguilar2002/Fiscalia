import * as React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, ListItemButton, ListItem, ListItemText,
  ListItemIcon, Box, CssBaseline, Avatar, Divider, MenuItem, Tooltip, Menu
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import logo from '../images/logoFiscaliaLiber.png';
import { Link,useLocation } from 'react-router-dom'; // Importación correcta de Link
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import UploadIcon from '@mui/icons-material/Upload';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Outlet } from "react-router-dom"; // Importa Outlet para las rutas anidadas


const drawerWidth = 240;

export default function Dashboard({ content }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true); // Estado para controlar el drawer en pantallas grandes
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen); // Controla el drawer temporal (pantallas pequeñas)
  };

  const handleDrawerToggleDesktop = () => {
    setDrawerOpen(!drawerOpen); // Controla el drawer en pantallas grandes
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <div>
      <Drawer
        variant="permanent"  // Usamos el Drawer permanente para pantallas grandes
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor: '#003366',  // Aquí establecemos el fondo para todo el drawer
            color: 'white',  // Opcional: para asegurarnos que el texto y los íconos sean blancos
            height: '100%',  // Esto asegura que el Drawer ocupe toda la altura disponible
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            backgroundColor: '#fff',
          }}
        >
          <img
            alt="Logo Fiscalia"
            src={logo}
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </Box>
        <Divider />
        
        {/* Opciones del menú con fondo azul */}
        <Box sx={{ width: '100%' }}>
          <ListItem key={1} disablePadding>
            <ListItemButton component={Link} to={"/"} selected={"/" === location.pathname}
            
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#003e7c', // Color de fondo cuando está seleccionado
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: '#e0e0e0', // Color más claro para los íconos y texto al estar seleccionado
                },
              }}}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Inicio"} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
  
          <ListItem key={2} disablePadding>
            <ListItemButton component={Link} to={"/casos"} selected={"/casos" === location.pathname}
             sx={{
              '&.Mui-selected': {
                backgroundColor: '#003e7c', // Color de fondo cuando está seleccionado
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: '#e0e0e0', // Color más claro para los íconos y texto al estar seleccionado
                },
              }}}>
              <ListItemIcon sx={{ color: 'white' }}>
                <UploadIcon />
              </ListItemIcon>
              <ListItemText primary={"Expedientes"} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
  
          <ListItem key={3} disablePadding>
            <ListItemButton component={Link} to={"/buscar"} selected={"/buscar" === location.pathname}
             sx={{
              '&.Mui-selected': {
                backgroundColor: '#003e7c', // Color de fondo cuando está seleccionado
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: '#e0e0e0', // Color más claro para los íconos y texto al estar seleccionado
                },
              }}}>
              <ListItemIcon sx={{ color: 'white' }}>
                <ContentPasteSearchIcon />
              </ListItemIcon>
              <ListItemText primary={"Buscar"} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
  
          <ListItem key={4} disablePadding>
            <ListItemButton component={Link} to={"/logout"}  sx={{
              '&.Mui-selected': {
                backgroundColor: '#003e7c', // Color de fondo cuando está seleccionado
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: '#e0e0e0', // Color más claro para los íconos y texto al estar seleccionado
                },
              }}}>
              <ListItemIcon sx={{ color: 'white' }}>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Salir"} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </div>
  );
  

  const userMenuOptions = [
    { label: 'Ver Perfil', path: '/perfil' }, // Ruta de perfil
    { label: 'Editar Perfil', path: '/editar-perfil' } // Ruta para editar perfil
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
          ml: { sm: `${drawerOpen ? drawerWidth : 0}px` },
          backgroundColor: '#003366', // Cambia '#ff9800' al color que prefieras
        }}
      >
        <Toolbar> 

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}  // Controla el drawer temporal (pantallas pequeñas)
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}  // Solo se muestra en pantallas pequeñas
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Distrito Fiscal de la Libertad
          </Typography>

          <Tooltip title="Abrir configuración">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Foto De Perfil" src="https://via.placeholder.com/150" />
            </IconButton>
          </Tooltip>

          <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {userMenuOptions.map((option) => (
          <MenuItem key={option.label} onClick={handleCloseUserMenu}>
            <Link to={option.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography textAlign="center">{option.label}</Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>

        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu options"
        
      >
        {/* Drawer temporal (pantallas pequeñas) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer permanente (pantallas grandes) */}
        <Drawer
          variant="persistent"
          open={drawerOpen} // Controlado por drawerOpen
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` }, // Ajusta el contenido según si el drawer está abierto
        }}
      >
        <Toolbar />
        <Outlet /> 
      </Box>
    </Box>
  );
}
