import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { ListItem, ListItemText, ListItemAvatar, Avatar, FormControl, InputLabel } from '@mui/material'
import ColoredAvatar from './ColoredAvatar'

function UserRole (props) {
  const [access, setAccess] = React.useState(' ')

  const handleChangeAccess = (e) => {
    setAccess(e.target.value)
  }

  return (
    <ListItem style={{ display: 'flex', alignItems: 'center' }}>
      <ListItemAvatar>
        <ColoredAvatar name={props.name}/>
      </ListItemAvatar>
      <ListItemText primary={props.name} sx={{ mx: '3vw' }}/>
      <FormControl sx={{ mx: '3vw', width: '20vw' }}>
        <InputLabel>Access</InputLabel>
        <Select defaultValue={{ role: `${props.role}` }} value={access} label="Access" onChange={handleChangeAccess}
                sx={{ height: '8vh' }} disabled={props.disableEdit}>
          <MenuItem value={'Admin'}>Admin</MenuItem>
          <MenuItem value={'Editor'}>Editor</MenuItem>
          <MenuItem value={'Viewer'}>Viewer</MenuItem>
        </Select>
      </FormControl>
    </ListItem>
  )
}

export default UserRole
