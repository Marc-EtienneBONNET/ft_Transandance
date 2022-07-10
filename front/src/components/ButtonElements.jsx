import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const Button = styled(Link)`
    border-radius: 50px;
    background: #6281ca;
    white-space: nowrap;
    padding: ${({big}) => (big ? '15px 48px' : '12px 30px')};
    color: #fff;
    font-size: 25px;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    margin-right: 15px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? '#fff': '#6281ca')};
        color: #6281ca;
        font-style: italic;
    }
    @media screen and (max-width: 768px){
        font-size: 20px;
        padding: 14px 35px;
    }
    @media screen and (max-width: 580px){
        font-size: 16px;
        padding: 12px 30px;
    }
`;