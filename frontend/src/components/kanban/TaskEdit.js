import React, { Component } from 'react'
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
import { sanitizeBlank } from '../../utils/formats'

class TaskEdit extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      title: "",
      assignee: "",
      reporter: "",
      type: "",
      status: "",
      priority: "",
      priorityColor: "",
      createdAt: "",
      lastUpdatedAt: "",
      description: "",
      comments: [],
      newComment: "",
    }
  }

  getCurTask = async () => {
    const response = await axios.get('/api/task/' + this.props.taskId).catch(err => {
      // Todo
    })
    let task = response.data
    this.setState({
      title: task.title,
      assignee: task.assignee?.username,
      reporter: task.reporter?.username,
      type: task.type,
      status: task.status,
      priority: task.priority,
      priorityColor: this.getPriorityColor(task.priority),
      createdAt: task.createdAt,
      lastUpdatedAt: task.lastUpdatedAt,
      description: task.description,
      comments: task.comments
    })

  }

  handleCloseTask = () => {
    this.props.setTaskId(0)
    this.props.setEditOpen(false)
  }

  handleDeleteTask = async () => {
    await axios.delete('/api/task/' + this.props.taskId).catch(err => {
      // Todo
    })
    this.props.setTaskId(0)
    this.props.setRefresh(this.props.refresh + 1)
    this.props.setEditOpen(false)
    this.clearState()
  }

  handleSaveTask = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const params = ['title', 'assigneeId', 'reporterId', 'type', 'status', 'priority', 'description']
    const payload = {}
    for (const param of params) {
      payload[param] = form.get(param)
    }
    await axios.put('/api/task/' + this.props.taskId, payload).catch(err => {
      // Todo
    })
    this.props.setTaskId(0)
    this.props.setEditOpen(false)
    this.props.setRefresh(this.props.refresh + 1)
    this.clearState()
  }

  handleAddComment = async (event) => {
    event.preventDefault()
    const payload = { "content": this.state.newComment }
    await axios.post('/api/task/' + this.props.taskId + "/comments", payload).catch(err => {
      // Todo
    })
    const response = await axios.get('/api/task/' + this.props.taskId).catch(err => {
      // Todo
    })
    let task = response.data
    this.setState({
      comments: task.comments
    })
    this.setState({ newComment: "" })
  }

  handleSetPriority = (event) => {
    let priority = event.target.value
    this.setState({
      priority: priority,
      priorityColor: this.getPriorityColor(priority)
    })
  }

  getPriorityColor = (priority) => {
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

  clearState = () => {
    this.setState({
      title: "",
      assignee: "",
      reporter: "",
      type: "",
      status: "",
      priority: "",
      priorityColor: "",
      createdAt: "",
      lastUpdatedAt: "",
      description: "",
      comments: [],
      newComment: "",
    }
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.taskId !== prevProps.taskId && this.props.taskId != 0) {
      this.getCurTask()
    }
  }

  render() {
    return (

      <Dialog
        open={this.props.open}
        onClose={this.handleCloseTask}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        PaperProps={{ sx: { height: '80vh', width: '60vw' } }}
      >

        {/* Bar */}
        <Grid container sx={{ mt: 0, mb: '0%', width: '60vw', height: '10vh', backgroundColor: '#eeeeee' }}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <Typography sx={{ flex: 1, fontWeight: 'bold' }} variant="h6" component="div">
                {this.props.curProject.name}
              </Typography>

              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseTask}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>

        <Box component="form" onSubmit={this.handleSaveTask}
          sx={{ mb: '0%', width: '60vw', height: '70vh', backgroundColor: '#f2f4f4' }}>
          {/* Task Title */}
          <Grid container sx={{ mb: '0%', width: '60vw', height: '10vh', backgroundColor: '#' }}
            direction="row" alignItems="center">
            <Grid item sx={{ mx: '3%', width: '8vw' }}>
              <Typography
                sx={{ fontSize: '1.5vw', fontWeight: 'bold', backgroundColor: '#1976d2', color: '#ffffff' }}
                align="center">Task</Typography>
            </Grid>
            <Grid item sx={{ ml: "3%", width: '20%' }}>
              <InputBase
                name="title"
                id="title"
                sx={{ width: '90%' }}
                value={this.state.title}
                onChange={(event) =>
                  this.setState({ title: sanitizeBlank(event.target.value) })}
                inputProps={{ style: { textAlign: 'left', fontSize: '1.5vw', fontWeight: "bold" } }}
                required
              />
            </Grid>
          </Grid>

          {/* Task Info */}
          <Grid container sx={{ width: '60vw', height: '53vh', backgroundColor: '#' }}>

            {/* Detail */}
            <Grid container sx={{
              ml: '3%',
              width: '48%',
              height: '100%',
              border: 2,
              borderColor: '#eeeeee',
              borderRadius: 1,
              backgroundColor: '#eeeeee',
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
                  <Select
                    name="assigneeId"
                    id="assigneeId"
                    value={this.state.assignee}
                    onChange={event => this.setState({ assignee: event.target.value })}
                    fullWidth
                    variant="standard"
                    required
                  >
                    {
                      this.props.allUsers.map((user) => (
                        <MenuItem key={user.username} value={user.username}>{user.username}</MenuItem>
                      ))
                    }
                  </Select>
                </Grid>

                {/* Reporter */}
                <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
                  alignItems="center">
                  <Select
                    name="reporterId"
                    id="reporterId"
                    value={this.state.reporter}
                    onChange={event => this.setState({ reporter: event.target.value })}
                    fullWidth
                    variant="standard"
                    required
                  >
                    {
                      this.props.allUsers.map((user) => (
                        <MenuItem key={user.username} value={user.username}>{user.username}</MenuItem>
                      ))
                    }
                  </Select>
                </Grid>

                {/* Type */}
                <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
                  alignItems="center">
                  <select
                    name="type"
                    id="type"
                    style={{
                      fontSize: '1.5vw',
                      width: '8ch',
                      border: 0,
                      textAlign: 'left',
                      backgroundColor: '#e0e0e0'
                    }}
                    value={this.state.type}
                    onChange={event => this.setState({ type: event.target.value })}
                    required
                  >
                    <option value={'story'}>Story</option>
                    <option value={'issue'}>Issue</option>
                    <option value={'action'}>Action</option>
                  </select>
                </Grid>

                {/* Status */}
                <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
                  alignItems="center">
                  <select
                    name="status"
                    id="status"
                    style={{
                      fontSize: '1.5vw',
                      width: '12ch',
                      border: 0,
                      textAlign: 'left',
                      backgroundColor: '#e0e0e0'
                    }}
                    value={this.state.status}
                    onChange={event => this.setState({ status: event.target.value })}
                    required
                  >
                    <option value={'backlog'}>Backlog</option>
                    <option value={'todo'}>Todo</option>
                    <option value={'inprogress'}>In Progress</option>
                    <option value={'done'}>Done</option>
                  </select>
                </Grid>

                {/* Priority */}
                <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
                  alignItems="center">
                  <select
                    name="priority"
                    id="priority"
                    style={{
                      fontSize: '1.5vw',
                      width: '12ch',
                      border: 0,
                      backgroundColor: this.state.priorityColor,
                      textAlign: 'left',
                    }}
                    value={this.state.priority}
                    onChange={this.handleSetPriority}
                    required
                  >
                    <option value={'critical'} style={{ backgroundColor: '#e0e0e0' }}>Critical</option>
                    <option value={'important'} style={{ backgroundColor: '#e0e0e0' }}>Important</option>
                    <option value={'normal'} style={{ backgroundColor: '#e0e0e0' }}>Normal</option>
                    <option value={'low'} style={{ backgroundColor: '#e0e0e0' }}>Low</option>
                  </select>
                </Grid>

                {/* Create Time */}
                <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
                  alignItems="center">
                  <Typography
                    sx={{ fontSize: '1vw', backgroundColor: '#e0e0e0' }}>{new Date(this.state.createdAt).toLocaleString()}</Typography>
                </Grid>

                {/* Last Update Time */}
                <Grid container sx={{ width: '80%', height: '14%', backgroundColor: '#' }} direction="row"
                  alignItems="center">
                  <Typography
                    sx={{ fontSize: '1vw', backgroundColor: '#e0e0e0' }}>{new Date(this.state.lastUpdatedAt).toLocaleString()}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Description and Comments */}
            <Grid sx={{ width: '48%', height: '100%', backgroundColor: 'fff3e0' }}>
              {/* Description */}
              <Grid container sx={{ width: '100%', height: '30%', backgroundColor: 'ffebee' }}>
                {/* <Grid container sx={{ mx: 'auto', width: '95%', height: '50%', backgroundColor: '#e0f7fa' }}> */}
                <TextField
                  name="description"
                  id="description"
                  label="Description"
                  sx={{ mx: 'auto', width: '90%' }}
                  placeholder="Task Description..."
                  value={this.state.description}
                  onChange={event => this.setState({ description: event.target.value })}
                  rows={2}
                  multiline
                  focused
                />
                {/* </Grid> */}
              </Grid>

              {/* Comments */}
              <Grid container sx={{ width: '100%', height: '70%', backgroundColor: 'e1f5fe' }}>
                {/* Comment Title */}
                <Grid item sx={{ mx: 'auto', width: '95%', height: '15%', backgroundColor: 'e8f5e9', overflow: 'auto' }}>
                  <Typography sx={{ mx: '5%', fontSize: '1.5vw', fontWeight: 'bold', color: '#1976d2' }}>Comments</Typography>
                </Grid>
                {/* Current Comments */}
                <Grid item sx={{ mx: 'auto', width: '95%', height: '55%', backgroundColor: '#eeeeee', overflow: 'auto' }}>
                  {
                    this.state.comments.map((comment) => {
                      return <Grid item sx={{ mx: 'auto', width: '100%' }}>
                        <Typography sx={{ mx: '5%', fontSize: '0.8vw' }}>{comment.content}</Typography>
                        <Typography sx={{ mx: '5%', fontSize: '0.8vw', }} style={{ textAlign: 'right' }}>-made by {comment.user.username} at {new Date(comment.createdAt).toLocaleString()}</Typography>
                      </Grid>
                    })
                  }
                </Grid>

                {/* Add Comment */}
                {/* Title */}
                <Grid container sx={{ mx: 'auto', width: '95%', height: '10%', backgroundColor: 'e8f5e9', overflow: 'auto' }} direction="row"
                  alignItems="center">
                  <Grid item sx={{ my: 'auto', width: '100%' }}>
                    <Typography sx={{ mx: '5%', fontSize: '1vw', color: '#1976d2' }}>Add a comment</Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mx: 'auto', width: '95%', height: '20%', backgroundColor: 'fff3e0', overflow: 'auto' }}>
                  {/* Comment Input */}
                  <Grid item sx={{ mx: 'auto', width: '80%', height: '100%', backgroundColor: 'e1f5fe', overflow: 'auto' }}>
                    <InputBase
                      variant="outlined"
                      name="comment"
                      id="comment"
                      label="comment"
                      sx={{ mx: '5%', width: '90%' }}
                      placeholder="add a comment..."
                      value={this.state.newComment}
                      onChange={(event) => {
                        const input = event.target.value
                        this.setState({ newComment: input })
                      }}
                      inputProps={{ style: { textAlign: 'left', fontSize: '1vw', border: "1px solid #9e9e9e" } }}
                    />
                  </Grid>
                  {/* Button */}
                  <Grid item sx={{ mx: 'auto', width: '20%', height: '100%', backgroundColor: 'ffebee', overflow: 'auto' }}>
                    <button onClick={this.handleAddComment} style={{ fontSize: "1vw" }} disabled={this.props.disableEdit}>add</button>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: '1vh', mb: '1vh', width: '60vw', height: '5vh', backgroundColor: '#' }}>
            <Grid container sx={{ mx: '0vw', width: '40vw', height: '100%' }}></Grid>
            <Grid container sx={{ mx: '0vw', width: '10vw', height: '100%', backgroundColor: '#' }} direction="column"
              alignItems="center">
              <Button onClick={this.handleDeleteTask} variant="outlined" color="error" disabled={this.props.disableEdit}
                style={{ minWidth: '80%', maxWidth: '80%', height: '100%'}}>Delete</Button>
            </Grid>
            <Grid container sx={{ mx: '0vw', width: '10vw', height: '100%', backgroundColor: '#' }} direction="column"
              alignItems="center">
              <Button type="submit" variant="contained" disabled={this.props.disableEdit}
                style={{ minWidth: '80%', maxWidth: '80%', height: '100%' }}>Save</Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    )
  }
}

export default TaskEdit