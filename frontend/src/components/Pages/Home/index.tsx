import React from "react";
import styled from "styled-components";
import { CustomVideo } from "./video";
import { Typography, styled as StyledM, Box } from "@mui/material";

export const PageTitle = ({ title }: {title: string}) => (
    <StyledPageTitle variant="h2" component="h3" color="textSecondary">
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

export const Home = () =>
{
    return (
        <HeroContainer>
            {/* <CustomVideo/> */}
            <HeroContent>
                <PageTitle title={"Welcome !"} />
                <Box sx = {{ flexGrow: 1, p: 5 }} /> 
            </HeroContent>
        </HeroContainer>
    )
}