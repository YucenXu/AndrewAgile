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

export default function TaskEdit(props) {
  const [assignee, setAssignee] = React.useState(0)
  const [reporter, setReporter] = React.useState(0)
  const [status, setStatus] = React.useState('Backlog')
  const [priority, setPriority] = React.useState(0)
  const [priorityColor, setPriorityColor] = React.useState('#ffcdd2')

  const handleCloseTask = () => {
    props.setEditOpen(false)
  }

  const handleDeleteTask = () => {
    // Todo
    props.setEditOpen(false)
  }

  const handleSaveTask = () => {
    // Todo
    props.setEditOpen(false)
  }

  const handleSelectAssignee = (event) => {
    // Todo
    setAssignee(event.target.value)
  }

  const handleSelectReporter = (event) => {
    // Todo
    setReporter(event.target.value)
  }

  const handleSetStatus = (event) => {
    // Todo
    let status = event.target.value
    setStatus(status)
  }

  const handleSetPriority = (event) => {
    // Todo
    let priority = event.target.value
    setPriority(priority)

    switch (priority) {
      case '1':
        setPriorityColor('#ffcdd2')
        break
      case '2':
        setPriorityColor('#ffcc80')
        break
      case '3':
        setPriorityColor('#fff59d')
        break
      case '4':
        setPriorityColor('#dcedc8')
        break
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleCloseTask}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="lg"
      PaperProps={{ sx: { height: '80%', width: '60%' } }}
    >
      {/* <DialogTitle sx={{ height: "5%", backgroundColor: "#aebfbe" }}>Task-{props.taskId}</DialogTitle> */}
      {/* Bar */}
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ flex: 1, fontWeight: 'bold' }} variant="h6" component="div">
            Task-{props.taskId}
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseTask}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Project Info */}
      <Grid container sx={{ mt: '1%', mb: '2%', width: '100%', height: '15%', backgroundColor: '#' }}
        direction="row" alignItems="center">
        <Grid item sx={{ mx: '3%', width: '8vw' }}>
          <Typography
            sx={{ fontSize: '1.5vw', fontWeight: 'bold', backgroundColor: '#1976d2', color: '#ffffff' }}
            align="center">Project</Typography>
        </Grid>
        <Grid item sx={{ width: '20%' }}>
          <Typography sx={{ fontSize: '1.5vw', fontWeight: 'bold' }}>project-{props.projectId}</Typography>
        </Grid>
      </Grid>

      {/* Task Info */}

      <Grid container sx={{ width: '100%', height: '100%', backgroundColor: '#' }}>


        {/* Detail */}
        <Grid container sx={{
          ml: '3%',
          width: '48%',
          height: '100%',
          border: 2,
          borderColor: '#1976d2',
          borderRadius: 1,
          backgroundColor: '#',
        }}>
          {/* Index Column */}
          <Grid container
            sx={{ ml: '5%', width: '35%', height: '100%', backgroundColor: '#', fontWeight: 'bold' }}>
            <Grid container sx={{ width: '100%', height: '14%' }} style={{ fontSize: '1.2vw' }} direction="row"
              alignItems="center">
              Assignee
            </Grid>
            <Grid container sx={{ width: '100%', height: '14%' }} style={{ fontSize: '1.2vw' }} direction="row"
              alignItems="center">
              Reporter
            </Grid>
            <Grid container sx={{ width: '100%', height: '14%' }} style={{ fontSize: '1.2vw' }} direction="row"
              alignItems="center">
              Type
            </Grid>
            <Grid container sx={{ width: '100%', height: '14%' }} style={{ fontSize: '1.2vw' }} direction="row"
              alignItems="center">
              Status
            </Grid>
            <Grid container sx={{ width: '100%', height: '14%' }} style={{ fontSize: '1.2vw' }} direction="row"
              alignItems="center">
              Priority
            </Grid>
            <Grid container sx={{ width: '100%', height: '14%' }} style={{ fontSize: '1.2vw' }} direction="row"
              alignItems="center">
              Createed at
            </Grid>
            <Grid container sx={{ width: '100%', height: '14%' }} style={{ fontSize: '1.2vw' }} direction="row"
              alignItems="center">
              Last updated at
            </Grid>
          </Grid>

          {/* Value Column */}
          <Grid container sx={{ mx: '1%', width: '58%', height: '100%', backgroundColor: '#' }}>
            {/* Assignee */}
            <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
              alignItems="center">
              <FormControl variant="standard" fullWidth>
                <Select
                  id="id-select-assignee"
                  value={assignee}
                  onChange={handleSelectAssignee}
                >
                  <MenuItem value={0}>Nianyi Guo</MenuItem>
                  <MenuItem value={1}>Zhiqi Li</MenuItem>
                  <MenuItem value={2}>Peng Zhao</MenuItem>
                  <MenuItem value={3}>Yucen Xu</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Reporter */}
            <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
              alignItems="center">
              <FormControl variant="standard" fullWidth>
                <Select
                  id="id-select-reporter"
                  value={reporter}
                  onChange={handleSelectReporter}
                >
                  <MenuItem value={0}>Nianyi Guo</MenuItem>
                  <MenuItem value={1}>Zhiqi Li</MenuItem>
                  <MenuItem value={2}>Peng Zhao</MenuItem>
                  <MenuItem value={3}>Yucen Xu</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Type */}
            <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
              alignItems="center">
              <FormControl variant="standard">
                <select
                  id="id-select-status"
                  style={{
                    fontSize: '1.5vw',
                    width: '8ch',
                    border: 0,
                    textAlign: 'left',
                  }}
                  value={status}
                  onChange={handleSetStatus}
                >
                  <option value={'story'}>Story</option>
                  <option value={'issue'}>Issue</option>
                  <option value={'action'}>Action</option>
                  {/* <option value={'project'}>Project</option> */}
                </select>
              </FormControl>
            </Grid>

            {/* Status */}
            <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
              alignItems="center">
              <FormControl variant="standard">
                <select
                  id="id-select-status"
                  style={{
                    fontSize: '1.5vw',
                    width: '12ch',
                    border: 0,
                    textAlign: 'left',
                  }}
                  value={status}
                  onChange={handleSetStatus}
                >
                  <option value={'Backlog'}>Backlog</option>
                  <option value={'Todo'}>Todo</option>
                  <option value={'Inprogress'}>In Progress</option>
                  <option value={'Done'}>Done</option>
                </select>
              </FormControl>
            </Grid>

            {/* Priority */}
            <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
              alignItems="center">
              <FormControl variant="standard">
                <select
                  id="id-select-priority"
                  style={{
                    fontSize: '1.5vw',
                    width: '12ch',
                    border: 0,
                    backgroundColor: priorityColor,
                    textAlign: 'left',
                  }}
                  value={priority}
                  onChange={handleSetPriority}
                >
                  <option value={1} style={{ backgroundColor: '#e3f2fd' }}>Critical</option>
                  <option value={2} style={{ backgroundColor: '#e3f2fd' }}>Important</option>
                  <option value={3} style={{ backgroundColor: '#e3f2fd' }}>Normal</option>
                  <option value={4} style={{ backgroundColor: '#e3f2fd' }}>Low</option>
                </select>
              </FormControl>
            </Grid>
            {/* Create Time */}
            <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
              alignItems="center">
              <Typography sx={{ fontSize: '1vw' }}>09:25 AM 02/25/22</Typography>
            </Grid>

            {/* Last Update Time */}
            <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
              alignItems="center">
              <Typography sx={{ fontSize: '1vw' }}>02:12 PM 02/26/22</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Description */}
        <Grid container sx={{ width: '48%', height: '100%', backgroundColor: '#' }}>
          <Grid container sx={{ mx: 'auto', width: '95%', height: '55%', backgroundColor: '#' }}>
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

          {/* Activity */}
          <Grid container sx={{ mx: 'auto', width: '95%', height: '40%', backgroundColor: '#' }}>
            <Typography sx={{ mx: '5%', fontSize: '1.5vw', fontWeight: 'bold', color: '#1976d2' }}>
              Activity
            </Typography>

            <Typography sx={{ mx: '5%', fontSize: '0.8vw' }}>
              Nianyi assigned this task to Peng -09:25 AM 02/25/22
            </Typography>

            <Typography sx={{ mx: '5%', fontSize: '0.8vw' }}>
              Peng started working on this task. -12:43 PM 02/26/22
            </Typography>

            <Typography sx={{ mx: '5%', fontSize: '0.8vw' }}>
              Peng changed priority to level 2. -02:12 PM 02/26/22
            </Typography>

          </Grid>
        </Grid>

      </Grid>

      <DialogActions>
        <Button onClick={handleDeleteTask}>Delete</Button>
        <Button variant="contained" onClick={handleSaveTask}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}