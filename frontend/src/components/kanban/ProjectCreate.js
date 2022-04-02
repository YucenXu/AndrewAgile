import React from 'react'
import Box from '@mui/material/Box'
import { Dialog } from '@mui/material'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputBase from '@mui/material/InputBase'
import axios from 'axios'

export default function ProjectCreate(props) {
  const handleCloseProject = () => {
    props.setCreateProjectOpen(false)
  }

  const handleSaveProject = (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const params = ['name', 'description']
    const payload = {}
    for (const param of params) {
      payload[param] = form.get(param)
    }
    axios.post('/api/workspace/' + props.curWorkspace.id + '/projects', payload).catch(err => {
      // Todo
    }).then(() => {
      props.setRefresh(props.refresh + 1)
      props.setCreateProjectOpen(false)
    })
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleCloseProject}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="lg"
      PaperProps={{ sx: { height: '80vh', width: '50vw' } }}
    >
      {/* Bar */}
      <Grid container sx={{ mt: 0, mb: '0%', width: '50vw', height: '10vh', backgroundColor: '#eeeeee' }}>
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
      </Grid>

      <Box component="form" onSubmit={handleSaveProject}
        sx={{ mb: '0%', width: '50vw', height: '70vh', backgroundColor: '#eeeeee' }}>
        {/* Workspace Info */}
        <Grid container sx={{ mb: '0%', width: '50vw', height: '10vh', backgroundColor: '#' }}
          direction="row" alignItems="center">
          <Grid item sx={{ mx: '2vw', width: '10vw' }}>
            <Typography
              sx={{ fontSize: '1.5vw', fontWeight: 'bold', backgroundColor: '#1976d2', color: '#ffffff' }}
              align="center">Workspace</Typography>
          </Grid>
          <Grid item sx={{ width: '36vw' }}>
            <Typography sx={{ fontSize: '1.5vw', fontWeight: 'bold' }}>{props.curWorkspace.name}</Typography>
          </Grid>
        </Grid>

        {/* Project Info */}
        <Grid container sx={{ width: '50vw', height: '53vh', backgroundColor: '#' }}>

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
                {/* Owner */}
              </Grid>

            </Grid>

            {/* Value Column */}
            <Grid container sx={{ mx: '1%', width: '58%', height: '100%', backgroundColor: '#' }}>
              {/* Project Name */}
              <Grid container sx={{ width: '80%', height: '50%', backgroundColor: '#' }} direction="row"
                alignItems="center">
                <InputBase
                  name="name"
                  id="name"
                  label="name"
                  sx={{ width: '90%' }}
                  placeholder="Project Name"
                  // value={title}
                  // onInput={(event) => this.setTitle(event.target.value)}
                  required
                  inputProps={{ style: { textAlign: 'left', fontSize: '1.2vw' }, pattern: "^[a-zA-Z0-9_.-]*$", title: "This field doesn't accept special characters." }}
                />
              </Grid>

              {/* Owner Don't need now, owner is current user */}
              <Grid container sx={{ width: '80%', height: '50%', backgroundColor: '#' }} direction="row"
                alignItems="center">
                {/* <Select
                  name="owner"
                  id="owner"
                  fullWidth
                  variant="standard"
                  required
                >
                  {
                    props.allUsers.map((user) => (
                      <MenuItem value={user.username}>{user.username}</MenuItem>
                    ))
                  }
                </Select> */}
              </Grid>

            </Grid>
          </Grid>

          {/* Description */}
          <Grid container sx={{ width: '100%', height: '60%', backgroundColor: '#' }} style={{ alignItems: 'left' }}
            direction="row" alignItems="center">
            <Grid item sx={{ mx: 'auto', width: '90%', height: '90%', backgroundColor: '#' }}>
              <TextField
                name="description"
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

        <Grid container sx={{ mt: '1vh', mb: '1vh', width: '50vw', height: '5vh', backgroundColor: '#' }}>
          <Grid container sx={{ mx: '0vw', width: '40vw', height: '100%' }}></Grid>
          <Grid container sx={{ mx: '0vw', width: '10vw', height: '100%', backgroundColor: '#' }} direction="column"
            alignItems="center">
            <Button type="submit" variant="contained"
              style={{ minWidth: '80%', maxWidth: '80%', height: '100%' }}>Save</Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}