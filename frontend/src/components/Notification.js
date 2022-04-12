import React from 'react'
import Box from '@mui/material/Box'
import { Button, Checkbox, Collapse, Dialog } from '@mui/material'
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
import axios from 'axios'
import useInterval from '../hooks/useInterval'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { capitalizeStr, formatDateTime } from '../utils/formats'

function TaskChangelist (props) {
  if ('changelist' in props.msg) {
    return (
      <Collapse
        key={props.msg.id}
        in={props.collapsed.includes(props.msg.id)}
        timeout="auto"
        unmountOnExit
        sx={{ ml: '4vw' }}
      >
        <Table sx={{ width: '40vw' }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ width: '7vw', fontWeight: 'bold' }}>Task Attribute</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>New Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{
            Object.keys(props.msg.changelist).map((fieldName, _) => (
              <TableRow key={fieldName}>
                <TableCell component="th" scope="row" align="left">
                  {capitalizeStr(fieldName)}
                </TableCell>
                <TableCell align="left">
                  {props.msg.changelist[fieldName]}
                </TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
      </Collapse>
    )
  } else {
    return null
  }
}

export default function Notification (props) {
  const [msgs, setMsgs] = React.useState([])
  const [selected, setSelected] = React.useState([])
  const [selectAll, setSelectAll] = React.useState(false)
  const [collapsed, setCollapsed] = React.useState([])

  React.useEffect(() => pullUserMessages(), [])
  useInterval(() => pullUserMessages(), 10000)

  const pullUserMessages = () => {
    axios.get('/api/messages').then(
      resp => {
        const newMsgs = resp.data
        setMsgs(newMsgs)
        props.setUnread(newMsgs.length)

        const newMsgIds = newMsgs.map(msg => msg.id)
        const newSelected = selected.filter(msgId => newMsgIds.includes(msgId))
        const newCollapsed = collapsed.filter(msgId => newMsgIds.includes(msgId))

        setSelected(newSelected)
        setCollapsed(newCollapsed)
        setSelectAll(newSelected.length === newMsgIds.length)
      },
    ).catch(console.error)
  }

  const handleMarkAsRead = () => {
    axios.delete('/api/messages', { data: selected }).then(
      () => pullUserMessages(),
    ).catch(console.error)
  }

  const handleClose = () => props.setOpen(false)

  const handleSelect = (msgId) => {
    const currentIdx = selected.indexOf(msgId)
    const newSelected = [...selected]

    if (currentIdx === -1) {
      newSelected.push(msgId)
    } else {
      newSelected.splice(currentIdx, 1)
    }

    setSelected(newSelected)
    setSelectAll(newSelected.length === msgs.length)
  }

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelected(msgs.map(msg => msg.id))
      setSelectAll(true)
    } else {
      setSelected([])
      setSelectAll(false)
    }
  }

  const handleCollapse = (msgId) => {
    const currentIdx = collapsed.indexOf(msgId)
    const newCollapsed = [...collapsed]

    if (currentIdx === -1) {
      newCollapsed.push(msgId)
    } else {
      newCollapsed.splice(currentIdx, 1)
    }

    setCollapsed(newCollapsed)
  }

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
          <ListItem style={{ display: 'flex' }}>
            <Grid container item xs={8} justifyContent="flex-start">
              <Typography
                sx={{ fontWeight: 'bold', fontSize: '18px' }}
                component="span"
                variant="body"
                color="text.primary"
              >
                {msgs.length > 0 ? 'Recent messages' : 'No new messages'}
              </Typography>
            </Grid>
            <Grid container item xs={4} justifyContent="flex-end" direction="row"
                  sx={{ visibility: msgs.length > 0 ? 'visible' : 'hidden' }}>
              <Button variant="contained" style={{ width: '70%', height: '100%' }}
                      onClick={handleMarkAsRead}>Mark as read</Button>
              <Checkbox
                onChange={handleSelectAll}
                checked={selectAll}
              />
            </Grid>
          </ListItem>

          {msgs.map((msg) =>
            <React.Fragment key={msg.id}>
              <ListItem
                key={msg.id}
                secondaryAction={
                  <Checkbox
                    onChange={() => handleSelect(msg.id)}
                    checked={selected.includes(msg.id)}
                    inputProps={{ 'aria-labelledby': msg.id }}
                  />
                }
              >
                <ListItemAvatar>
                  <ColoredAvatar name={msg.operator}/>
                </ListItemAvatar>
                <ListItemText
                  onClick={() => handleCollapse(msg.id)}
                  primary={
                    <>
                      {`[${msg.type}] ${msg.subject}`}
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        sx={{
                          visibility: 'changelist' in msg ? 'visible' : 'hidden',
                          color: 'inherit',
                        }}
                      >
                        {
                          collapsed.includes(msg.id) ?
                            <KeyboardArrowUpIcon/> :
                            <KeyboardArrowDownIcon/>
                        }
                      </IconButton>
                    </>
                  }
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${msg.operator} — ${formatDateTime(msg.timestamp)}`}
                    </Typography>
                  }
                />
              </ListItem>

              <TaskChangelist msg={msg} collapsed={collapsed}/>

              <Divider variant="inset" component="li"/>
            </React.Fragment>,
          )}
        </List>
      </Box>
    </Dialog>
  )
}
