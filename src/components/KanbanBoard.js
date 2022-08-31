import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useFetch } from '../hooks/useFetch';
import KanbanColumn from './KanbanColumn';

function KanbanBoard() {
  const url = 'http://localhost:3000/tasks/'
  const { error, isPending, data } = useFetch(url)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    if (data) setTasks(data)
  }, [data])
  return (
    <>
        {error && {error}}
        {isPending && <p>loading...</p>}
        {data && 
        <Container className='vh-100 d-flex flex-column'>
            <Row>
                <h1 className='my-4 text-center'>Kanban</h1>
            </Row>
            <Row className='h-100 mb-4'>
                <KanbanColumn columnStatus='ToDo' tasks={tasks}/>
                <KanbanColumn columnStatus='In Progress' tasks={tasks}/>
                <KanbanColumn columnStatus='Completed' tasks={tasks}/>
            </Row>
        </Container>}
    </>
  )
}

export default KanbanBoard