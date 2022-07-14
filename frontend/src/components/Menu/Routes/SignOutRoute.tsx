import { ListItemButton, ListItemIcon, ListItemText, IconButton, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ExitToApp } from '@mui/icons-material';

export const SignOutRoute = () => {
    const handleSignOutClick = () => {
        alert('Signing out, it was a pleasure to have you.');
    };
    
    return (
        <StyledListItemButton onClick={handleSignOutClick}>
            <ListItemIcon>
                <IconButton size="small">
                    <ExitToApp />
                </IconButton>
            </ListItemIcon>
        </StyledListItemButton>
    );
};

const StyledListItemButton = styled(ListItemButton)`
    position: absolute;
    bottom: 0;
    width: 100%;
 `;