import styled from 'styled-components';
import { MdKeyboardArrowRight, MdArrowForward } from 'react-icons/md'
import {Link} from 'react-router-dom'

export const HeroContainer = styled.div`
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 800px;
    position: relative;
    z-index: 1;
`;

export const HeroBg = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #fff;
`;

export const VideoBg = styled.video`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
`;

export const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const HeroH1 = styled.h1`
    color: #6281ca;
    font-size: 58px;
    text-align: center;

    @media screen and (max-width: 768px){
        transition: all 0.2s ease-in-out;
        font-size: 40px;
    }

    @media screen and (max-width: 580px){
        transition: all 0.2s ease-in-out;
        font-size: 32px;
`;

export const HeroP = styled.p`
    color: #6281ca;
    margin-top: 24px;
    font-size: 24px;
    text-align: center;
    max-width: 600px;
    font-style: italic;
    @media screen and (max-width: 768px){
        transition: all 0.2s ease-in-out;
        font-size: 24px;
    }

    @media screen and (max-width: 580px){
        transition: all 0.2s ease-in-out;
        font-size: 18px;
`;

export const HeroMenu = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 180px);
    text-align: center;
    margin-top: 32px;
    margin-bottom: 94px;
    @media screen and (max-width: 580px){
        transition: all 0.2s ease-in-out;
        grid-template-columns: repeat(1, 130px);
    }
`;


export const HeroButton = styled(Link)`
    border-radius: 50px;
    background: #6281ca;
    white-space: nowrap;
    padding: 15px 74px;
    color: #fff;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #6281ca;
        font-style: italic;
    }
    @media screen and (max-width: 768px){
        transition: all 0.2s ease-in-out;
        font-size: 20px;
        padding: 14px 35px;
    }
    @media screen and (max-width: 580px){
        transition: all 0.2s ease-in-out;
        font-size: 16px;
        padding: 12px 30px;
    }
`;

export const ArrowForward = styled(MdArrowForward)`
        margin-left: 8px;
        font-size: 20px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
        margin-left: 8px;
        font-size: 20px;
`;