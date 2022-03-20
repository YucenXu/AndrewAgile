import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function SpacingGrid() {
  const [project, setProject] = React.useState(0);

  const handleChange = (event) => {
    setProject(Number(event.target.value));
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "80vw"}} style={{alignItems: "left"}}>
        <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "20vw"}} style={{alignItems: "left"}}>
          <FormControl fullWidth sx={{mt: 8, ml: "1vw", width: 200}}>
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
        </Grid>
        <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "20vw"}} style={{alignItems: "left"}}>
          <FormControl fullWidth sx={{mt: 8, ml: "1vw", width: 200}}>
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
        </Grid>
        <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "20vw"}} style={{alignItems: "left"}}></Grid>
        <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "20vw"}} style={{alignItems: "left"}}></Grid>
      </Grid>


      <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "80vw"}} style={{alignItems: "center"}}>
        {[0, 1, 2, 3].map((value) => (
            <Grid container spacing={2} sx={{ mx: "auto", ml: "1vw", my: 2, width: "19vw", height: 350}} style={{backgroundColor: '#d5d8dc', overflow: 'auto', alignItems: "center"}}>
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
