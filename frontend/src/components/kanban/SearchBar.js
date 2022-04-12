import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

export const filterTasksBySearch = (allTasks, searchText) => {
  return Object.values(allTasks).map(
    tasks => tasks.filter(
      task => task.title.toLowerCase().includes(searchText.toLowerCase()),
    ),
  )
}

export const filterTasksByWatch = (allTasks, curUsername) => {
  return Object.values(allTasks).map(
    tasks => tasks.filter(
      task => task.watchers?.includes(curUsername),
    ),
  )
}

export default function SearchBar (props) {

  const handleSearch = (event) => {
    props.setSearchText(event.target.value)
  }

  const handleCancelSearch = () => {
    props.setSearchText('')
  }

  return (
    <Box>
      <Grid container sx={{
        mx: '0.5vw',
        width: '25vw',
        height: '6vh',
        backgroundColor: '#',
      }} direction="column" justifyContent="center">
        <Grid container sx={{ width: '2vw', height: '5vh', mx: 'auto', my: 'auto', backgroundColor: '' }}
              direction="column" justifyContent="center">
          <SearchIcon sx={{ width: '2vw', mt: '0.5vh' }}/>
        </Grid>
        <Grid container sx={{ width: '18vw', height: '5vh', mx: 'auto', backgroundColor: '#' }}>
          <TextField
            placeholder="Search Task…"
            inputProps={{ style: { textAlign: 'left', fontSize: '1.5vw' } }}
            onChange={handleSearch}
            fullWidth={true}
            value={props.searchText}
            sx={{ height: '5vh' }}
          />
        </Grid>
        <Grid container sx={{ width: '2vw', height: '5vh', mx: 'auto', my: 'auto', backgroundColor: '' }}
              direction="column" justifyContent="center">
          <IconButton sx={{ p: '10px', width: '2vw', height: '2vw' }} onClick={handleCancelSearch}>
            <CloseOutlinedIcon sx={{ width: '2vw', mt: '0.5vh' }}/>
          </IconButton>
        </Grid>
      </Grid>

      {/* For debugging, will delete */}
      {/* SearchText:{searchText} */}
    </Box>
  )
}
