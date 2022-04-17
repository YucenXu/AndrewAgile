import * as React from 'react'
import Grid from '@mui/material/Grid'
import { Button, FormControl, Switch } from '@mui/material'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import SearchBar, { filterTasksBySearch, filterTasksByWatch } from './kanban/SearchBar'
import TaskEdit from './kanban/TaskEdit'
import TaskCreate from './kanban/TaskCreate'
import ProjectCreate from './kanban/ProjectCreate'
import useInterval from '../hooks/useInterval'
import axios from 'axios'
import { canModifyData } from '../hooks/useScope'
import DragBoard from './kanban/DragBoard'
import { AuthConsumer } from '../hooks/useAuth'
import Typography from '@mui/material/Typography'
import { FormGroup, FormControlLabel } from '@mui/material/'

const initialTasks = {
  backlog: [],
  todo: [],
  inprogress: [],
  done: [],
}

export default function Kanban() {
  const [allWorkspaces, setAllWorkspaces] = React.useState([])
  const [allUsers, setAllUsers] = React.useState([])
  const [allProjects, setAllProjects] = React.useState([])

  const [allTasks, setAllTasks] = React.useState(initialTasks)
  const [searchText, setSearchText] = React.useState('')
  const [showWatching, setShowWatching] = React.useState(false)
  const [showArchived, setShowArchived] = React.useState(false)

  const [workspaceId, setWorkspaceId] = React.useState(0)
  const [curWorkspace, setCurWorkspace] = React.useState({})
  const [projectId, setProjectId] = React.useState(0)
  const [curProject, setCurProject] = React.useState({})
  const [taskId, setTaskId] = React.useState(0)

  const [createProjectOpen, setCreateProjectOpen] = React.useState(false)
  const [createTaskOpen, setCreateTaskOpen] = React.useState(false)
  const [editTaskOpen, setEditTaskOpen] = React.useState(false)

  const [refreshTasks, setRefreshTasks] = React.useState(0)
  const [refreshProjects, setRefreshProjects] = React.useState(0)

  const disableEdit = !canModifyData(workspaceId)

  const { auth } = AuthConsumer()

  React.useEffect(() => fetchAllWorkspaces(), [])
  React.useEffect(() => fetchAllProjects(), [workspaceId, refreshProjects])
  React.useEffect(() => fetchAllUsers(), [workspaceId])
  React.useEffect(() => fetchAllTasks(), [projectId, refreshTasks, showArchived])

  useInterval(() => {
    fetchAllWorkspaces()
    fetchAllProjects()
    fetchAllUsers()
    fetchAllTasks()
  }, 10000)

  const fetchAllWorkspaces = () => {
    axios.get('/api/workspaces').then(
      resp => setAllWorkspaces(resp.data),
    ).catch(console.error)
  }

  const fetchAllProjects = () => {
    axios.get('/api/workspace/' + workspaceId + '/projects').then(
      resp => setAllProjects(resp.data),
    ).catch(console.error)
  }

  const fetchAllUsers = () => {
    axios.get('/api/workspace/' + workspaceId + '/users').then(
      resp => setAllUsers(resp.data),
    ).catch(console.error)
  }

  const fetchAllTasks = () => {
    axios.get('/api/project/' + projectId + '/tasks',
      { params: { visible: !showArchived } }).then(
        resp => setAllTasks(resp.data),
      ).catch(console.error)
  }

  const handleChangeWorkspace = (event) => {
    let id = event.target.value
    setWorkspaceId(id)
    axios.get('/api/workspace/' + id).then(resp => {
      setCurWorkspace(resp.data)
      setProjectId(0)
    })
  }

  const handleChangeProject = (event) => {
    let id = event.target.value
    setProjectId(id)
    axios.get('/api/project/' + id).then(resp => {
      setCurProject(resp.data)
    })
  }

  const handleClickCreateProject = () => {
    setCreateProjectOpen(true)
  }

  const handleClickCreateTask = () => {
    setCreateTaskOpen(true)
    setTaskId(taskId)
  }

  const handleSwitchWatching = () => {
    setShowWatching(showWatching => !showWatching)
  }

  const handleSwitchArchived = () => {
    setShowArchived(showArchived => !showArchived)
  }

  return (
    <Box>
      <Grid container sx={{ my: 'auto', mx: 'auto', width: '100%', height: '100vh' }} style={{ backgroundColor: '#' }}>

        {/* Dropdown menus */}
        <Grid container spacing={2} sx={{ mt: '10vh', mx: 'auto', width: '95%', height: '10vh' }}
          style={{ backgroundColor: '#', alignItems: 'left' }} direction="row" alignItems="center">
          {/* Workspace Dropdown */}
          <Grid item spacing={2} sx={{ width: '20%', height: '10vh' }}
            style={{ backgroundColor: '#', alignItems: 'left' }}>
            <FormControl variant="standard" sx={{ width: '15vw' }}
              style={{ backgroundColor: '' }}>
              <InputLabel id="id-select-workspace-label">Workspace</InputLabel>
              <Select
                labelId="id-select-workspace-label"
                label="workspaceId"
                value={workspaceId}
                onChange={handleChangeWorkspace}
              >
                {allWorkspaces.map((workspace) => (
                  <MenuItem key={workspace.id} value={workspace.id}>{workspace.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Project Dropdown */}
          <Grid item spacing={2} sx={{ width: '20%', height: '10vh' }}
            style={{ backgroundColor: '#', alignItems: 'left' }}>
            <FormControl variant="standard" sx={{ width: '15vw' }}
              style={{ backgroundColor: '' }}>
              <InputLabel id="id-select-project-label">Project</InputLabel>
              <Select
                labelId="id-select-project-label"
                label="projectId"
                value={projectId}
                onChange={handleChangeProject}
              >
                {allProjects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Project Create Button */}
          <Grid item spacing={2} sx={{ width: '10%', height: '100%' }}
            style={{ backgroundColor: '#', alignItems: 'left' }} direction="row" alignItems="center">
            <Button variant="contained" sx={{ width: '100%', height: '5vh' }}
              onClick={handleClickCreateProject} disabled={disableEdit}>Create</Button>
          </Grid>
          {/* Placeholder */}
          <Grid item spacing={2} sx={{ width: '50%', height: '10vh' }}
            style={{ backgroundColor: '#', alignItems: 'left' }} />
        </Grid>

        {/* Search Bar, Icons, Create Button */}
        <Grid container sx={{ my: '1vh', mx: 'auto', width: '95%', height: '6vh' }} style={{ backgroundColor: '#' }}
              direction="row" alignItems="center">
          {/* Search Bar */}
          <Grid item sx={{ width: '28%', height: '6vh' }}>
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </Grid>
          {/* Watching Icon */}
          <Grid container item sx={{ width: '15%' }} direction="column">
            <FormGroup>
              <FormControlLabel control={<Switch checked={showWatching} onChange={handleSwitchWatching}
                                                 inputProps={{ 'aria-label': 'controlled' }} />}
                label={<Typography sx={{ fontSize: '1vw' }}>Watching tasks</Typography>} />
            </FormGroup>
          </Grid>
          {/* Archive Icon */}
          <Grid container item sx={{ width: '15%' }} direction="column">
            <FormGroup>
              <FormControlLabel control={<Switch checked={showArchived} onChange={handleSwitchArchived}
                                                 inputProps={{ 'aria-label': 'controlled' }} />}
                label={<Typography sx={{ fontSize: '1vw' }}>Archived tasks</Typography>} />
            </FormGroup>
          </Grid>
          {/* Placeholder */}
          <Grid item sx={{ width: '32%' }} />
          {/* Create Task */}
          <Grid item sx={{ width: '10%', height: '100%' }} style={{ backgroundColor: '#' }}>
            <Button variant="contained" sx={{ width: '100%', height: '5vh' }}
              onClick={handleClickCreateTask}
              disabled={projectId === 0 || disableEdit}>Create</Button>
          </Grid>
        </Grid>

        {/* Board */}
        <Grid container sx={{ my: '1vh', mx: 'auto', width: '95%', height: '65vh' }} style={{ backgroundColor: '#' }}>
          <DragBoard statusList={Object.keys(allTasks)} allTasks={showWatching ?
            filterTasksByWatch(filterTasksBySearch(allTasks, searchText), auth.username) :
            filterTasksBySearch(allTasks, searchText)
          } setAllTasks={setAllTasks} setEditTaskOpen={setEditTaskOpen} setTaskId={setTaskId}
            refresh={refreshTasks} setRefresh={setRefreshTasks} disableEdit={disableEdit} />
        </Grid>
        {/* Project Create Popup Dialog */}
        <ProjectCreate open={createProjectOpen} setCreateProjectOpen={setCreateProjectOpen} curWorkspace={curWorkspace}
          allUsers={allUsers} refresh={refreshProjects} setRefresh={setRefreshProjects} />

        {/* Task Create Popup Dialog */}
        <TaskCreate open={createTaskOpen} setCreateTaskOpen={setCreateTaskOpen} curProject={curProject}
          allUsers={allUsers} refresh={refreshTasks} setRefresh={setRefreshTasks} />

        {/* Task Edit Popup Dialog */}
        <TaskEdit open={editTaskOpen} setEditOpen={setEditTaskOpen} taskId={taskId} setTaskId={setTaskId}
          curProject={curProject} allUsers={allUsers} refresh={refreshTasks} setRefresh={setRefreshTasks}
          disableEdit={disableEdit} curUsername={auth.username} />

        {/* Debug info, will delete*/}
        {/* <Typography>Workspace:{workspaceId} Project:{projectId}</Typography> */}
      </Grid>
    </Box>
  )
}
