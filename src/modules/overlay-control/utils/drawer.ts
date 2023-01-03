import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

export interface DrawerLink {
  title: string;
  to: string;
  exact?: boolean;
  icon: React.ComponentType;
}

export const drawer: DrawerLink[] = [
  {
    title: 'Home',
    to: '/',
    exact: true,
    icon: HomeIcon,
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: SettingsIcon,
  },
];
