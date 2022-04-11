import React from 'react'
import Box from '@mui/material/Box'
import { Checkbox, Collapse, Dialog } from '@mui/material'
import { Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'
import ColoredAvatar from './access/ColoredAvatar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export default function Notification (props) {
  const [checked, setChecked] = React.useState([1])

  const handleClose = () => {
    props.setOpen(false)
    props.setUnread(3)
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  function createData (name, value) {
    return { name, value }
  }

  const rows = [
    { name: 'Type', value: 'Issue' },
    { name: 'Status', value: 'Done' },
    { name: 'Title', value: 'Task Title' },
    {
      name: 'Description', value: 'A very very very very very very very very very very very very very very very very' +
        ' very very very very very very very very very very very very long sentence',
    },
    { name: 'Assignee', value: 'pzhao2' },
  ]

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="lg"
      PaperProps={{ sx: { height: '80vh', width: '50vw' } }}
    >
      <Grid container sx={{ mt: 0, mb: '0%', width: '50vw', height: '10vh', backgroundColor: '#eeeeee' }}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ flex: 1, fontWeight: 'bold' }} variant="h6" component="div">
              Notification Center
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Grid>

      <Box sx={{ mb: '0%', width: '50vw', height: '70vh', backgroundColor: '#f2f4f4' }}>
        <List sx={{ width: '50vw', bgcolor: 'background.paper' }}>
          {[0, 1, 2].map((id) =>
            <Box>
              <ListItem
                key={id}
                secondaryAction={
                  <Checkbox
                    onChange={handleToggle(id)}
                    checked={checked.indexOf(id) !== -1}
                    inputProps={{ 'aria-labelledby': id }}
                  />
                }
              >
                <ListItemAvatar>
                  <ColoredAvatar name={'Peng Zhao'}/>
                </ListItemAvatar>
                <ListItemText
                  onClick={handleToggle(id)}
                  primary="[TaskCreate] Workspace Workspace-1, Project Project-1, Task SampleTask-2"
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Peng Zhao
                    </Typography>
                  }
                />
              </ListItem>
              <Collapse
                key={id}
                in={checked.indexOf(id) !== -1}
                timeout="auto"
                unmountOnExit
                sx={{ ml: '4vw' }}
              >
                <Table sx={{ width: '36vw' }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: '5vw' }}>Task Attribute</TableCell>
                      <TableCell align="left">New Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Collapse>
              <Divider variant="inset" component="li"/>
            </Box>,
          )}
        </List>
      </Box>
    </Dialog>
  )
}
