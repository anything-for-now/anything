'use strict';

import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, fileChange, formInputChange, addItem } from '../store/item';
import MapModal from './MapModal';
import './FormModal.css';

function FormModal({ formType }) {
  const showModal = useSelector((state) => state.item.showModal);
  const formData = useSelector((state) => state.item.formData);
  const itemsState = useSelector((state) => state.item.items);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    dispatch(fileChange(e.target.files[0]));
  };

  const handleFormInputChange = (e, field) => {
    const value = e.target.value;
    dispatch(formInputChange({ field, value }));
  };

  const handleSaveChanges = () => {
    const itemType = formType.toLowerCase();
    dispatch(formInputChange({ field: 'type', value: itemType }));
    dispatch(addItem());
    dispatch(hideModal());
    console.log("HERE ARE ADD ITEM SAVE", formType)

    const formFieldsToReset = ['itemName', 'location', 'description'];

    // Loop through the form fields and dispatch actions to reset them
    formFieldsToReset.forEach((field) => {
      dispatch(formInputChange({ field, value: '' }));
    });
  };

  const handleAddLocation = (address) => {
    dispatch(formInputChange({ field: 'location', value: address }));
  }

  return (
    <>
      <Modal show={showModal} onHide={() => dispatch(hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{formType} Item Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='// Wallet'
              value={formData.itemName}
              onChange={(e) => handleFormInputChange(e, 'itemName')}
            />
          </Form.Group>
          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='file' onChange={handleFileChange} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Location</Form.Label>
            <div className='d-flex'>
              <Form.Control
                type='text'
                value={formData.location}
                placeholder='123 Street, Seattle, WA 98101'
                onChange={(e) => handleFormInputChange(e, 'location')}
                className="me-2" 
              />
              <Button variant='secondary'  className='d-flex  flex-row' onClick={handleShow}>
                Open Map
              </Button>
            </div>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Provide a detailed description of the item...'
              value={formData.description}
              onChange={(e) => handleFormInputChange(e, 'description')}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => dispatch(hideModal())}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <MapModal show={show} handleClose={handleClose} handleAddLocation={handleAddLocation} itemType={formType.toLowerCase()}  />
    </>
  );
}

export default FormModal;
