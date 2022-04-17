import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { ListItem, ListItemText, ListItemAvatar, Button } from '@mui/material'
import ColoredAvatar from './ColoredAvatar'
import { userFullname } from '../../utils/formats'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import axios from 'axios'

function UserRole(props) {
  const [userRole, setUserRole] = React.useState(props.user.role)
  const [roleChanged, setRoleChanged] = React.useState(false)

  React.useEffect(() => {
    setUserRole(props.user.role)
  }, [props.user.role])

  const handleChange = (event) => {
    const newRole = event.target.value
    setUserRole(newRole)
    setRoleChanged(newRole !== props.user.role)
  }

  const handleSave = (event) => {
    event.preventDefault()
    const payload = { [props.user.username]: userRole }
    axios.put('/api/workspace/' + props.workspaceId + '/users', payload).then(resp => {
      props.setAllUsers(resp.data)
      setRoleChanged(false)
    },
    ).catch(console.error)
  }

  return (
    <ListItem key={props.user.username} sx={{ my: '3vh', height: '5vh' }}
              style={{ display: 'flex', alignItems: 'center', backgroundColor: '#eeeeee' }}>
      {/* Avatar */}
      <Grid container sx={{ width: '3vw' }} style={{ backgroundColor: '#' }}>
        <ListItemAvatar>
          <ColoredAvatar name={userFullname(props.user)} />
        </ListItemAvatar>
      </Grid>
      {/* Username */}
      <Grid container sx={{ width: '20vw' }} style={{ backgroundColor: '#' }}>
        <ListItemText primary={userFullname(props.user) + ' (' + props.user.username + ')'} sx={{ mx: '2vw' }} />
      </Grid>
      {/* Change Access */}
      <Box component="form" onSubmit={handleSave} sx={{ width: '30vw', height: '5vh' }} style={{ backgroundColor: '#' }}
      >
        <Grid container sx={{ width: '30vw' }} style={{ backgroundColor: '#' }}>
          {/* Access Dropdown */}
          <Grid container sx={{ width: '10vw' }} style={{ backgroundColor: '#' }}>
            <Select
              id="access"
              name="access"
              value={userRole}
              onChange={handleChange}
              disabled={props.disabled}
              sx={{ width: '10vw', height: '5vh' }}
            >
              <MenuItem key={'admin'} value={'admin'}>Admin</MenuItem>
              <MenuItem key={'editor'} value={'editor'}>Editor</MenuItem>
              <MenuItem key={'viewer'} value={'viewer'}>Viewer</MenuItem>
            </Select>
          </Grid>
          {/* Save Button */}
          <Grid container sx={{ width: '15vw' }} style={{ backgroundColor: '#' }}>
            <Button sx={{ ml: '3vw', width: '5vw', height: '5vh' }} variant="outlined"
                    disabled={props.disabled || !roleChanged} type="submit">save</Button>
          </Grid>
        </Grid>
        {/* Placeholder */}
        <Grid container sx={{ width: '5vw' }} style={{ backgroundColor: '#' }}/>
      </Box>
    </ListItem>
  )
}

export default UserRole
