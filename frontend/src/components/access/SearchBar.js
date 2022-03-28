import * as React from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

export default function SearchBar () {
  const [searchText, setSearchText] = React.useState()

  const handleSearch = (event) => {
    // Todo
    setSearchText(event.target.value)
  }

  const handleCancelSearch = (event) => {
    // Todo
    setSearchText('')
  }

  return (
    <Box>
      <Grid container component="form" sx={{
        mx: '0.5vw',
        width: '25vw',
        height: '6vh',
        border: 2,
        borderColor: '#1976d2',
        borderRadius: 1,
        backgroundColor: '#',
      }} direction="column" justifyContent="center">
        <Grid container sx={{ width: '2vw', height: '5vh', mx: 'auto', my: 'auto', backgroundColor: '' }}
              direction="column" justifyContent="center">
          <SearchIcon sx={{ width: '2vw', mt: '0.5vh' }}/>
        </Grid>
        <Grid container sx={{ width: '18vw', height: '5vh', mx: 'auto', backgroundColor: '#' }}>
          <InputBase
            placeholder="Search User…"
            inputProps={{ style: { textAlign: 'left', fontSize: '1.5vw' } }}
            onChange={handleSearch}
            onCancelSearch={handleCancelSearch}
            fullWidth={true}
            value={searchText}
            sx={{ height: '5vh' }}
          />
        </Grid>
        <Grid container sx={{ width: '2vw', height: '5vh', mx: 'auto', my: 'auto', backgroundColor: '' }}
              direction="column" justifyContent="center">
          <IconButton sx={{ p: '10px', width: '2vw', height: '2vw' }}>
            <CloseOutlinedIcon sx={{ width: '2vw', mt: '0.5vh' }} onClick={handleCancelSearch}/>
          </IconButton>
        </Grid>
      </Grid>

      {/* For debugging, will delete */}
      {/* SearchText:{searchText} */}
    </Box>
  )
}
