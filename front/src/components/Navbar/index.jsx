import React from 'react'
import { FaBars } from 'react-icons/fa'
import { IoMdPlanet } from 'react-icons/io'

import { Nav, NavbarContainer, NavIcon, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements';

const Navbar = ( { toggle } ) => {
  return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/'>
                        <NavIcon>
                            <IoMdPlanet></IoMdPlanet>
                        </NavIcon>
                    </NavLogo>
                    
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>

                    <NavMenu>
                        <NavItem>
                            <NavLinks to="play">Play</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="leaderboard">Leaderboard</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="social">Social</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="help">Help</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to="profile">My Profile</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
  );
};

export default Navbar;