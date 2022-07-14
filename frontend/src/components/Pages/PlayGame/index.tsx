import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CustomVideo } from "./video";
import { MdKeyboardArrowRight, MdArrowForward } from 'react-icons/md'
import { PageTitle } from "../Home";
import { margin } from "@mui/system";

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
                <Typography color="textSecondary" align="center" marginTop="30px">Normal mode is for children and elderly people, Hard mode is played by decent human beings and Nightmare is reserved to the elite (just kidding nobody ever touched that Pong) </Typography>
                <Box sx = {{ flexGrow: 1, p: 3 }} /> 
                <Grid container direction="row" justifyContent="space-around" alignItems="center" >
                    <Button variant="contained" size="large" style={{ fontSize: 25 }}>Normal</Button>
                    <Button variant="contained" size="large" style={{ fontSize: 25 }}>Hard</Button>
                    <Button variant="contained" size="large" style={{ fontSize: 25 }}>NightMare</Button>
                </Grid>
                <Box sx = {{ flexGrow: 1, p: 7 }} /> 
            </HeroContent>
        </HeroContainer>
    )
}