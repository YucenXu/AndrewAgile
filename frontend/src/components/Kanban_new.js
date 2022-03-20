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
  const columnTypes = ['Backlog', 'Todo', 'In Progress', 'Done']
  const [projectId, setProjectId] = React.useState(0);
  const [workspaceId, setWorkspaceId] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState(0)


  const handleChangeProject = (event) => {
    setProjectId(Number(event.target.value));
  };

  const handleChangeWorkspace = (event) => {
    setWorkspaceId(Number(event.target.value));
  }

  const handleClickTask = (taskId) => (event) => {
    setOpen(true);
    setTask(Number(taskId));
  };

  const handleCloseTask = () => {
    setOpen(false);
  }

  return (
    <Box>
      {/* Dropdown menus */}
      <Grid container spacing={2} sx={{mt: "13vh", mx: "auto", width: "80vw", height: "12vh"}} style={{backgroundColor: '#6495ed', alignItems: "left"}}>
        <Grid container spacing={2} sx={{mt:"1vh", mx: "0.5vw", width: "19vw", height: "10vh"}} style={{backgroundColor: '#ccccff', alignItems: "left"}}>
          <FormControl variant="standard" sx={{ my:"0.5vh", ml: "1vw", width: "15vw"}} style={{backgroundColor: '#9fe2bf'}}>
            <InputLabel id="id-select-workspace-label">Workspace</InputLabel>
            <NativeSelect
              labelId="id-select-workspace-label"
              label="workspaceId"
              value={workspaceId}
              onChange={handleChangeWorkspace}
            >
            {[0,1,2].map((value) => (
              <option value={value}>Workspace-{value}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>

        <Grid container spacing={2} sx={{mt:"1vh", mx: "0.5vw", width: "19vw", height: "10vh"}} style={{backgroundColor: '#ccccff', alignItems: "left"}}>
          <FormControl variant="standard" sx={{ my:"0.5vh", ml: "1vw", width: "15vw"}} style={{backgroundColor: '#9fe2bf'}}>
            <InputLabel id="id-select-project-label">Project</InputLabel>
            <NativeSelect
              labelId="id-select-project-label"
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
        
        <Grid container spacing={2} sx={{mt:"1vh", mx: "0.5vw", width: "19vw", height: "10vh"}} style={{backgroundColor: '#ccccff', alignItems: "left"}}></Grid>
        <Grid container spacing={2} sx={{mt:"1vh", mx: "0.5vw", width: "19vw", height: "10vh"}} style={{backgroundColor: '#ccccff', alignItems: "left"}}></Grid>
      </Grid>

      {/* Board */}
      <Grid container sx={{mx: "auto", my: "1vh", width: "80vw", height: "70vh"}} style={{backgroundColor: '#6495ed', alignItems: "center"}}>
        {columnTypes.map((columnType) => (
          // Column
          <Grid container spacing={2} sx={{mx: "0.5vw", my: "1vh", width: "19vw", height: "68vh"}} style={{backgroundColor: '#ccccff', alignItems: "center"}}>
            {/* title */}
            <Grid item xs sx={{ width: "19vw", height: "8vh"}} style={{backgroundColor: '#9fe2bf'}}>
              <Typography sx={{ ml:"0.2vw", fontSize: 14, fontWeight: 700}} color="text.secondary" gutterBottom>
                  {columnType}
              </Typography>
            </Grid>
            {/* tasks */}
            <Grid item spacing={2} sx={{width: "19vw", height: "60vh"}} style={{backgroundColor: '#d5d8dc', overflow: 'auto', alignItems: "center"}}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((taskId) => (
                  <Card sx={{mb: 1, width: 150}}>
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

      {/* For debugging, will delete */}
      <Typography sx={{ fontSize: 14 }} color="text.secondary">Current Project-{projectId} Current Workspace-{workspaceId}</Typography>
    </Box>
      
      
    );
}
