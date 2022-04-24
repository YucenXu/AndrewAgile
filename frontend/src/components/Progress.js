import { Box, Container, FormControl, Grid } from '@mui/material'
import { NumberCard, PercentageCard } from './progress/ProgressCards'
import { TasksByStatus } from './progress/TasksByStatus'
import { TasksByType } from './progress/TasksByType'
import { RecentTasks } from './progress/RecentTasks'
import * as React from 'react'
import useInterval from '../hooks/useInterval'
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// Ref: https://github.com/devias-io/material-kit-react
export default function Progress () {
  const [allWorkspaces, setAllWorkspaces] = React.useState([])
  const [workspaceId, setWorkspaceId] = React.useState(localStorage.getItem('progress_wid') ?? 0)

  const [allProjects, setAllProjects] = React.useState([])
  const [allTasks, setAllTasks] = React.useState([])

  React.useEffect(() => fetchAllWorkspaces(), [])
  React.useEffect(() => {
    fetchAllProjects()
    fetchAllTasks()
  }, [workspaceId])

  useInterval(() => fetchAllWorkspaces(), 10000)

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

  const fetchAllTasks = () => {
    axios.get('/api/workspace/' + workspaceId + '/tasks').then(
      resp => setAllTasks(resp.data.map(task => {
        if (!task.visible) {
          task.status = 'archived'
        }
        return task
      })),
    ).catch(console.error)
  }

  const handleChangeWorkspace = (event) => {
    let wid = event.target.value
    setWorkspaceId(wid)
    localStorage.setItem('progress_wid', wid)
  }

  const calcCompletedPercent = () => {
    if (allTasks.length === 0) {
      return 0
    } else {
      return allTasks.filter(task => task.status === 'done').length / allTasks.length * 100
    }
  }

  const calcArchivedPercent = () => {
    if (allTasks.length === 0) {
      return 0
    } else {
      return allTasks.filter(task => !task.visible).length / allTasks.length * 100
    }
  }

  return <Box component="main" sx={{ mt: 3, flexGrow: 1, py: 8 }}>
    {/* Workspace Dropdown */}
    <Grid item spacing={2} sx={{ mt: '2vh', mx: '2vw', width: '20%', height: '10vh' }}
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

    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <NumberCard title="Total Projects" number={allProjects.length} sx={{ height: '100%' }}/>
        </Grid>
        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <NumberCard title="Total Tasks" number={allTasks.length} sx={{ height: '100%' }}/>
        </Grid>
        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <PercentageCard title="Completed Tasks" percent={calcCompletedPercent()} color="success"/>
        </Grid>
        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <PercentageCard title="Archived Tasks" percent={calcArchivedPercent()} color="secondary"/>
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <TasksByStatus projects={allProjects} tasks={allTasks}/>
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <TasksByType tasks={allTasks}/>
        </Grid>
        <Grid item xs={12}>
          <RecentTasks
            projects={
              allProjects.reduce((dict, project) => {
                dict[project.id] = project.name
                return dict
              }, {})
            }
            tasks={
              allTasks.sort(
                (t1, t2) => new Date(t2.lastUpdatedAt) - new Date(t1.lastUpdatedAt),
              ).slice(0, 10)
            }/>
        </Grid>
      </Grid>
    </Container>
  </Box>
}
