import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Divider, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardActionArea } from '@mui/material';
import { Dialog, DialogTitle } from '@mui/material';
import SearchBar from './kanban/SearchBar';

export default function Kanban() {
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

  const handleCreate = () => {
    alert("create task");
  }

  return (
    <Box>
      {/* Dropdown menus */}
      <Grid container spacing={2} sx={{ mt: "13vh", mx: "auto", width: "80vw", height: "12vh" }} style={{ backgroundColor: '', alignItems: "left" }}>
        <Grid container spacing={2} sx={{ mt: "1vh", mx: "0.5vw", width: "19vw", height: "10vh" }} style={{ backgroundColor: '', alignItems: "left" }}>
          <FormControl variant="standard" sx={{ my: "0.5vh", ml: "0vw", width: "15vw" }} style={{ backgroundColor: '' }}>
            <InputLabel id="id-select-workspace-label">Workspace</InputLabel>
            <NativeSelect
              labelId="id-select-workspace-label"
              label="workspaceId"
              value={workspaceId}
              onChange={handleChangeWorkspace}
            >
              {[0, 1, 2].map((value) => (
                <option value={value}>Workspace-{value}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>

        <Grid container spacing={2} sx={{ mt: "1vh", mx: "0.5vw", width: "19vw", height: "10vh" }} style={{ backgroundColor: '', alignItems: "left" }}>
          <FormControl variant="standard" sx={{ my: "0.5vh", ml: "0vw", width: "15vw" }} style={{ backgroundColor: '' }}>
            <InputLabel id="id-select-project-label">Project</InputLabel>
            <NativeSelect
              labelId="id-select-project-label"
              label="projectId"
              value={projectId}
              onChange={handleChangeProject}
            >
              {[0, 1, 2].map((value) => (
                <option value={value}>Project-{value}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>

        <Grid container spacing={2} sx={{ mt: "1vh", mx: "0.5vw", width: "19vw", height: "10vh" }} style={{ backgroundColor: '', alignItems: "left" }}></Grid>
        <Grid container spacing={2} sx={{ mt: "1vh", mx: "0.5vw", width: "19vw", height: "10vh" }} style={{ backgroundColor: '', alignItems: "left" }}></Grid>
      </Grid>

      {/* Search Bar, Create Button */}
      <Grid container sx={{ my: "1vh", mx: "auto", width: "80vw", height: "6vh" }} style={{ backgroundColor: '' }}>
        <Grid item sx={{ width: "25vw" }}>
          <SearchBar></SearchBar>
        </Grid>
        <Grid item sx={{ width: "44.5vw" }}></Grid>
        <Grid item sx={{ width: "10vw" }}>
          <Button variant="contained" sx={{ mr: "0.5vw", width: "10vw", height: "6vh" }} onClick={handleCreate}>Create</Button>
        </Grid>
      </Grid>

      {/* Board */}
      <Grid container sx={{ my: "2vh", mx: "auto", width: "80vw", height: "60vh" }} style={{ alignItems: "center" }}>
        {columnTypes.map((columnType) => (
          // Column
          <Paper sx={{ my: "0vh", mx: "0.5vw", width: "19vw", height: "60vh" }} style={{ backgroundColor: '#eaecee' }}>
            {/* title */}
            <Grid item xs sx={{ mt: "1vh", width: "19vw", height: "6vh" }} direction="row" display="flex" justify="center" >
              <Typography sx={{ ml: "2vw", my: "auto", width: "12vw", fontSize: 18, fontWeight: 700 }} color="#424949">
                {columnType}
              </Typography>
            </Grid>
            <Divider></Divider>
            {/* tasks */}
            <Grid item spacing={2} sx={{ my: "0.5vh", width: "19vw", height: "53vh" }} style={{ backgroundColor: '#eaecee', overflow: 'auto' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((taskId) => (
                <Card sx={{ ml: "2vw", my: 0.5, width: "14vw" }} style={{ backgroundColor: '#f2f4f4' }}>
                  <CardActionArea type="submit" onClick={handleClickTask(taskId)}>
                    <CardContent>
                      <Typography sx={{ fontSize: 18, fontWeight: 1000 }} color="#515a5a" gutterBottom>
                        Task{taskId}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Grid>
          </Paper>
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
      <Typography sx={{ fontSize: 14 }} color="text.secondary">Current Workspace-{workspaceId}  Current Project-{projectId}</Typography>
    </Box>

  );
}
