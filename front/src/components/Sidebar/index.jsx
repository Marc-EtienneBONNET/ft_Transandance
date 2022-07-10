import React  from 'react';
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './SidebarElements';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon />
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="play" onClick={toggle}>Log out</SidebarLink>
                <SidebarLink to="leaderboard" onClick={toggle}>Leaderboard</SidebarLink>
                <SidebarLink to="social" onClick={toggle}>Social</SidebarLink>
                <SidebarLink to="help" onClick={toggle}>Help</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to='/profile'>My Profile</SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar