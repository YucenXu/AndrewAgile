import * as React from 'react'
import Grid from '@mui/material/Grid'
import { Button, FormControl } from '@mui/material'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import SearchBar from './kanban/SearchBar'
import TaskEdit from './kanban/TaskEdit'
import TaskCreate from './kanban/TaskCreate'
import ProjectCreate from './kanban/ProjectCreate'
import useInterval from '../hooks/useInterval'
import axios from 'axios'
import { canModifyData } from '../hooks/useScope'
import DragBoard from './kanban/DragBoard'

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

  React.useEffect(() => fetchAllWorkspaces(), [])
  React.useEffect(() => fetchAllProjects(), [workspaceId, refreshProjects])
  React.useEffect(() => fetchAllUsers(), [workspaceId])
  React.useEffect(() => fetchAllTasks(), [projectId, refreshTasks])

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
    axios.get('/api/project/' + projectId + '/tasks').then(
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

  return (
    <Box>
      {/* Dropdown menus */}
      <Grid container spacing={2} sx={{ mt: '13vh', mx: 'auto', width: '80vw', height: '12vh' }}
        style={{ backgroundColor: '', alignItems: 'left' }}>
        {/* Workspace Dropdown */}
        <Grid container spacing={2} sx={{ mt: '1vh', mx: '0.5vw', width: '16vw', height: '10vh' }}
          style={{ backgroundColor: '#', alignItems: 'left' }}>
          <FormControl variant="standard" sx={{ my: '0.5vh', ml: '0vw', width: '15vw' }}
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
        <Grid container spacing={2} sx={{ mt: '1vh', mx: '0.5vw', width: '16vw', height: '10vh' }}
          style={{ backgroundColor: '#', alignItems: 'left' }}>
          <FormControl variant="standard" sx={{ my: '0.5vh', ml: '0vw', width: '15vw' }}
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
        <Grid container spacing={2} sx={{ mt: '1vh', mx: '0.5vw', width: '12vw', height: '10vh' }}
          style={{ backgroundColor: '#', alignItems: 'left' }} direction="row" alignItems="center">
          <Button variant="contained" sx={{ mr: '0.5vw', width: '10vw', height: '6vh' }}
            onClick={handleClickCreateProject} disabled={disableEdit}>Create</Button>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '1vh', mx: '0.5vw', width: '32vw', height: '10vh' }}
          style={{ backgroundColor: '#', alignItems: 'left' }} />
      </Grid>

      {/* Search Bar, Create Button */}
      <Grid container sx={{ my: '1vh', mx: 'auto', width: '80vw', height: '6vh' }} style={{ backgroundColor: '' }}>
        <Grid item sx={{ width: '25vw' }}>
          <SearchBar />
        </Grid>
        <Grid item sx={{ width: '44.5vw' }} />
        <Grid item sx={{ width: '10vw' }}>
          <Button variant="contained" sx={{ mr: '0.5vw', width: '10vw', height: '6vh' }}
            onClick={handleClickCreateTask}
            disabled={projectId === 0 || disableEdit}>Create</Button>
        </Grid>
      </Grid>

      {/* Board */}
      <DragBoard statusList={Object.keys(allTasks)} allTasks={Object.values(allTasks)} setAllTasks={setAllTasks}
                 setEditTaskOpen={setEditTaskOpen} setTaskId={setTaskId} refresh={refreshTasks}
                 setRefresh={setRefreshTasks} disableEdit={disableEdit}/>

      {/* Project Create Popup Dialog */}
      <ProjectCreate open={createProjectOpen} setCreateProjectOpen={setCreateProjectOpen} curWorkspace={curWorkspace}
        allUsers={allUsers} refresh={refreshProjects} setRefresh={setRefreshProjects} />

      {/* Task Create Popup Dialog */}
      <TaskCreate open={createTaskOpen} setCreateTaskOpen={setCreateTaskOpen} curProject={curProject}
        allUsers={allUsers} refresh={refreshTasks} setRefresh={setRefreshTasks} />

      {/* Task Edit Popup Dialog */}
      <TaskEdit open={editTaskOpen} setEditOpen={setEditTaskOpen} taskId={taskId} setTaskId={setTaskId}
        curProject={curProject} allUsers={allUsers} refresh={refreshTasks} setRefresh={setRefreshTasks}
        disableEdit={disableEdit} />

      {/* Debug info, will delete*/}
      {/* <Typography>Workspace:{workspaceId} Project:{projectId}</Typography> */}
    </Box >
  )
}
