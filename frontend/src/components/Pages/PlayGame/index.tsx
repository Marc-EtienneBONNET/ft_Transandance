import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { CustomVideo } from "./video";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';import { PageTitle } from "../Home";

const HeroContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 650px;
    position: relative;
    z-index: 1;
`;

const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;

export const Game = () =>
{
    return (
        <HeroContainer>
            {/* <CustomVideo/> */}
            <HeroContent>
                <PageTitle title={"Choose your mode"} />
                <Typography color="textSecondary" align="center" marginTop="30px" fontStyle={"italic"} >Easy mode is for children and elderly people, Normal mode is played by decent human beings and Hard is reserved to the elite (just kidding nobody ever touched that Pong) </Typography>
                <Box sx = {{ flexGrow: 1, p: 3 }} /> 
                <Grid container direction="row" justifyContent="space-around" alignItems="center" >
                    <Button variant="contained" size="large" style={{ fontSize: 25 }} endIcon={<ArrowForwardIosIcon/>} >Easy</Button>
                    <Button variant="contained" size="large" style={{ fontSize: 25 }} endIcon={<ArrowForwardIosIcon/>} >Normal</Button>
                    <Button variant="contained" size="large" style={{ fontSize: 25 }} endIcon={<ArrowForwardIosIcon/>} >Hard</Button>
                </Grid>
                {/* <Box sx = {{ flexGrow: 1, p: 7 }} /> */}
                <Typography color="textSecondary" align="center" marginTop="20px" marginBottom="20px" fontStyle={"italic"}>Click on spectate to watch a currently happening game</Typography>
                <Button variant="contained" size="large" style={{ fontSize: 25 }} endIcon={<ArrowForwardIosIcon/>} >Spectate</Button>
            </HeroContent>
        </HeroContainer>
    )
}