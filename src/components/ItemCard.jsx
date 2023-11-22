
import React, { useState, useEffect } from 'react';
import { Image, Container, Button, Modal, Dropdown, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, fetchData, showModal, hideModal, addNote} from '../store/item';

import EditFormModal from './EditFormModal';
import './ItemCard.css';
import FormModal from './FormModal';

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
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteConfirmClose = () => setShowDeleteConfirm(false);
  const handleDeleteConfirmShow = () => setShowDeleteConfirm(true);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

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
    dispatch(addNote({ itemId: id, user: userEmail, text: noteText }));
    setNoteText('');
    setShowNoteModal(false);
  };

  const stateShowModal = useSelector((state) => state.item.showModal);
  const itemsState = useSelector((state) => state.item.items);
  const userState = useSelector((state) => state.user);
  const [forceUpdate, setForceUpdate] = useState(false);

  const userEmail = userState.user.email;

  useEffect(() => {
    console.log('HERES THE ITEMS STATE:', itemsState);
    setForceUpdate((prev) => !prev);
  }, [itemsState]);

  useEffect(() => {
    dispatch(fetchData());
    
  }, [dispatch]);

  const handleShowModal = () => {
    dispatch(showModal());
  };

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const handleShowNoteModal = () => {
    dispatch(showModal({ type: 'note', itemId: id }));
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
          <Button onClick={() => setShowNoteModal(true)}>Add Notes</Button>
          </div>
        </div>
        <div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Alerts
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {notes && notes.length > 0 ? (
                  notes.map((note, index) => (
                    <Dropdown.Item key={index}>
                      <strong>User: </strong>{note.user}<br />
                      <strong>Text: </strong>{note.text}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>
                    <textarea placeholder="No notes available :C"></textarea>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
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
        </div>
      </Container>
      <EditFormModal
        formType={'Edit'}
        show={show}
        handleClose={handleClose}
        item={item}
      />
      <FormModal
        formType={'Lost'}
        showModal={stateShowModal}
        handleCloseModal={handleHideModal}
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

      <Modal show={showNoteModal} onHide={() => setShowNoteModal(false)}>
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
          <Button variant='secondary' onClick={() => setShowNoteModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleAddNote}>
            Submit Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItemCard;
