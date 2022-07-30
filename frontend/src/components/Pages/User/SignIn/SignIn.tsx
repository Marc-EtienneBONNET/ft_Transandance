import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import React, { Component } from "react"
import logo from "../../../../images/42.svg"
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { HEADER_HEIGHT } from "../../../../utils/constants";
import { AppTitle } from "../../../Header/AppTitle";
import { HeroContainer, HeroContent } from '../../PlayGame';


class SignIn extends Component {
    render() {
        return (
        <>
        <HeroContainer>
            <HeroContent>
                <AppBar position="fixed" sx = {{ height: HEADER_HEIGHT, }}>
                    <Toolbar variant="dense">
                        <Box sx={{ flexGrow: 1 }} />
                        <VideogameAssetIcon fontSize='large' />
                        <Box sx={{ flexGrow: 1 }}>
                        <AppTitle />
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Typography fontStyle="italic" fontSize={28} color="textSecondary" marginBottom="15px">
                        To play the game you need to login with your 42 credentials
                </Typography>
                <Button size="large" variant="contained" href='https://api.intra.42.fr/oauth/authorize?client_id=1d7e9bf203617a46828968923d537bc2cb3b804626778d4da1813a9d24553987&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsignintwofa&response_type=code'>Login with 42 OAuth</Button>
            </HeroContent>
        </HeroContainer>
            
        </>
        )
    };
};

export default SignIn;

{/* <a href={'http://localhost:8000/api/auth/login'}></a> */}