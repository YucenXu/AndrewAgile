import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import axios from "axios";
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useState} from "react";
import {AuthConsumer} from "../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [loginError, setLoginError] = useState('');
    const {auth, setAuth} = AuthConsumer();

    const handleSubmit = event => {
        event.preventDefault();
        const form = new FormData(event.target);
        const payload = {
            "username": form.get('username'),
            "password": form.get('password'),
        };

        axios.post("/api/login", payload)
            .then(resp => {
                setAuth(resp.data);
                navigate(state?.path ?? "/", {replace: true});
            })
            .catch(err => {
                if (err.response.status === 400) {
                    setLoginError(err.response.data.msg);
                } else {
                    console.error(err);
                }
            });
    };

    // useAuth hook is async, redirect after confirming login status
    if (auth?.username) {
        return <Navigate to={state?.path ?? "/"} replace/>;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                mt: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h4">
                    Login
                </Typography>
                {loginError &&
                    <Alert severity="error" sx={{mt: 3}}>
                        {loginError}
                    </Alert>
                }
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                    <TextField
                        label="Username"
                        id="username"
                        name="username"
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        type="password"
                        label="Password"
                        id="password"
                        name="password"
                        margin="normal"
                        required
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 2, mb: 2}}
                        fullWidth
                    >
                        LOGIN
                    </Button>
                </Box>
                <Button
                    href="/register"
                    variant="outlined"
                    sx={{mt: 1}}
                    fullWidth
                >
                    REGISTER
                </Button>
            </Box>
        </Container>
    );
}
