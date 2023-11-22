import React, { useState } from 'react';
import { Image, Container, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteItem, fetchData } from '../store/item';
import EditFormModal from './EditFormModal';
import './ItemCard.css';

function ItemCard({ id, type, itemName, description, location, image }) {
  const item = {
    id,
    type,
    itemName,
    description,
    location,
    image,
  };
  const [show, setShow] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  return (
    <>
      <Container id='item-card-container'>
        <Image id='item-card-image' src={image} />
        <div className='item-card-body'>
          <div className='item-card-description'>
            <h2>{itemName}</h2>
            <p>{location}</p>
            <p>{description}</p>

          </div>
          <div>
            <h3>Possible Match Found -- needs work</h3>
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
      <Modal show={showDeleteConfirm} onHide={handleDeleteConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {itemName}?</Modal.Body>
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
