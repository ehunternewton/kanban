import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// import { useFetch } from '../hooks/useFetch';
import KanbanColumn from './KanbanColumn';

function KanbanBoard() {
  const url = 'http://localhost:3000/tasks/'
  // const { error, isPending, data } = useFetch(url)
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [tasks, setTasks] = useState(null)
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()
        
        setIsPending(false)
        setData(data)
        setTasks(data)
        setRefetch(false)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }
    fetchData()
  }, [refetch])

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.status === result.source.status) {
      return;
    }

    // const quotes = reorder(
    //   state.quotes,
    //   result.source.index,
    //   result.destination.index
    // );

    // setTasks({ quotes });
  }
  
  return (
    <>
        {error && {error}}
        {isPending && <p>loading...</p>}
        
        <Container className='vh-100 d-flex flex-column'>
            <Row>
                <h1 className='my-4 text-center'>Kanban</h1>
            </Row>
            <Row className='h-100 mb-4'>
              
            {data && 
              <>
                <DragDropContext onDragEnd={onDragEnd}>
                  {/* <Droppable droppableId="ToDo"> */}
                    <KanbanColumn columnStatus='ToDo' setRefetch={setRefetch} tasks={tasks} setTasks={setTasks}/>
                  {/* </Droppable> */}
                  {/* <Droppable droppableId="In Progress"> */}
                    <KanbanColumn columnStatus='In Progress' setRefetch={setRefetch} tasks={tasks} setTasks={setTasks}/>
                  {/* </Droppable> */}
                  {/* <Droppable droppableId="Completed"> */}
                    <KanbanColumn columnStatus='Completed' setRefetch={setRefetch} tasks={tasks} setTasks={setTasks}/>
                  {/* </Droppable> */}
                </DragDropContext>
              </>
            }
            </Row>
        </Container>
    </>
  )
}

export default KanbanBoard