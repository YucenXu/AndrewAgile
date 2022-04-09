import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { ListItem, ListItemText, ListItemAvatar, Button } from '@mui/material'
import ColoredAvatar from './ColoredAvatar'
import { userFullname } from '../../utils/formats'
import Box from '@mui/material/Box'
import axios from 'axios'

function UserRole (props) {
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
    <ListItem key={props.user.username} style={{ display: 'flex', alignItems: 'center' }}>
      <ListItemAvatar>
        <ColoredAvatar name={userFullname(props.user)}/>
      </ListItemAvatar>
      <ListItemText primary={userFullname(props.user)} sx={{ mx: '5vw' }}/>
      <Box component="form" onSubmit={handleSave} sx={{ mx: '10vw', width: '15vw', height: '8vh' }}>
        <Select
          id="access"
          name="access"
          value={userRole}
          onChange={handleChange}
          disabled={props.disabled}
        >
          <MenuItem key={'admin'} value={'admin'}>Admin</MenuItem>
          <MenuItem key={'editor'} value={'editor'}>Editor</MenuItem>
          <MenuItem key={'viewer'} value={'viewer'}>Viewer</MenuItem>
        </Select>
        <Button sx={{ ml: '3vw' }} variant="outlined" disabled={props.disabled || !roleChanged}
                type="submit">save</Button>
      </Box>
    </ListItem>
  )
}

export default UserRole
