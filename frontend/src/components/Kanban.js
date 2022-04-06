import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Button, Divider, FormControl } from '@mui/material'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Card, CardContent, CardActionArea } from '@mui/material'
import SearchBar from './kanban/SearchBar'
import TaskEdit from './kanban/TaskEdit'
import TaskCreate from './kanban/TaskCreate'
import ProjectCreate from './kanban/ProjectCreate'
import useInterval from '../hooks/useInterval'
import axios from 'axios'
import { canModify } from '../hooks/useScope'

export default function Kanban() {
  // Call API to GET
  const [allWorkspaces, setAllWorkspaces] = React.useState([])
  const [allProjects, setAllProjects] = React.useState([])
  const [allTasks, setAllTasks] = React.useState([])
  const [allUsers, setAllUsers] = React.useState([])
  const taskStatus = ['Backlog', 'Todo', 'InProgress', 'Done']

  // Store user action
  const [workspaceId, setWorkspaceId] = React.useState(0)
  const [curWorkspace, setCurWorkspace] = React.useState({})
  const [projectId, setProjectId] = React.useState(0)
  const [curProject, setCurProject] = React.useState({})

  const [editOpen, setEditOpen] = React.useState(false)
  const [createProjectOpen, setCreateProjectOpen] = React.useState(false)
  const [createTaskOpen, setCreateTaskOpen] = React.useState(false)
  const [taskId, setTaskId] = React.useState(0)
  const [refreshTasks, setRefreshTasks] = React.useState(0)
  const [refreshProjects, setRefreshProjects] = React.useState(0);

  const getallWorkspaces = () => {
    return axios.get('/api/workspaces').catch(err => {
      // Todo
    }).then(response => {
      setAllWorkspaces(response.data)
      return response.data
    })
  }

  const getAllProjects = () => {
    return axios.get('/api/workspace/' + workspaceId + '/projects').catch(err => {
      // Todo
    }).then(response => {
      setAllProjects(response.data)
      return response.data

    })
  }

  const getAllTasks = () => {
    return axios.get('/api/project/' + projectId + '/tasks').catch(err => {
      // Todo
    }).then(response => {
      setAllTasks(response.data)
      return response.data
    })
  }

  const getAllUsers = () => {
    return axios.get('/api/workspace/' + workspaceId + '/users').catch(err => {
      // Todo
    }).then(response => {
      setAllUsers(response.data)
      return response.data
    })
  }

  const handleChangeWorkspace = (event) => {
    let id = Number(event.target.value)
    setWorkspaceId(id)
    axios.get('/api/workspace/' + id).catch(err => {
      // Todo
    }).then(response => {
      setCurWorkspace(response.data)
      setProjectId(0)
    })
  }

  const handleChangeProject = (event) => {
    let id = Number(event.target.value)
    setProjectId(id)
    axios.get('/api/project/' + id).catch(err => {
      // Todo
    }).then(response => {
      setCurProject(response.data)
    })
  }

  const handleClickCreateProject = () => {
    // Todo
    setCreateProjectOpen(true)
  }

  const handleClickTask = (taskId) => () => {
    // Todo
    setEditOpen(true)
    setTaskId(Number(taskId))
  }

  const handleClickCreateTask = () => {
    // Todo
    setCreateTaskOpen(true)
    setTaskId(Number(taskId))
  }

  React.useEffect(() => {
    async function fetchData() {
      await getallWorkspaces()
      await getAllProjects()
      await getAllUsers()
    }
    fetchData()
  }, [workspaceId])

  React.useEffect(() => {
    if (projectId != 0) {
      getAllTasks()
    } else {
      setAllTasks([])
    }
  }, [projectId])

  React.useEffect(() => {
    getAllTasks()
  }, [refreshTasks])

  React.useEffect(() => {
    getAllProjects()
  }, [refreshProjects])

  useInterval(() => {
    async function fetchData() {
      await getallWorkspaces()
      await getAllProjects()
      await getAllTasks()
      await getAllUsers()
    }
    fetchData()
  }, 10000)

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
            onClick={handleClickCreateProject} disabled={!canModify(workspaceId)}>Create</Button>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '1vh', mx: '0.5vw', width: '32vw', height: '10vh' }}
          style={{ backgroundColor: '#', alignItems: 'left' }}></Grid>
      </Grid>

      {/* Search Bar, Create Button */}
      <Grid container sx={{ my: '1vh', mx: 'auto', width: '80vw', height: '6vh' }} style={{ backgroundColor: '' }}>
        <Grid item sx={{ width: '25vw' }}>
          <SearchBar></SearchBar>
        </Grid>
        <Grid item sx={{ width: '44.5vw' }}></Grid>
        <Grid item sx={{ width: '10vw' }}>
          <Button variant="contained" sx={{ mr: '0.5vw', width: '10vw', height: '6vh' }}
            onClick={handleClickCreateTask} disabled={projectId === 0 || !canModify(workspaceId)}>Create</Button>
        </Grid>
      </Grid>

      {/* Board */}
      <Grid container sx={{ my: '2vh', mx: 'auto', width: '80vw', height: '60vh' }} style={{ alignItems: 'center' }}>
        {taskStatus.map((status) => (
          // Column
          <Paper key={status} sx={{ my: '0vh', mx: '0.5vw', width: '19vw', height: '60vh' }} style={{ backgroundColor: '#eaecee' }}>
            {/* title */}
            <Grid item xs sx={{ mt: '1vh', width: '19vw', height: '6vh' }} direction="row" display="flex"
              justify="center">
              <Typography sx={{ ml: '2vw', my: 'auto', width: '12vw', fontSize: 18, fontWeight: 700 }} color="#424949">
                {status}
              </Typography>
            </Grid>
            <Divider></Divider>
            {/* tasks */}
            <Grid item spacing={2} sx={{ my: '0.5vh', width: '19vw', height: '53vh' }}
              style={{ backgroundColor: '#eaecee', overflow: 'auto' }}>
              {allTasks.map((task) => {
                if (task.status === status.toLowerCase()) {
                  return <Card key={task.id} sx={{ ml: '2vw', my: 0.5, width: '14vw' }} style={{ backgroundColor: '#f2f4f4' }}>
                    <CardActionArea type="submit" onClick={handleClickTask(task.id)}>
                      <CardContent>
                        <Typography sx={{ fontSize: 18, fontWeight: 1000 }} color="#515a5a" gutterBottom>
                          {task.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                }
              })}
            </Grid>
          </Paper>
        ))}
      </Grid>

      {/* Project Create Popup Dialog */}
      <ProjectCreate open={createProjectOpen} setCreateProjectOpen={setCreateProjectOpen} curWorkspace={curWorkspace}
        allUsers={allUsers} refresh={refreshProjects} setRefresh={setRefreshProjects}></ProjectCreate>

      {/* Task Edit Popup Dialog */}
      <TaskEdit open={editOpen} setEditOpen={setEditOpen} taskId={taskId} setTaskId={setTaskId} curProject={curProject}
        allUsers={allUsers} refresh={refreshTasks} setRefresh={setRefreshTasks} disableEdit={!canModify(workspaceId)}></TaskEdit>

      {/* Task Create Popup Dialog */}
      <TaskCreate open={createTaskOpen} setCreateTaskOpen={setCreateTaskOpen} curProject={curProject}
        allUsers={allUsers} refresh={refreshTasks} setRefresh={setRefreshTasks}></TaskCreate>

      {/* Debug info, will delete*/}
      {/* <Typography>Workspace:{workspaceId} Project:{projectId}</Typography> */}
    </Box>
  )
}
