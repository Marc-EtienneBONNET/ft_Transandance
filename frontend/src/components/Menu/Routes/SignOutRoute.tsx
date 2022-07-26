import { ListItemButton, ListItemIcon, ListItemText, IconButton, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Leaderboard_Database } from '../../Pages/Social/Leaderboard/database';

export const SignOutRoute = () => {
    const handleSignOutClick = async () => {
        //await serverpost("logout")
    };
    
    return (
        <StyledListItemButton onClick={handleSignOutClick}>
            <ListItemIcon>
                <Link to={"/"}>
                <IconButton size="small">
                    <ExitToApp />
                </IconButton>
                </Link>
            </ListItemIcon>
        </StyledListItemButton>
    );
};

const StyledListItemButton = styled(ListItemButton)`
    position: absolute;
    bottom: 0;
    width: 100%;
 `;