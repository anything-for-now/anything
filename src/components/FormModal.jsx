'use strict';

import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, fileChange, formInputChange, saveFormData } from '../store/lost-item';

function FormModal({ formName }) {
  const showModal = useSelector((state) => state.lostItem.showModal);
  const formData = useSelector((state) => state.lostItem.formData);
  const lostItemsState = useSelector((state) => state.lostItem.lostItems);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    dispatch(fileChange(e.target.files[0]));
  };

  const handleFormInputChange = (e, field) => {
    const value = e.target.value;
    dispatch(formInputChange({ field, value }));
  };

  const handleSaveChanges = () => {
    dispatch(saveFormData()); // Dispatch the new action to save formData to lostItem
    
    dispatch(hideModal()); // Optionally, hide the modal after saving
  };

  console.log('HERES THE NEW LOST ITEM STATE ', lostItemsState);

  return (
    <Modal show={showModal} onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{formName} Item Form</Modal.Title>
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
          <Form.Control
            type='text'
            value={formData.location}
            placeholder='// 123 Street, Seattle, WA 98101'
            onChange={(e) => handleFormInputChange(e, 'location')}
          />
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Provide a detailed description of the lost item...'
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
  );
}

export default FormModal;
