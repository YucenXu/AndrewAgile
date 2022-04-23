import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import useInterval from '../hooks/useInterval'
import { Select, MenuItem } from '@mui/material'

export default function Progress () {
  // call API to get
  const [allWorkspaces, setAllWorkspaces] = React.useState([])
  const [allProjects, setAllProjects] = React.useState([])
  // Store user action
  const [workspaceId, setWorkspaceId] = React.useState(0)
  // Table rows
  const [rows, setRows] = React.useState([])

  React.useEffect(() => fetchAllWorkspaces(), [])
  React.useEffect(() => fetchAllProjects(), [workspaceId])

  React.useEffect(async () => {
    const newRows = []
    for (let i = 0; i < allProjects.length; i++) {
      const curProject = allProjects[i]
      const resp = await axios.get('/api/project/' + curProject.id + '/tasks').catch(console.error)
      const allTasks = resp.data
      const newRow = createData(
        curProject.id, curProject.name, curProject.description, curProject.owner.username,
        allTasks.backlog.length, allTasks.todo.length, allTasks.inprogress.length, allTasks.done.length,
      )
      newRows.push(newRow)
    }
    setRows(newRows)
  }, [allProjects])

  useInterval(() => {
    fetchAllWorkspaces()
    fetchAllProjects()
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

  function createData (projectID, name, description, owner, backlog, todo, inprogress, done) {
    return { projectID, name, description, owner, backlog, todo, inprogress, done }
  }

  const handleChangeWorkspace = (event) => {
    let id = event.target.value
    setWorkspaceId(id)
  }

  return (
    // <Container maxWidth="sx" sx={{ mt: 12 }} >
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
        </Grid>
        {/* Table Content */}
        <Grid container sx={{ my: '1vh', mx: 'auto', width: '95%', height: '70vh' }}
              style={{ backgroundColor: '#' }} direction="column" alignItems="center">
          <TableContainer sx={{ width: '95%' }} component={Paper}>
            <Table stickyHeader sx={{ width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: '#e8eaf6', fontWeight: 'bold' }}>
                    Project ID</TableCell>
                  <TableCell style={{ backgroundColor: '#e8eaf6', fontWeight: 'bold' }} align="right">
                    Name</TableCell>
                  <TableCell style={{ backgroundColor: '#e8eaf6', fontWeight: 'bold' }} align="right">
                    Description</TableCell>
                  <TableCell style={{ backgroundColor: '#e8eaf6', fontWeight: 'bold' }} align="right">
                    Owner</TableCell>
                  <TableCell style={{ backgroundColor: '#e8eaf6', fontWeight: 'bold' }} align="right">
                    Backlog</TableCell>
                  <TableCell style={{ backgroundColor: '#e8eaf6', fontWeight: 'bold' }} align="right">
                    {'Todo'}</TableCell>
                  <TableCell style={{ backgroundColor: '#e8eaf6', fontWeight: 'bold' }} align="right">
                    In Progress</TableCell>
                  <TableCell style={{ backgroundColor: '#e8eaf6', fontWeight: 'bold' }} align="right">
                    Done</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*{console.log(rows)}*/}
                {rows.map((row) => (
                  <TableRow
                    key={row.projectID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.projectID}</TableCell>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.owner}</TableCell>
                    <TableCell align="right">{row.backlog}</TableCell>
                    <TableCell align="right">{row.todo}</TableCell>
                    <TableCell align="right">{row.inprogress}</TableCell>
                    <TableCell align="right">{row.done}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* </Container> */}
      </Grid>
    </Box>
  )
}
