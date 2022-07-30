import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer, HeroContent } from "../PlayGame";
import { useLocation } from "react-router-dom";

type WaitingProps = {
    type: string,
    userId: number,
}

export const Waiting = (props: any) => {
    const [start, setStart] = useState(false);
    const [user, setUser] = useState({username: '', id: 0,});
    const [int, setInt] = useState(0);
    const [url, setUrl] = useState('/game/easy');
    const [gameData, setGameData] = useState('');
    const navigate = useNavigate();

    let location = useLocation();
    let data = location.state as WaitingProps;
    console.log(data.type);

    const test= () => {
        setStart(true);
    }

    useEffect(() => {
        let bool = true;
        const banane = async () => {
            if (start)
                console.log('test')
        }
        banane();
        return () => {bool = false};
            //return navigate(url, {state: {type: 'easy', usename: 'user'}});
    }, [start])

    return (
        <HeroContainer>
            <HeroContent>
                <Typography>This is a waiting room</Typography>
                <Typography>You will be redirected as soon as we find you a match</Typography>
            </HeroContent>
        </HeroContainer>
    )
}