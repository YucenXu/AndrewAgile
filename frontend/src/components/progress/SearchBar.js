import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "@mui/material";

export const filterProjectBySearch = (allProjects, searchText) => {
  return allProjects.filter((project) =>
    project.name.toLowerCase().includes(searchText.toLowerCase())
  );
};

export default function SearchBar(props) {
  const handleSearch = (event) => {
    props.setSearchText(event.target.value);
    setValue(event.target.value);
  };

  const handleCancelSearch = () => {
    props.setSearchText("");
  };
  const [value, setValue] = React.useState("");

  return (
    <Box>
      <Grid
        container
        sx={{
          mx: "0.5vw",
          width: "23vw",
          height: "6vh",
          backgroundColor: "#",
        }}
        direction='column'
        justifyContent='center'
      >
        {/* Search text */}
        <Grid
          container
          sx={{
            width: "18vw",
            height: "5vh",
            mx: "auto",
            backgroundColor: "#",
          }}
        >
          <TextField
            placeholder='Search Projects …'
            inputProps={{
              style: { textAlign: "left", fontSize: "1vw", height: "1vh" },
            }}
            onChange={handleSearch}
            fullWidth={true}
            value={value}
          />
          <Button
            style={{
              position: "absolute",
              top: "175px",
              right: "55%",
              cursor: "pointer",
            }}
            onClick={() => {
              props.searchBlur();
            }}
          >
            search
          </Button>
        </Grid>
        {/* Cancel Icon */}
        <Grid
          container
          sx={{
            width: "2vw",
            height: "5vh",
            mx: "auto",
            my: "auto",
            backgroundColor: "",
          }}
          direction='column'
          justifyContent='center'
        >
          <IconButton
            sx={{ p: "10px", width: "2vw", height: "2vw" }}
            onClick={handleCancelSearch}
          >
            <CloseOutlinedIcon sx={{ width: "2vw", mt: "0.5vh" }} />
          </IconButton>
        </Grid>
        {/* Search */}
        <Grid
          container
          sx={{
            width: "2vw",
            height: "5vh",
            mx: "auto",
            my: "auto",
            backgroundColor: "",
          }}
          direction='column'
          justifyContent='center'
        ></Grid>
      </Grid>
    </Box>
  );
}
