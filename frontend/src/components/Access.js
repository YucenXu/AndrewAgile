import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import { Grid, Button, NativeSelect, Avatar, Card, FormControl, Box } from '@mui/material'
import Container from '@mui/material/Container'
import SearchBar from './access/SearchBar'
import List from '@mui/material/List'
import Modal from './access/Modal'
import UserRole from './access/UserRole'

export default function Access () {
  const [workspaceId, setWorkspaceId] = React.useState(0)
  const [access, setAccess] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const people = [
    {
      name: 'Peng Zhao',
      role: 'admin',
    },
    {
      name: 'Nianyi Guo',
      role: 'admin',
    },
    {
      name: 'Yucen Xu',
      role: 'admin',
    },
    {
      name: 'Zhiqi Li',
      role: 'admin',
    },
  ]
  const users = ['Peng Zhao', 'Nianyi Guo', 'Yucen Xu', 'Zhiqi Li']

  const handleChangeWorkspace = (e) => {
    // Todo
    setWorkspaceId(Number(e.target.value))
  }

  return (
    <Container maxWidth="sx" sx={{ mt: 12 }}>
      <Grid container spacing={2} sx={{ mt: '1vh', mx: '0.5vw', width: '19vw', height: '10vh' }}
            style={{ backgroundColor: '', alignItems: 'left' }}>
        <FormControl variant="standard" sx={{ my: '0.5vh', ml: '0vw', width: '15vw' }}
                     style={{ backgroundColor: '' }}>
          <InputLabel id="id-select-workspace-label">Workspace</InputLabel>
          <NativeSelect
            labelId="id-select-workspace-label"
            label="workspaceId"
            value={workspaceId}
            onChange={handleChangeWorkspace}>
            {[0, 1, 2].map((value) => (
              <option key={value} value={value}>Workspace-{value}</option>
            ))}
          </NativeSelect>
        </FormControl>
      </Grid>

      {/* Search Bar, Invite Button */}
      <Grid container sx={{ my: '1vh', mx: 'auto', width: '80vw', height: '6vh' }}>
        <Grid item sx={{ width: '25vw' }}>
          <SearchBar></SearchBar>
        </Grid>
        <Grid item sx={{ width: '44.5vw' }}></Grid>
        <Grid item sx={{ width: '10vw' }}>
          <Button variant="contained" onClick={() => setShowModal(true)}>Invite</Button>
        </Grid>
      </Grid>

      <Grid container sx={{ my: '5vh', mx: 'auto', height: '50vh' }}
            style={{ backgroundColor: '', justifyContent: 'left' }}>
        <List sx={{ my: '2vh', width: '60vw', height: '10vh' }}>
          {people.map((user) => (
            <UserRole key={user.name} name={user.name} role={user.role}/>
          ))}
        </List>
      </Grid>
      <Modal show={showModal} onClose={() => setShowModal(false)} names={people.name}/>
    </Container>
  )
}
