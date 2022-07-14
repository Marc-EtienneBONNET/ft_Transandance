import React from "react";
import { Drawer as MuiDrawer, styled } from "@mui/material";
import { DRAWER_WIDTH } from "../../utils/constants";
import { navClosingStyle, navOpeningStyle } from "../../utils/theme";
import { Routes } from "./Routes/Routes"

interface NavMenuProps {
  open: boolean | undefined;
  toggleMenu: () => void;
}

export const NavMenu = ({ open, toggleMenu }: NavMenuProps) => {
  return (
    <Drawer variant="permanent" open={open} onClose={toggleMenu} >
      <DrawerHeader ></DrawerHeader>
        <Routes />
    </Drawer>
  );
};

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (props) => props !== 'open' })(({ theme, open }) => ({
  with: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...navOpeningStyle(theme),
    '& .MuiDrawer-paper': navOpeningStyle(theme),
  }),
  ...(!open && {
    ...navClosingStyle(theme),
    '& .MuiDrawer-paper': navClosingStyle(theme),
  }),
}));