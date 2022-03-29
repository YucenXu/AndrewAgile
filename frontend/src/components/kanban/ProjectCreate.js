import React from 'react'
import { Dialog, DialogActions } from '@mui/material'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputBase from '@mui/material/InputBase'

export default function ProjectCreate(props) {
    const [projectName, setProjectName] = React.useState('');
    const [owner, setOwner] = React.useState(0)


    const handleCloseProject = () => {
        props.setCreateProjectOpen(false)
        setProjectName("")
    }

    const handleSaveProject = () => {
        // Todo
        props.setCreateProjectOpen(false)
        setProjectName("")
    }

    const handleChangeProjectName = (event) => {
        // Todo
        setProjectName(event.target.value)
    }

    const handleSelectOwner = (event) => {
        // Todo
        setOwner(event.target.value)
    }


    return (
        <Dialog
            open={props.open}
            onClose={handleCloseProject}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="lg"
            PaperProps={{ sx: { height: '80%', width: '50%' } }}
        >
            {/* <DialogTitle sx={{ height: "5%", backgroundColor: "#aebfbe" }}>Task-{props.taskId}</DialogTitle> */}
            {/* Bar */}
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ flex: 1, fontWeight: 'bold' }} variant="h6" component="div">
                        Create Project
                    </Typography>

                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseProject}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Workspace Info */}
            <Grid container sx={{ mt: '1%', mb: '2%', width: '100%', height: '15%', backgroundColor: '#' }}
                direction="row" alignItems="center">
                <Grid item sx={{ mx: '3%', width: '10vw' }}>
                    <Typography
                        sx={{ fontSize: '1.5vw', fontWeight: 'bold', backgroundColor: '#1976d2', color: '#ffffff' }}
                        align="center">Workspace</Typography>
                </Grid>
                <Grid item sx={{ width: '20%' }}>
                    <Typography sx={{ fontSize: '1.5vw', fontWeight: 'bold' }}>Workspace-{props.workspaceId}</Typography>
                </Grid>
            </Grid>

            {/* Project Info */}
            <Grid container sx={{ width: '100%', height: '100%', backgroundColor: '#' }}>

                {/* Detail */}
                <Grid container sx={{
                    mx: 'auto',
                    width: '100%',
                    height: '30%',
                    // border: 2,
                    borderColor: '#1976d2',
                    borderRadius: 1,
                    backgroundColor: '#',
                }}>
                    {/* Index Column */}

                    <Grid container
                        sx={{ ml: '5%', width: '35%', height: '100%', backgroundColor: '#', fontWeight: 'bold' }}>
                        <Grid container sx={{ width: '100%', height: '50%' }} style={{ fontSize: '1.2vw' }} direction="row"
                            alignItems="center">
                            Project Name
                        </Grid>
                        <Grid container sx={{ width: '100%', height: '50%' }} style={{ fontSize: '1.2vw' }} direction="row"
                            alignItems="center">
                            Owner
                        </Grid>
                        {/* <Grid container sx={{ width: '100%', height: '70%' }} style={{ fontSize: '1.2vw' }} direction="row"
                            alignItems="center">
                        </Grid> */}

                    </Grid>

                    {/* Value Column */}
                    <Grid container sx={{ mx: '1%', width: '58%', height: '100%', backgroundColor: '#' }}>
                        {/* Project Name */}
                        <Grid container sx={{ width: '80%', height: '50%', backgroundColor: '#' }} direction="row"
                            alignItems="center">
                            <InputBase
                                id="id-project-name"
                                label="project-name"
                                sx={{ width: '90%' }}
                                placeholder="Project Name"
                                value={projectName}
                                onChange={handleChangeProjectName}
                                inputProps={{ style: { textAlign: 'left', fontSize: '1.2vw' } }}
                            />
                        </Grid>

                        {/* Owner */}
                        <Grid container sx={{ width: '80%', height: '50%', backgroundColor: '#' }} direction="row"
                            alignItems="center">
                            <FormControl variant="standard" fullWidth>
                                <Select
                                    id="id-select-owner"
                                    value={owner}
                                    onChange={handleSelectOwner}
                                >
                                    <MenuItem value={0}>Nianyi Guo</MenuItem>
                                    <MenuItem value={1}>Zhiqi Li</MenuItem>
                                    <MenuItem value={2}>Peng Zhao</MenuItem>
                                    <MenuItem value={3}>Yucen Xu</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Reporter */}
                        {/* <Grid container sx={{ width: '80%', height: '70%', backgroundColor: '#' }} direction="row"
                            alignItems="center">
                            
                        </Grid> */}

                    </Grid>
                </Grid>

                {/* Description */}
                <Grid container sx={{ width: '100%', height: '60%', backgroundColor: '#' }} style={{ alignItems: 'left' }} direction="row" alignItems="center">
                    <Grid item sx={{ mx: 'auto', width: '90%', height: '90%', backgroundColor: '#' }}>
                        <TextField
                            id="description"
                            label="Description"
                            sx={{ mx: 'auto', width: '90%' }}
                            placeholder="Description..."
                            rows={5}
                            multiline
                            focused
                        />
                    </Grid>

                </Grid>
            </Grid>

            <DialogActions>
                <Button variant="contained" onClick={handleSaveProject}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}