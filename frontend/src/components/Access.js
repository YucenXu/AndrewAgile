import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import { Grid, Select, FormControl, MenuItem } from '@mui/material'
import SearchBar, { filterUsersBySearch } from './access/SearchBar'
import List from '@mui/material/List'
import UserRole from './access/UserRole'
import useInterval from '../hooks/useInterval'
import { canGrantPerm } from '../hooks/useScope'
import Box from '@mui/material/Box'
import axios from 'axios'

export default function Access () {
  const [workspaceId, setWorkspaceId] = React.useState(Number(localStorage.getItem('access_wid') ?? 0))
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
    localStorage.setItem('access_wid', id)
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
    // <Container maxWidth="sx" sx={{ mt: 12 }}>
    <Box>
      <Grid container sx={{ my: 'auto', mx: 'auto', width: '100%', height: '100vh' }} style={{ backgroundColor: '#' }}>
        {/* Workspace */}
        <Grid container spacing={2} sx={{ mt: '10vh', mx: 'auto', width: '95%', height: '10vh' }}
              style={{ backgroundColor: '#', alignItems: 'left' }} direction="row" alignItems="center">
          <Grid item spacing={2} sx={{ width: '20%', height: '10vh' }}
                style={{ backgroundColor: '#', alignItems: 'left' }}>
            <FormControl variant="standard" sx={{ width: '15vw' }}
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
        </Grid>

        {/* Search Bar, Invite Button */}
        <Grid container sx={{ my: '1vh', mx: 'auto', width: '95%', height: '8vh' }}
              style={{ backgroundColor: '#' }} direction="row" alignItems="center">
          <Grid item sx={{ width: '28%', height: '6vh' }}>
            <SearchBar searchText={searchText} setSearchText={setSearchText}/>
          </Grid>
        </Grid>

        {/* Users */}
        <Grid container sx={{ my: '1vh', mx: 'auto', width: '95%', height: '65vh' }}
              style={{ backgroundColor: '#' }}>
          <List sx={{ my: '2vh', width: '60vw', height: '10vh' }}>
            {filterUsersBySearch(allUsers, searchText).map((user) => (
              <UserRole key={user.username} user={user} disabled={disableEdit}
                        workspaceId={workspaceId} setAllUsers={setAllUsers}/>
            ))}
          </List>
        </Grid>
      </Grid>
      {/* </Container > */}
    </Box>
  )
}
