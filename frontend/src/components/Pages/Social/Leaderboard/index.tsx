import React from "react";
import styled from "styled-components";
import { Typography, styled as StyledM, Box } from "@mui/material";

export const PageTitle = ({ title }: {title: string}) => (
    <StyledPageTitle variant="h2" component="h3" color="textSecondary" align="center">
      {title}
    </StyledPageTitle>
);

const StyledPageTitle = StyledM(Typography)<{ component: string }>`
  text-transform: uppercase;
`;

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
`;

export const Leaderboard = () =>
{
    return (
        <HeroContainer>
            <HeroContent>
                <Typography fontSize={32}>Leaderboard</Typography>
                <Typography fontSize={18}>Per number of wins</Typography>
            </HeroContent>
        </HeroContainer>
    )
}