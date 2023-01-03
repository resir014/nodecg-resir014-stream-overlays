import {
  Box,
  CssBaseline,
  Drawer,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { LayoutRoot } from '~/components/layout';

import './overlay-control.dashboard.css';
import { drawer } from '~/modules/overlay-control/utils/drawer';
import { SettingsPage } from '~/modules/overlay-control/settings-page';
import { HomePage } from '~/modules/overlay-control/home-page';

const theme = extendTheme({
  // ...
});

const drawerWidth = 240;

function DashboardRoot() {
  return (
    <CssVarsProvider theme={theme} defaultColorScheme="dark">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <MemoryRouter>
          <LayoutRoot>
            <Box sx={{ display: 'flex' }}>
              <Box
                component="nav"
                sx={{ width: drawerWidth, flexShrink: 0 }}
                aria-label="mailbox folders"
              >
                <Drawer
                  variant="permanent"
                  sx={{
                    display: 'block',
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                  open
                >
                  <List>
                    {drawer.map(item => (
                      <ListItem key={item.to} disablePadding>
                        <ListItemButton component={Link} to={item.to}>
                          <ListItemIcon>{React.createElement(item.icon)}</ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
              </Box>
              <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Box>
            </Box>
          </LayoutRoot>
        </MemoryRouter>
      </LocalizationProvider>
    </CssVarsProvider>
  );
}

ReactDOM.render(<DashboardRoot />, document.getElementById('root'));
