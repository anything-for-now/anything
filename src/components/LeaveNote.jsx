import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { hideModal, addNote } from '../store/item';

function LeaveNoteModal({ itemId }) {
  const [noteText, setNoteText] = useState('');
  const dispatch = useDispatch();

  const handleSaveNote = () => {
    dispatch(addNote({ itemId, user: 'current_user', text: noteText }));
    setNoteText('');
    dispatch(hideModal());
  };

  return (
    <Modal show onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId='noteText'>
          <Form.Label>Note:</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Enter your note here...'
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(hideModal())}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSaveNote}>
          Submit Note
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LeaveNoteModal;
