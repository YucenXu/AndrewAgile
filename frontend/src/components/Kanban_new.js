import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function SpacingGrid() {
  const [project, setProject] = React.useState(0);

  const handleChange = (event) => {
    setProject(Number(event.target.value));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  return (
    <Box>
      <FormControl fullWidth sx={{mt: 10, ml: 6, width: 120}}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
         Project
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
        {[0,1,2].map((value) => (
          <option value={{value}}>Project-{value}</option>
          ))}
        </NativeSelect>
      </FormControl>

      <FormControl fullWidth sx={{mt: 10, ml: 5, width: 160}}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
         Workspace
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
        {[0,1,2].map((value) => (
          <option value={{value}}>Workspace-{value}</option>
          ))}
        </NativeSelect>
      </FormControl>

      <Grid container spacing={2} sx={{mt: 2, ml: 3}}>
        {[0, 1, 2, 3].map((value) => (
            // <Paper
            //   sx={{
            //     height: 240,
            //     width: 100,
            //     backgroundColor: (theme) =>
            //       theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            //   }}
            // /> 
            <Grid container spacing={2} sx={{mt: 2, ml: 3, width: 200, height: 350}} style={{backgroundColor: '#d5d8dc', overflow: 'auto'}}>
              <Grid item xs>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Backlog
                </Typography>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <Card sx={{mt: 1, width: 150}}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Task{value}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              </Grid>
            </Grid>
        ))}
      </Grid>
    </Box>
      
      
    );
}
