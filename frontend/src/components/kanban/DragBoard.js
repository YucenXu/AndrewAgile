import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { capitalizeStr } from '../../utils/formats'
import axios from "axios";


// https://codesandbox.io/s/-w5szl?file=/src/index.js:4024-4038

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "#e0e0e0" : "#f2f4f4",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#eeeeee" : "#e0e0e0",
  padding: grid,
  overflow: 'auto'
});

export default function DragBoard(props) {
  const [allStatus, setAllStatus] = useState(['backlog', 'todo', 'inprogress', 'done']);
  const [state, setState] = useState([]);

  const getItems = (allTasks) => {
    const state = []
    allStatus.map(status => {
      let tasks = []
      allTasks[status].map(task => {
        tasks.push(task)
      })
      state.push(tasks)
    })
    return state
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      // disable order change to avoid changing after auto refresh

      // const items = reorder(state[sInd], source.index, destination.index);
      // const newState = [...state];
      // newState[sInd] = items;
      // setState(newState);
    } else {
      // Todo
      // move task position in frontend
      // using task hook to move is slow, looking for improvements
      const result = move(state[sInd], state[dInd], source, destination);
      console.log(state)
      console.log(sInd)
      console.log(dInd)
      console.log(state[sInd])
      console.log(source)
      console.log(destination)
      console.log(result)
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      setState(newState);

      // update task status
      const taskId = state[sInd][source.index].id
      const payload = {}
      payload['status'] = allStatus[dInd]
      await axios.put('/api/task/' + taskId, payload).catch(err => {
        // Todo
      })
      props.setRefresh(props.refresh + 1)
    }
  }

  const handleClickTask = (taskId) => () => {
    props.setEditTaskOpen(true)
    props.setTaskId(taskId)
  }

  React.useEffect(() => {
    setState(getItems(props.allTasks))
    // console.log(state)
  }, [props.allTasks])

  return (
    <Grid container
      sx={{ my: '2vh', mx: 'auto', width: '80vw', height: '60vh', backgroundColor: "ffebee" }}
      style={{ alignItems: 'center' }}
    >
      {/* Status Title */}
      {allStatus.map(status => (
        <Grid container
          sx={{ my: '0vh', mx: 'auto', width: "19vw", height: "8vh", background: "#bdbdbd" }}
          direction="row"
          alignItems="center"
        >
          < Typography sx={{ mx: "1vw", my: 'auto', width: '22%', fontSize: 18, fontWeight: 700 }} color="#000000">
            {capitalizeStr(status)}
          </Typography>
        </Grid>
      ))}

      {/* Drag Area */}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Columns */}
        {state.map((tasks, ind) => (
          <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, snapshot) => (
              <Grid item
                sx={{ my: '0vh', mx: 'auto', width: "19vw", height: "52vh" }}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {/* Task Cards*/}
                {tasks.map((item, index) => (
                  <Draggable
                    key={item.id + ""}
                    draggableId={item.id + ""}
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
                          provided.draggableProps.style
                        )}
                        onClick={handleClickTask(item.id)}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around"
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
      </DragDropContext >
    </Grid >
  );
}
