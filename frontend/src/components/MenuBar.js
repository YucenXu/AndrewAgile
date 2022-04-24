import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ViewKanbanIcon from '@mui/icons-material/ViewKanban'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import PeopleIcon from '@mui/icons-material/People'
import HelpIcon from '@mui/icons-material/Help'
import LogoutIcon from '@mui/icons-material/Logout'
import List from '@mui/material/List'
import { AuthConsumer, initialAuth } from '../hooks/useAuth'
import axios from 'axios'

const MenuBar = () => {
  const { setAuth } = AuthConsumer()

  const handleLogout = event => {
    event.preventDefault()
    localStorage.clear()
    axios.post('/api/logout').then(() => {
      setAuth({ ...initialAuth.auth })
      // reload the web page to trigger Google OAuth2
      window.location.reload()
    }).catch(console.error)
  }

  return (
    <List component="nav">
      <ListItemButton component="a" href="/" selected={window.location.pathname === '/'}>
        <ListItemIcon>
          <ViewKanbanIcon/>
        </ListItemIcon>
        <ListItemText primary="Kanban"/>
      </ListItemButton>
      <ListItemButton component="a" href="/progress" selected={window.location.pathname === '/progress'}>
        <ListItemIcon>
          <AutoGraphIcon/>
        </ListItemIcon>
        <ListItemText primary="Progress"/>
      </ListItemButton>
      <ListItemButton component="a" href="/access" selected={window.location.pathname === '/access'}>
        <ListItemIcon>
          <PeopleIcon/>
        </ListItemIcon>
        <ListItemText primary="Access"/>
      </ListItemButton>
      <ListItemButton component="a" href="/help" selected={window.location.pathname === '/help'}>
        <ListItemIcon>
          <HelpIcon/>
        </ListItemIcon>
        <ListItemText primary="Help"/>
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon/>
        </ListItemIcon>
        <ListItemText primary="Logout"/>
      </ListItemButton>
    </List>
  )
}

export default MenuBar
