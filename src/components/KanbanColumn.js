import React from 'react'

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Tasks from './Tasks'
import AddTask from './AddTask';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
                {/* <Droppable droppableId={props.columnStatus}></Droppable> */}
                <Tasks setRefetch={props.setRefetch} columnStatus={props.columnStatus} tasks={props.tasks}/>
                <AddTask setRefetch={props.setRefetch} taskStatus={props.columnStatus} setTasks={props.setTasks}/>
              </Card.Body>
            </Card>
          </Col>
    </>
  )
}

export default KanbanColumn