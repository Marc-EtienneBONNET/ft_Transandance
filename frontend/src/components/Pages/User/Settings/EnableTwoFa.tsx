import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer } from "../../PlayGame";
import "../style/style.css"

const TwoFactor = () => {
    const [code, setCode] = useState(' ');
    const [QRCode, setQRCode] = useState(' ');
    const [redirect, setRedirect] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let bool = true;
        const getQRCode = async () => {
            // const {data} = await database2faGenerate();
            // if (bool)
            //     setQRCode(data.url);
            setQRCode("qrcode")
        }
        getQRCode();
        return () => {
            bool = false;
        }
    }, []);

    const enable = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            // try to enable and verify if the code passed is working
            setRedirect(true);
        }
        catch (error){
            setInvalid(true);
        }
    }
    const disable = async (e: SyntheticEvent) => {
        e.preventDefault();
        // send a disable message to database
        setRedirect(true);
    }

    useEffect(() => {
        if (redirect && !invalid){
            return navigate("/home");
        }
    },[redirect]);

    return (
        <HeroContainer>
            <form>
                <Typography>Enable two factor authentication</Typography>
                <Typography>Scan the QR code with Google Anthenticator</Typography>
                <div>
                    <img className="qrcodeimage" alt="QRCode" src={QRCode}></img>
                </div>
                { invalid? <Typography>Wrong code, please try again</Typography> : <Typography></Typography>}
                <div className="form-field">
                    <input required id="floatingInput" placeholder="12345" onChange={e => setCode(e.target.value)}/>
                    <label>Enter authentication code</label>
                </div>
                <div className="form-field">
                    <div className="button">
                        <Button onClick={enable} variant="contained">Enable</Button>
                    </div>
                    <div className="button">
                        <Button onClick={disable} variant="contained">Disable</Button>
                    </div>
                </div>
            </form>
        </HeroContainer>
    )
}

export default TwoFactor;