'use strict';

import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideModal,
  fileChange,
  formInputChange,
  saveFormData,
} from '../store/item';

function FormModal({ formType }) {
  const showModal = useSelector((state) => state.item.showModal);
  const formData = useSelector((state) => state.item.formData);
  const itemsState = useSelector((state) => state.item.items);
  const dispatch = useDispatch();

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
    dispatch(saveFormData());
    dispatch(hideModal());
  };

  return (
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
  );
}

export default FormModal;
