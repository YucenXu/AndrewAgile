import * as React from 'react';
import Grid from '@mui/material/Grid';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardActionArea } from '@mui/material';
import { Dialog, DialogTitle } from '@mui/material';


export default function SpacingGrid() {
  const columnType = ['Backlog', 'Todo', 'In Progress', 'Done']
  const [projectId, setProjectId] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState(0)


  const handleChangeProject = (event) => {
    setProjectId(Number(event.target.value));
  };

  const handleClickTask = (taskId) => (event) => {
    setOpen(true);
    setTask(Number(taskId));
  };

  const handleCloseTask = () => {
    setOpen(false);
  }

  return (
    <Box>
      <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "80vw"}} style={{alignItems: "left"}}>
        <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "20vw"}} style={{alignItems: "left"}}>
          <FormControl sx={{mt: 8, ml: "1vw", width: 200}}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Workspace
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: 'workspace',
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
          <FormControl variant="standard" sx={{mt: 8, ml: "1vw", width: 200}}>
            <InputLabel id="id-select-poject-label">Project</InputLabel>
            <NativeSelect
              labelId="id-select-poject-label"
              label="projectId"
              value={projectId}
              onChange={handleChangeProject}
            >
              {[0,1,2].map((value) => (
                <option value={value}>Project-{value}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        
        <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "20vw"}} style={{alignItems: "left"}}></Grid>
        <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "20vw"}} style={{alignItems: "left"}}></Grid>
      </Grid>


      <Grid container spacing={2} sx={{mt: 2, mx: "auto", width: "80vw"}} style={{alignItems: "center"}}>
        {columnType.map((value) => (
            <Grid container spacing={2} sx={{ mx: "auto", ml: "1vw", my: 2, width: "19vw", height: 350}} style={{backgroundColor: '#d5d8dc', overflow: 'auto', alignItems: "center"}}>
              <Grid item xs>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {value}
                </Typography>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((taskId) => (
                  <Card sx={{mt: 1, width: 150}}>
                    <CardActionArea type="submit" onClick={handleClickTask(taskId)}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              Task{taskId}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                  </Card>
                
              ))}
              </Grid>
            </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleCloseTask}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Task-{task}</DialogTitle>
      </Dialog>

    </Box>
      
      
    );
}
