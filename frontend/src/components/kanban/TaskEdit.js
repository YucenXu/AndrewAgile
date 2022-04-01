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
import axios from 'axios'

export default function TaskEdit(props) {
  const [curTask, setCurTask] = React.useState({})
  const [curAssignee, setCurAssignee] = React.useState({})
  const [curReporter, setCurReporter] = React.useState({})
  const [assignee, setAssignee] = React.useState({})
  const [reporter, setReporter] = React.useState({})
  const [type, setType] = React.useState()
  const [status, setStatus] = React.useState()
  const [priority, setPriority] = React.useState()
  const [priorityColor, setPriorityColor] = React.useState()


  const getCurTask = () => {
    axios.get('/api/task/' + props.taskId).catch(err => {
      // Todo
    }).then(response => {
      let task = response.data
      setCurTask(task)
      setType(task.type)
      setStatus(task.status)
      setPriority(task.priority)
      setPriorityColor(getPriorityColor(task.priority))

      // get assignee
      axios.get('/api/user/' + task.assignee).catch(err => {
        // Todo
      }).then(response => {
        let user = response.data
        setCurAssignee(user)
        setAssignee(user)
      })

      // get reporter
      axios.get('/api/user/' + task.reporter).catch(err => {
        // Todo
      }).then(response => {
        let user = response.data
        setCurReporter(user)
        setReporter(user)
      })


    })
  }

  const getUser = (id) => {

  }
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
    setAssignee(getUser(event.target.value))
  }

  const handleSelectReporter = (event) => {
    // Todo
    setReporter(getUser(event.target.value))
  }

  const handleSetStatus = (event) => {
    // Todo
    let status = event.target.value
    setStatus(status)
  }

  const handleSetPriority = (event) => {
    // Todo
    let priority = event.target.value
    setPriorityColor(getPriorityColor(priority))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return '#ffcdd2'
      case 'important':
        return '#ffcc80'
      case 'normal':
        return '#fff59d'
      case 'low':
        return '#dcedc8'
    }
  }

  React.useEffect(() => {
    getCurTask()
  }, [props.taskId])

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
          <Typography sx={{ fontSize: '1.5vw', fontWeight: 'bold' }}>{props.curProject.name}</Typography>
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
                  value={assignee.id}
                  onChange={handleSelectAssignee}
                >
                  <MenuItem value={1}>Nianyi Guo</MenuItem>
                  <MenuItem value={2}>Zhiqi Li</MenuItem>
                  <MenuItem value={3}>Peng Zhao</MenuItem>
                  <MenuItem value={4}>Yucen Xu</MenuItem>
                  <MenuItem value={5}>userE</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Reporter */}
            <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
              alignItems="center">
              <FormControl variant="standard" fullWidth>
                <Select
                  id="id-select-reporter"
                  value={reporter.id}
                  onChange={handleSelectReporter}
                >
                  <MenuItem value={1}>Nianyi Guo</MenuItem>
                  <MenuItem value={2}>Zhiqi Li</MenuItem>
                  <MenuItem value={3}>Peng Zhao</MenuItem>
                  <MenuItem value={4}>Yucen Xu</MenuItem>
                  <MenuItem value={5}>userE</MenuItem>
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
                  value={type}
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
                  <option value={'backlog'}>Backlog</option>
                  <option value={'todo'}>Todo</option>
                  <option value={'inprogress'}>In Progress</option>
                  <option value={'done'}>Done</option>
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
                  <option value={'critical'} style={{ backgroundColor: '#e3f2fd' }}>Critical</option>
                  <option value={'important'} style={{ backgroundColor: '#e3f2fd' }}>Important</option>
                  <option value={'normal'} style={{ backgroundColor: '#e3f2fd' }}>Normal</option>
                  <option value={'low'} style={{ backgroundColor: '#e3f2fd' }}>Low</option>
                </select>
              </FormControl>
            </Grid>
            {/* Create Time */}
            <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
              alignItems="center">
              <Typography sx={{ fontSize: '1vw' }}>{new Date(curTask.createdAt).toLocaleString()}</Typography>
            </Grid>

            {/* Last Update Time */}
            <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
              alignItems="center">
              <Typography sx={{ fontSize: '1vw' }}>{new Date(curTask.lastUpdatedAt).toLocaleString()}</Typography>
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
              placeholder={curTask.description}
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