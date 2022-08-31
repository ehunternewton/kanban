import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useFetch } from '../hooks/useFetch';

function AddTask(props) {
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState('');

  const { postData } = useFetch('http://localhost:3000/tasks', 'POST')
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({ status: props.taskStatus, description: newTask })
    console.log(newTask)
    handleClose()
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        onChange={(e) => setNewTask(e.target.value)}
                        value={newTask}
                        required
                    />
                </Form.Group>
                <Button variant='primary' onClick={handleSubmit}>Add Task</Button>
            </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Add Task
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default AddTask