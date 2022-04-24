import PerfectScrollbar from 'react-perfect-scrollbar'
import { Box, Card, CardHeader, Tooltip } from '@mui/material'
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { styled } from '@mui/material/styles'
import { capitalizeStr, formatDateTime } from '../../utils/formats'
import { statusColorDict } from '../kanban/TaskEdit'

const StatusLabelRoot = styled('span')(({ theme, ownerState }) => {
  const backgroundColor = ownerState.color
  const color = 'black'

  return {
    alignItems: 'center',
    backgroundColor,
    borderRadius: 12,
    color,
    cursor: 'default',
    display: 'inline-flex',
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 2,
    fontWeight: 600,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  }
})

const StatusLabel = (props) => {
  const { color, children, ...other } = props
  const ownerState = { color }

  return (
    <StatusLabelRoot
      ownerState={ownerState}
      {...other}
    >
      {children}
    </StatusLabelRoot>
  )
}

export const RecentTasks = (props) => (
  <Card {...props}>
    <CardHeader title="Recent Tasks"/>
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Project
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Priority
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Assignee
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Reporter
              </TableCell>
              <TableCell sortDirection="desc" sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active
                  direction="desc"
                >
                  Last Updated At
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks.map(task => (
              <TableRow
                hover
                key={task.id}
              >
                <TableCell>
                  {props.projects[task.projectId]}
                </TableCell>
                <TableCell>
                  {task.title}
                </TableCell>
                <TableCell>
                  {capitalizeStr(task.type)}
                </TableCell>
                <TableCell>
                  {capitalizeStr(task.priority)}
                </TableCell>
                <TableCell>
                  {task.assigneeId}
                </TableCell>
                <TableCell>
                  {task.reporterId}
                </TableCell>
                <TableCell>
                  {formatDateTime(task.lastUpdatedAt)}
                </TableCell>
                <TableCell>
                  <StatusLabel
                    color={statusColorDict[task.status]}
                  >
                    {task.status}
                  </StatusLabel>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2,
      }}
    />
  </Card>
)
