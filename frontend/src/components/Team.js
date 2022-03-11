import * as React from "react";
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

export default function Team() {
    return (
        <Container maxWidth="sx" sx={{mt: 12}}>
            <Paper sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                <Typography component="h2" variant="h6" color="primary">
                    Team Page (placeholder)
                </Typography>
            </Paper>
        </Container>
    );
}
