import React, { useState } from 'react';
import { Image, Container, Button, Modal, Accordion, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteItem, fetchData } from '../store/item';
import EditFormModal from './EditFormModal';
import './ItemCard.css';

function ItemCard({ id, type, itemName, description, location, image, notes }) {
  const item = {
    id,
    type,
    itemName,
    description,
    location,
    image,
    notes,
  };
  const [show, setShow] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteText, setNoteText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteConfirmClose = () => setShowDeleteConfirm(false);
  const handleDeleteConfirmShow = () => setShowDeleteConfirm(true);

  const dispatch = useDispatch();

  const handleEdit = () => {
    // Pass the item data to the EditFormModal
    handleShow();
  };

  const handleDelete = () => {
    // Show confirmation modal instead of directly deleting
    handleDeleteConfirmShow();
  };

  const confirmDelete = async () => {
    await dispatch(deleteItem(id));
    dispatch(fetchData());
    handleDeleteConfirmClose();
  };

  const handleAddNote = () => {
    dispatch(addNote({ itemId: id, noteText, user: 'current_user' }));
    setNoteText('');
  };

  return (
    <>
      <Container id='item-card-container'>
        <Image id='item-card-image' src={image} />
        <div className='item-card-body'>
          <div className='item-card-description'>

            <h2>{itemName}</h2>
            <p className="location">{location}</p>
            <p className="description">{description}</p>

            {/* Display notes */}
            <ul>
              {notes ? notes.map((note, index) => (
                <li key={index}>{note.text}</li>
              )) : null}
            </ul>

            {/* Add a note */}
            <div>
              <input
                type='text'
                placeholder='Add a note...'
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button onClick={handleAddNote}>Add Note</button>
            </div>
          </div>
        </div>
        <div className='buttons'>
          <Button className='item-buttons' variant='outline-secondary' onClick={handleEdit}>
            EDIT
          </Button>
          <Button
            className='item-buttons'
            variant='outline-danger'
            onClick={handleDelete}
          >
            DELETE
          </Button>
        </div>
      </Container>
      <EditFormModal
        formType={'Edit'}
        show={show}
        handleClose={handleClose}
        item={item}
      />
      <Modal show={showDeleteConfirm} onHide={handleDeleteConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title className='you-sure-modal'>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className='you-sure-modal'>Are you sure you want to delete {itemName}?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDeleteConfirmClose}>
            No
          </Button>
          <Button variant='danger' onClick={confirmDelete}> 
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItemCard;
