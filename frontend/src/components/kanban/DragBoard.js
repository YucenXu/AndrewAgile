import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { capitalizeStr } from '../../utils/formats'
import axios from 'axios'

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 8 * 2,
  margin: `0 0 ${8}px 0`,

  // change background colour if dragging
  background: isDragging ? '#e3f2fd' : '#f2f4f4',

  // styles we need to apply on draggable
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#b1bfca' : '#e0e0e0',
  padding: 8,
  overflow: 'auto',
})

// Ref: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/about/examples.md
export default function DragBoard(props) {
  const [startInd, setStartInd] = useState(-1)

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)
    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone
    return result
  }

  // disable drag reorder within the same list
  const onDragStart = (start) => {
    const { source } = start
    const sInd = +source.droppableId
    setStartInd(sInd)
  }

  const onDragEnd = async (result) => {
    const { source, destination } = result
    if (!destination) {
      return
    }

    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    if (sInd !== dInd) {
      // preserve the original taskId
      const taskId = props.allTasks[sInd][source.index].id

      const result = move(props.allTasks[sInd], props.allTasks[dInd], source, destination)
      const newAllTasks = [...props.allTasks]
      newAllTasks[sInd] = result[sInd]
      newAllTasks[dInd] = result[dInd]

      // update kanban allTasks state
      props.setAllTasks(Object.assign({},
        ...props.statusList.map((status, idx) => ({ [status]: newAllTasks[idx] })),
      ))

      // update task status in backend
      const payload = { status: props.statusList[dInd] }
      await axios.put('/api/task/' + taskId, payload).catch(console.error)
      props.setRefresh(props.refresh + 1)
    }
  }

  const handleClickTask = (taskId) => {
    props.setEditTaskOpen(true)
    props.setTaskId(taskId)
  }

  return (
    <Grid container
      sx={{ my: '2vh', mx: 'auto', width: '100%', height: '60vh', backgroundColor: '#' }}
      style={{ alignItems: 'center' }}
    >
      {/* Status Title */}
      {props.statusList.map(status => (
        <Grid
          container
          key={status}
          sx={{ my: '0vh', mx: 'auto', width: '24%', height: '8vh', background: '#bdbdbd' }}
          direction="row"
          alignItems="center"
        >
          <Typography sx={{ mx: '1vw', my: 'auto', width: '22%', fontSize: 18, fontWeight: 700 }} color="#000000">
            {capitalizeStr(status)}
          </Typography>
        </Grid>
      ))}

      {/* Drag Area */}
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {/* Columns */}
        {props.allTasks.map((tasks, ind) => (
          <Droppable key={ind} droppableId={`${ind}`} isDropDisabled={ind === startInd}>
            {(provided, snapshot) => (
              <Grid item
                sx={{ my: '0vh', mx: 'auto', width: '24%', height: '52vh' }}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {/* Task Cards*/}
                {tasks.map((item, index) => (
                  <Draggable
                    key={item.id.toString()}
                    draggableId={item.id.toString()}
                    index={index}
                    isDragDisabled={props.disableEdit}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                        onClick={() => handleClickTask(item.id)}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                          }}
                        >
                          {item.title}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        ))
        }
      </DragDropContext>
    </Grid>
  )
}
