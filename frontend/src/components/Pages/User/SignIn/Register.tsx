import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer } from "../../PlayGame";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "../style/style.css"

export const Register = () => {
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (redirect && !invalid){
            return navigate("/home");
        }
    },[redirect]);

    const submit = async () => {
        try {
            // post("update", {username, mail, phoneNumber});
            setRedirect(true);
            setInvalid(false);
        }
        catch (error){
            setInvalid(true);
        }
    }

    return (
        <HeroContainer>
            <form onSubmit={submit}>
                <Typography fontSize={28}> {invalid ? "Invalid informations, please try again" : "Please enter your informations" } </Typography>
                <div className="form-field">
                    <label>User Name </label>
                    <input required id="floatingInput" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-field">
                    <label>Mail </label>
                    <input required id="floatingInput" onChange={e => setMail(e.target.value)} />
                </div>
                <div className="form-field">
                    <label>Phone Number </label>
                    <input required id="floatingInput" onChange={e => setPhoneNumber(e.target.value)} />
                </div>
                <div>
                    <Button variant="contained" onClick={submit}>Submit</Button>
                </div>
            </form>
        </HeroContainer>
    )
}