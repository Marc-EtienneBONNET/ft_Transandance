import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeroContainer } from "../../PlayGame";
import React from "react";
import { Button, Typography } from "@mui/material";
import "../style/style.css"
import UploadIcon from '@mui/icons-material/Upload';
import styled, { useTheme } from "styled-components";


const StyledLink = styled(Link)`
    text-decoration: none;
`;

const UploadImg = (props: {uploaded: (url: string) => void}) => {

    const upload = async (files: FileList | null ) => {
        if (files === null) return;

        const formData = new FormData();
        formData.append('image', files[0]);

        try {
            // const {data} = await axios.post('upload', formData);
            // props.uploaded(data.url);
        }
        catch (err) {props.uploaded('http://localhost:8000/api/uploads/egg.jpeg')}
    }

    return (
        <div>
            <label className="btn btn-primary">
                <UploadIcon fontSize={"small"} />
                <input placeholder="upload avatar" type="file" hidden onChange={e => upload(e.target.files)}/>
            </label>
        </div>
    );

}

export const UpdateProfile = () => {
    const [id, setId] = useState(0);
    const [username, setUsername] = useState(' ');
    const [mail, setMail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [avatar, setAvatar] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [authentication, setAuthentication] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false);


    const navigate = useNavigate();

    // useEffect(() => {
    //     let bool = true;
    //     const setDefaults = async () => {
    //         try {
    //             const {data} = await get('userData');
    //             if (bool)
    //                 setId(data.id);
    //             if (bool)
    //                 setUsername(data.username);
    //             if (bool)
    //                 setMail(data.mail);
    //             if (bool)
    //                 setPhoneNumber(data.phoneNumber);
    //             if (bool)
    //                 setAvatar(data.avatar);
    //             if (bool)
    //                 setUsername(data.username);
    //             if (bool)
    //                 setAuthentication(data.authentication);
    //         }
    //         catch (error){
    //             if (bool)
    //                 setUnauthorized(true);
    //         }
    //     }
    //     setDefaults();
    //     return () => {
    //         bool = false;
    //     }
    // }, []);

    const submit = async () => {
        try {
            // post(update, {username, mail, phoneNumber});
            setRedirect(true);
            setInvalid(false);
        }
        catch (error){
            setInvalid(true);
        }
    }

    useEffect(() => {
        if (redirect && !invalid){
            return navigate("/home");
        }
        else if (unauthorized){
            return navigate("/");
        }
    },[redirect, unauthorized]);
    
    return (
        <HeroContainer>
            <form onSubmit={submit}>
                <Typography fontSize={28}> {invalid ? "Invalid informations, please try again" : "Update your profile informations"} </Typography>
                <div className="form-field">
                    <label>User Name </label>
                    <input required id="floatingInput" onChange={e => setUsername(e.target.value)} defaultValue={username} placeholder="username"/>
                </div>
                <div className="form-field">
                    <label>Mail </label>
                    <input required id="floatingInput" onChange={e => setMail(e.target.value)} defaultValue={mail} placeholder="mail@example.com"/>
                </div>
                <div className="form-field">
                    <label>Phone Number </label>
                    <input required id="floatingInput" onChange={e => setPhoneNumber(e.target.value)} defaultValue={phoneNumber} placeholder="06 06 06 06 06"/>
                </div>
                <div className="form-avatar">
                    <label> Upload avatar </label>
                    <UploadImg uploaded={setAvatar} />
                </div>
                <div>
                    <Button variant="contained" onClick={submit}>Submit</Button>
                </div>
            </form>
        </HeroContainer>
    )
}