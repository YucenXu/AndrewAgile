import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import axios from "axios";
import {formatDateTime} from "../utils/formats";

export default function Kanban() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getAllTasks = async () => {
            const resp = await axios.get("/api/tasks");
            setTasks(await resp.data);
        };

        getAllTasks()
            .catch(err => console.error(err));
    }, []);

    return (
        <Container maxWidth="sx" sx={{mt: 12}}>
            <Paper sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                <Typography component="h2" variant="h6" color="primary">
                    Project Tasks
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Assignee</TableCell>
                            <TableCell>Reporter</TableCell>
                            <TableCell>Created Time</TableCell>
                            <TableCell>Last Updated Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task => (
                            <TableRow key={task.id}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.priority}</TableCell>
                                <TableCell>{task.assignee}</TableCell>
                                <TableCell>{task.reporter}</TableCell>
                                <TableCell>{formatDateTime(task.createdAt)}</TableCell>
                                <TableCell>{formatDateTime(task.lastUpdatedAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}
