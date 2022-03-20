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
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getAllProjectsByWorkspace = async () => {
            const workspaces = (await axios.get("/api/workspaces")).data;
            const resp = await axios.get(`/api/workspace/${workspaces[0].id}/projects`)
            const projects = await resp.data
            setProjects(projects);
        };

        getAllProjectsByWorkspace()
            .catch(console.error);
    }, []);

    return (
        <Container maxWidth="sx" sx={{mt: 12}}>
            <Paper sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                <Typography component="h2" variant="h6" color="primary">
                    Projects under the default workspace
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Workspace ID</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>Created Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(project => (
                            <TableRow key={project.id}>
                                <TableCell>{project.id}</TableCell>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell>{project.workspaceId}</TableCell>
                                <TableCell>{project.owner}</TableCell>
                                <TableCell>{formatDateTime(project.createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}
