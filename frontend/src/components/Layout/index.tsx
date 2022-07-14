import { useState } from "react";
import { styled, Box } from "@mui/material";
import { FOOTER_HEIGHT } from "../../utils/constants";
import { Footer } from "../Footer";
import { NavMenu } from "../Menu";
import { Header } from "../Header/header";

const LayoutWrapper = styled('div')`
  min-height: 100vh;
`;

const ContentWrapper = styled('div')`
  display: flex;
  min-height: calc(100vh - ${FOOTER_HEIGHT}px);
`;

const DrawerHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((isOpen) => !isOpen);

    return (
        <LayoutWrapper>
            <ContentWrapper>
                <Box component="header">
                    <Header toggleMenu={toggleMenu} />
                </Box>
                <NavMenu open={isOpen} toggleMenu={toggleMenu}></NavMenu>
                <Box component="main" sx = {{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    {props.children}
                </Box>
            </ContentWrapper>
            <Box component="footer">
                    <Footer />
            </Box>
        </LayoutWrapper>
    );
};