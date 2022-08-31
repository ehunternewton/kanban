import React from 'react'

import Card from 'react-bootstrap/Card';

function Tasks(props) {
  
  return (
    <>
        {props.tasks.filter(task => task.status === props.columnStatus).map((task) => {
            return (
                <Card key={task.id} className='mb-1'>
                    <Card.Body>
                        {task.description}
                    </Card.Body>
                </Card>
            )
        })}
    </>
  )
}

export default Tasks 