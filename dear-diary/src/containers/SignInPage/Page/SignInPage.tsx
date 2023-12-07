
import getrandomName from "../Random/RandomNameGenerator";
import "./SignInPage.css";
import Deardiary from "../../../components/DearDiary/DearDiary";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store/hooks";
import { setUserName, userLoggedIn } from "../../../redux/features/user/userSlice";

const SignInPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [nameRandom, SetRandomName] = useState("")

    useEffect(() => {

        return () => {
            dispatch(setUserName(nameRandom))
        }
    }, [nameRandom, dispatch])

    const handleLogin = () => {
        dispatch(userLoggedIn())
        navigate('/home')
    }


    return (
        <div className="signin-page-wrapper">
            <div className="signin-page">

                <Deardiary />

                <div className="signin-page-form-wrapper">
                    <div className="sign-in-title">
                        Sign In
                    </div>

                    <form className="sign-in-form">
                        <TextField
                            id="outlined-basic"
                            label="user name"
                            variant="outlined"
                            className="text-field-login"
                            size="small"
                            value={nameRandom}
                            onChange={(e) => SetRandomName(e.target.value)} />

                        <div className="random-button">
                            <Button variant="contained" className="btn-random" onClick={() => SetRandomName(getrandomName)}>
                                Random
                            </Button>
                        </div>
                    </form>

                    <div className="signin-submit-button">
                        <Button variant="contained" className="btn-continue"  onClick={() => handleLogin()} disabled={!nameRandom}>
                            Continue
                            <ArrowForwardIcon />
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;