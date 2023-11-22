import React, { useState } from 'react';
import { Image, Container, Button } from 'react-bootstrap';
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
  const [noteText, setNoteText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleEdit = () => {
    // Pass the item data to the EditFormModal
    handleShow();
  };

  const handleDelete = async () => {
    await dispatch(deleteItem(id));
    dispatch(fetchData());
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
            <p>{location}</p>
            <p>{description}</p>
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
          <Button className='item-buttons' variant='info' onClick={handleEdit}>
            EDIT
          </Button>
          <Button
            className='item-buttons'
            variant='danger'
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
    </>
  );
}

export default ItemCard;
