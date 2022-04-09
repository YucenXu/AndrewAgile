import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import { Grid, Select, FormControl, MenuItem } from '@mui/material'
import Container from '@mui/material/Container'
import SearchBar, { filterUsersBySearch } from './access/SearchBar'
import List from '@mui/material/List'
import UserRole from './access/UserRole'
import useInterval from '../hooks/useInterval'
import { canGrantPerm } from '../hooks/useScope'
import axios from 'axios'

export default function Access () {
  const [workspaceId, setWorkspaceId] = React.useState(0)
  const [allWorkspaces, setAllWorkspaces] = React.useState([])

  const [allUsers, setAllUsers] = React.useState([])
  const [searchText, setSearchText] = React.useState('')

  const disableEdit = !canGrantPerm(workspaceId)

  React.useEffect(() => fetchAllWorkspaces(), [])
  React.useEffect(() => fetchAllUsers(), [workspaceId])

  useInterval(() => {
    fetchAllWorkspaces()
    fetchAllUsers()
  }, 10000)

  const handleChangeWorkspace = (e) => {
    let id = e.target.value
    setWorkspaceId(id)
  }

  const fetchAllWorkspaces = () => {
    axios.get('/api/workspaces').then(
      resp => setAllWorkspaces(resp.data),
    ).catch(console.error)
  }

  const fetchAllUsers = () => {
    axios.get('/api/workspace/' + workspaceId + '/users').then(
      resp => setAllUsers(resp.data),
    ).catch(console.error)
  }

  return (
    <Container maxWidth="sx" sx={{ mt: 12 }}>
      <Grid container spacing={2} sx={{ mt: '1vh', mx: '0.5vw', width: '19vw', height: '10vh' }}
            style={{ backgroundColor: '', alignItems: 'left' }}>
        <FormControl variant="standard" sx={{ my: '0.5vh', ml: '0vw', width: '15vw' }}
                     style={{ backgroundColor: '' }}>
          <InputLabel id="id-select-workspace-label">Workspace</InputLabel>
          <Select
            labelId="id-select-workspace-label"
            label="workspaceId"
            value={workspaceId}
            onChange={handleChangeWorkspace}>
            {allWorkspaces.map((workspace) => (
              <MenuItem key={workspace.id} value={workspace.id}>{workspace.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Search Bar, Invite Button */}
      <Grid container sx={{ my: '1vh', mx: 'auto', width: '80vw', height: '6vh' }}>
        <Grid item sx={{ width: '25vw' }}>
          <SearchBar searchText={searchText} setSearchText={setSearchText}/>
        </Grid>
        <Grid item sx={{ width: '44.5vw' }}/>
      </Grid>

      <Grid container sx={{ my: '5vh', mx: 'auto', height: '50vh' }}
            style={{ backgroundColor: '', justifyContent: 'left' }}>
        <List sx={{ my: '2vh', width: '60vw', height: '10vh' }}>
          {filterUsersBySearch(allUsers, searchText).map((user) => (
            <UserRole key={user.username} user={user} disabled={disableEdit}
                      workspaceId={workspaceId} setAllUsers={setAllUsers}/>
          ))}
        </List>
      </Grid>
    </Container>
  )
}
