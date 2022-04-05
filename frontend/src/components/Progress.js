import * as React from 'react'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export default function Progress () {
  //call API to get
  const [allWorkspaces, setAllWorkspaces] = React.useState([])
  const [allProjects, setAllProjects] = React.useState([])
  const [allTasks, setAllTasks] = React.useState([])
  const [projectId, setProjectId] = React.useState(0)
  const [curProject, setCurProject] = React.useState({})
  // Store user action
  const [workspaceId, setWorkspaceId] = React.useState(0)
  const [curWorkspace, setCurWorkspace] = React.useState({})

  const [access, setAccess] = React.useState('')
  
  const getallWorkspaces = () => {
    axios.get('/api/workspaces').catch(err => {
      // Todo
    }).then(response => {
      setAllWorkspaces(response.data)
    })
  }

  const getAllProjects = () => {
    axios.get('/api/workspace/' + workspaceId + '/projects').catch(err => {
      // Todo
    }).then(response => {
      setAllProjects(response.data)
    })
  }

  function createData(projectID, name, description, owner, Backlog, todo, inprogress,done ) {
    return { projectID, name, description, owner, Backlog, todo, inprogress, done};
  }
  const rows = [
    createData('1', 1,'Project-A' , 'This is the project description', 'userF',3,3,1,1),
    createData('2', 2, 'Project-B', 'This is the project description', 'userG',2,5,0,2),
    createData('3', 3, 'Project-C', 'This is the project description', 'userH',0,7,2,4),
    createData('4', 4, 'Project-D', 'This is the project description', 'userP',4,9,3,3),
    createData('5', 5, 'Project-E', 'This is the project description', 'userK',5,8,2,0),
  ]

  const handleChangeWorkspace = (event) => {
    let id = Number(event.target.value)
    setWorkspaceId(id)
    axios.get('/api/workspace/' + id).catch(err => {
      // Todo
    }).then(response => {
      setCurWorkspace(response.data)
      setProjectId(0)
      setCurProject({})
    })
  }

  // const getAllTasks = () => {
  //   axios.get('/api/project/' + projectId + '/tasks').catch(err => {
  //     // Todo
  //   }).then(response => {
  //     setAllTasks(response.data)
  //   })
  // }

  // React.useEffect(() => {
  //   getallWorkspaces()
  //   getAllProjects()
  //   getAllTasks()
  // }, [workspaceId, projectId])

  return (
    <Container maxWidth="sx" sx={{ mt: 12 }} >
      {/* Workspace Dropdown */}
      <Grid container spacing={2} sx={{ mt: '1vh', mx: '0.5vw', width: '19vw', height: '10vh' }}
            style={{ backgroundColor: '', alignItems: 'left' }}>
        <FormControl variant="standard" sx={{ my: '0.5vh', ml: '0vw', width: '15vw' }}
                     style={{ backgroundColor: '' }}>
          <InputLabel id="id-select-workspace-label">Workspace</InputLabel>
          <NativeSelect
            labelid="id-select-workspace-label"
            label="workspaceId"
            value={workspaceId}
            onChange={handleChangeWorkspace}>
            {[0, 1, 2].map((value) => (
              <option key={value} value={value}>Workspace-{value}</option>
            ))}
          </NativeSelect>
        </FormControl>
      </Grid>
      {/* Table Content */}
    <TableContainer maxwidth="sx" sx={{ mt: 12 }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:'#e8eaf6', fontWeight:'bold',}} >
          <TableRow>
            <TableCell>Project ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Owner</TableCell>
            <TableCell align="right">Backlog</TableCell>
            <TableCell align="right">Todo</TableCell>
            <TableCell align="right">In Progress</TableCell>
            <TableCell align="right">Done</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.projectID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.owner}</TableCell>
              <TableCell align="right">{row.Backlog}</TableCell>
              <TableCell align="right">{row.todo}</TableCell>
              <TableCell align="right">{row.inprogress}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.done}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Container>
  )
}
