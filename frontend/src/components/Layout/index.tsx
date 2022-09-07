import { useEffect, useState } from "react";
import { styled, Box } from "@mui/material";
import { FOOTER_HEIGHT } from "../../utils/constants";
import { Footer } from "../Footer";
import { NavMenu } from "../Menu";
import { Header } from "../Header/header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    const [unauth, setUnauth] = useState(false);
    const toggleMenu = () => setIsOpen((isOpen) => !isOpen);
    let nav = useNavigate();
    
    useEffect(() => {
        let bool = true;
        const authorize = async () => {
            try {
                const user = await axios.get('userData');
                const user2 = await axios.get('userId');
                axios.post('/game/checkEnd', {id:user2.data})
                axios.post('user/setOnStatus')
                if (user.data.status === 'OFFLINE')
                    setUnauth(true);
            }
            catch (error) {
                if (bool)
                    setUnauth(true);
            }
        }
        authorize();
        return () => {bool = false;}
    },[]);
    
    useEffect(() => {
        if (unauth){
            return nav("/");
        }
    }, [unauth, nav]);

    return (
        <LayoutWrapper style={{width: "100%", height: "100%"}}>
            <ContentWrapper style={{width: "100%", height: "100%"}}>
                <Box component="header">
                    <Header toggleMenu={toggleMenu} />
                </Box>
                <NavMenu open={isOpen} toggleMenu={toggleMenu}></NavMenu>
                <Box component="main" sx = {{ flexGrow: 1, p: 3 }} style={{width: "100%", height: "100%"}}>
                    <DrawerHeader/>
                    {props.children}
                </Box>
            </ContentWrapper>
            <Box component="footer" style={{width: "100%", height: "5%"}}>
                    <Footer />
            </Box>
        </LayoutWrapper>
    );
};