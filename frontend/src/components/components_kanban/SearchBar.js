import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '25vw'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '8vh',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CloseIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 60),
    height: '8vh',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`
  },
  width: '20vw',
  height: '7vh'
}));


export default function SearchBar() {
    const [searchText, setSearchText] = React.useState();
    const handleSearch = (event) => {
        setSearchText(event.target.value);
    }
    
    const handleCancelSearch = (event) => {
        setSearchText("");
    }
    

    return (
        <Box>
        <Grid container component="form" sx={{ mx: "0.5vw", width: "25vw", height: "6vh", border: 2, borderColor: '#1976d2', borderRadius: 1, backgroundColor:"#"}} direction="column" justifyContent="center">
            <Grid container sx={{width: "2vw", height: "5vh", mx: "auto", my: "auto", backgroundColor:""}} direction="column" justifyContent="center">
                <SearchIcon sx={{width: "2vw", mt: "0.5vh"}}/>
            </Grid>
            <Grid container sx={{width: "18vw", height: "5vh", mx:"auto", backgroundColor:"#"}}>
                <InputBase 
                        placeholder="Search Task…"
                        inputProps={{ style: {textAlign: 'left', fontSize: "1.5vw"} }}
                        onChange={handleSearch}
                        onCancelSearch={handleCancelSearch}
                        fullWidth={true}
                        value={searchText}
                        sx={{height: "5vh"}}
                />
            </Grid>
            <Grid container sx={{width: "2vw", height: "5vh", mx: "auto", my: "auto", backgroundColor:""}} direction="column" justifyContent="center">
                <CloseOutlinedIcon sx={{width: "2vw", mt: "0.5vh"}}/>
            </Grid>
        </Grid>

            {/* For debugging, will delete */}
            {/* SearchText:{searchText} */}
        </Box>
    );
}
