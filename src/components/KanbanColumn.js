import React from 'react'

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Tasks from './Tasks'
import AddTask from './AddTask';

function KanbanColumn(props) {
  return (
    <>
        <Col>
            <Card style={{height: '100%'}}>
              <Card.Header as="h2">
                {props.columnStatus}
              </Card.Header>
              <Card.Body className='d-flex flex-column'>
                {/* Todo Tasks Here */}
                <Tasks columnStatus={props.columnStatus} tasks={props.tasks}/>
                <AddTask taskStatus={props.columnStatus} />
              </Card.Body>
            </Card>
          </Col>
    </>
  )
}

export default KanbanColumn