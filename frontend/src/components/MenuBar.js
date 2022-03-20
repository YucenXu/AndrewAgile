import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PeopleIcon from '@mui/icons-material/People';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import {useNavigate} from "react-router-dom";
import {AuthConsumer, initialAuth} from "../hooks/useAuth";
import axios from "axios";

const MenuBar = () => {
    const navigate = useNavigate();
    const {setAuth} = AuthConsumer();

    const handleClick = event => {
        event.preventDefault();
        axios.post("/api/logout")
            .then(() => {
                setAuth({...initialAuth.auth, isChecked: true});
                navigate("/login", {replace: true});
            })
            .catch(console.error);
    };

    return (
        <List component="nav">
            <ListItemButton component="a" href="/">
                <ListItemIcon>
                    <ViewKanbanIcon/>
                </ListItemIcon>
                <ListItemText primary="Kanban"/>
            </ListItemButton>
            <ListItemButton component="a" href="/progress">
                <ListItemIcon>
                    <AutoGraphIcon/>
                </ListItemIcon>
                <ListItemText primary="Progress"/>
            </ListItemButton>
            <ListItemButton component="a" href="/access">
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Access"/>
            </ListItemButton>
            <ListItemButton component="a" href="/help">
                <ListItemIcon>
                    <HelpIcon/>
                </ListItemIcon>
                <ListItemText primary="Help"/>
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="Logout"/>
            </ListItemButton>
        </List>
    );
}

export default MenuBar;
