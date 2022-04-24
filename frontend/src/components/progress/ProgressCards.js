import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import InsertChartIcon from '@mui/icons-material/InsertChart'

export const NumberCard = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
          >
            {props.title}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.number}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56,
            }}
          >
            <WorkIcon/>
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)

export const PercentageCard = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
          >
            {props.title}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.percent.toFixed(1).toString()}%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56,
            }}
          >
            <InsertChartIcon/>
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={props.percent}
          variant="determinate"
          color={props.color}
        />
      </Box>
    </CardContent>
  </Card>
)
