import { Doughnut } from 'react-chartjs-2'
import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import theme from '../../utils/theme'
import { capitalizeStr } from '../../utils/formats'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import BugReport from '@mui/icons-material/BugReport'
import BuildIcon from '@mui/icons-material/Build'

const options = {
  animation: false,
  cutoutPercentage: 80,
  layout: { padding: 0 },
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
  responsive: true,
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

const allTypeNames = ['story', 'issue', 'action']

const taskTypeIconDict = {
  story: StickyNote2Icon,
  issue: BugReport,
  action: BuildIcon,
}

const taskTypeColorDict = {
  story: theme.palette.info.light,
  issue: theme.palette.error.light,
  action: theme.palette.warning.light,
}

export const TasksByType = (props) => {
  const types = allTypeNames.map(typeName => {
    return {
      title: capitalizeStr(typeName),
      value: props.tasks.length === 0 ? 0
        : props.tasks.filter(task => task.type === typeName).length / props.tasks.length * 100,
      icon: taskTypeIconDict[typeName],
      color: taskTypeColorDict[typeName],
    }
  })

  const data = {
    datasets: [
      {
        data: allTypeNames.map(typeName => props.tasks.length === 0 ? 0
          : props.tasks.filter(task => task.type === typeName).length / props.tasks.length * 100),
        backgroundColor: allTypeNames.map(typeName => taskTypeColorDict[typeName]),
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: allTypeNames.map(capitalizeStr),
  }

  return (
    <Card {...props}>
      <CardHeader title="Tasks by Type"/>
      <Divider/>
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative',
          }}
        >
          <Doughnut
            data={data}
            options={options}
            type={{}}/>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2,
          }}
        >
          {types.map(({
            color,
            icon: Icon,
            title,
            value,
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center',
              }}
            >
              <Icon color="action"/>
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value.toFixed(0)}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
