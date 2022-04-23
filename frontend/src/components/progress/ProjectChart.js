import React from "react";
import Paper from '@mui/material/Paper';
import {
Chart,
Title
} from '@devexpress/dx-react-chart-material-ui';

import {
  PieSeries as PieSeriesBase,
} from '@devexpress/dx-react-chart';


const ProjectChart = (props) => {
console.log(props.data)
// Sample data
const data = [
{ argument:'Backlog', value:props.data.Backlog },
{ argument:'Todo', value:props.data.todo },
{ argument:'In Progress', value:props.data.inprogress },
{ argument:'Done', value:props.data.done},
];
return (
	<Paper>
	<Chart
	data={data}
	>
	<PieSeriesBase valueField="value" Title="hhh" argumentField="argument" />
	<Title text="Project Progress Pie Chart"/>
	</Chart>
  <div style={{width:'20px',height:'20px',backgroundColor:'rgb(66, 165, 245)', marginBottom:'10px'}}><span style={{position:"relative",left:'30px'}}>:&nbsp;Backlog</span></div>
  <div style={{width:'20px',height:'20px',backgroundColor:'rgb(255, 112, 67)', marginBottom:'10px'}}><span style={{position:"relative",left:'30px'}}>:&nbsp;Todo</span></div>
  <div style={{width:'20px',height:'20px',backgroundColor:'rgb(156, 204, 101)', marginBottom:'10px'}}><span style={{position:"relative",left:'30px',display:"inline-block", width:"100px"}}>:&nbsp;In Progress</span></div>
  <div style={{width:'20px',height:'20px',backgroundColor:'rgb(255, 202, 40)', marginBottom:'10px'}}><span style={{position:"relative",left:'30px'}}>:&nbsp;Done</span></div>
</Paper>
);
}

export default ProjectChart;
