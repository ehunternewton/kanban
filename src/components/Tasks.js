import React from 'react'

import Card from 'react-bootstrap/Card';
import { CloseButton } from 'react-bootstrap';

// import { useFetch } from '../hooks/useFetch';

function Tasks(props) {
  const url = 'http://localhost:3000/tasks'
//   const { postData } = useFetch(url, 'DELETE')
  const deleteTask = async (id) => {
    const deleteUrl = url + '/' + id
    await fetch(deleteUrl, { method: 'DELETE' });
    props.setRefetch(true)
  }
  
  return (
    <>
        {props.tasks.filter(task => task.status === props.columnStatus).map((task) => {
            return (
                <Card key={task.id} className='mb-1'>
                    <Card.Body>
                        <CloseButton style={{ marginLeft: 'auto' }} onClick={() => deleteTask(task.id)}></CloseButton>
                        {task.description}
                    </Card.Body>
                </Card>
            )
        })}
    </>
  )
}

export default Tasks 