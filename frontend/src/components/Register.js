import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from "@mui/material/Alert";
import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthConsumer} from "../hooks/useAuth";

export default function Register() {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('')
    const {auth, setAuth} = AuthConsumer();

    const handleSubmit = event => {
        event.preventDefault();
        const form = new FormData(event.target);
        const params = ["username", "password", "confirmPwd", "email", "firstname", "lastname"];
        const payload = {};
        for (const param of params) {
            payload[param] = form.get(param);
        }

        axios.post("/api/register", payload)
            .then(resp => {
                setAuth({...resp.data, isChecked: true});
                navigate("/", {replace: true});
            })
            .catch(err => {
                switch (err.response.status) {
                    case 400:
                        setRegisterError(err.response.data.msg);
                        break;
                    case 409:
                        setRegisterError("Username already exist.");
                        break;
                    default:
                        console.error(err);
                        break;
                }
            });
    };

    // disable register when user is logged in
    if (auth?.username) {
        return <Navigate to="/" replace/>;
    }

    return (auth?.isChecked &&
        <Container component="main" maxWidth="xs">
            <Box sx={{
                mt: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Typography component="h1" variant="h4">
                    Register
                </Typography>
                {registerError &&
                    <Alert severity="error" sx={{mt: 3}}>
                        {registerError}
                    </Alert>
                }
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                label="First name"
                                id="firstname"
                                name="firstname"
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Last name"
                                id="lastname"
                                name="lastname"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                id="username"
                                name="username"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Email address"
                                id="email"
                                name="email"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                label="Password"
                                id="password"
                                name="password"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                label="Confirm password"
                                id="confirmPwd"
                                name="confirmPwd"
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3}}
                        fullWidth
                    >
                        REGISTER
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
