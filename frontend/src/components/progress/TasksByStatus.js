import { Bar } from 'react-chartjs-2'
import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material'
import theme from '../../utils/theme'
import { Chart, registerables } from 'chart.js'
import { capitalizeStr } from '../../utils/formats'

Chart.register(...registerables)

const statusColorDict = {
  backlog: 'rgb(74,128,231)',
  todo: 'rgb(236,236,118)',
  inprogress: 'rgb(246,124,106)',
  done: 'rgb(140,222,168)',
  archived: 'rgb(128,128,128)',
}

const options = {
  animation: false,
  cornerRadius: 20,
  layout: { padding: 0 },
  legend: { display: false },
  maintainAspectRatio: false,
  responsive: true,
  xAxes: [
    {
      ticks: {
        fontColor: theme.palette.text.secondary,
      },
      gridLines: {
        display: false,
        drawBorder: false,
      },
    },
  ],
  yAxes: [
    {
      ticks: {
        fontColor: theme.palette.text.secondary,
        beginAtZero: true,
        min: 0,
      },
      gridLines: {
        borderDash: [2],
        borderDashOffset: [2],
        color: theme.palette.divider,
        drawBorder: false,
        zeroLineBorderDash: [2],
        zeroLineBorderDashOffset: [2],
        zeroLineColor: theme.palette.divider,
      },
    },
  ],
  tooltips: {
    backgroundColor: theme.palette.background.paper,
    bodyFontColor: theme.palette.text.secondary,
    borderColor: theme.palette.divider,
    borderWidth: 1,
    enabled: true,
    footerFontColor: theme.palette.text.secondary,
    intersect: false,
    mode: 'index',
    titleFontColor: theme.palette.text.primary,
  },
}

export const TasksByStatus = (props) => {
  const data = {
    datasets: ['backlog', 'todo', 'inprogress', 'done', 'archived'].map(status => {
      return {
        backgroundColor: statusColorDict[status],
        barPercentage: 0.5,
        barThickness: 30,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: props.projects.map(project =>
          props.tasks.filter(task => task.projectId === project.id && task.status === status).length,
        ),
        label: capitalizeStr(status),
        maxBarThickness: 20,
      }
    }),
    labels: props.projects.map(project => project.name),
  }

  return (
    <Card {...props}>
      <CardHeader
        title="Tasks by Status"
      />
      <Divider/>
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <Bar
            data={data}
            options={options}
            type={{}}/>
        </Box>
      </CardContent>
      <Divider/>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      />
    </Card>
  )
}
