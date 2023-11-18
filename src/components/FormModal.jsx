'use strict';

import React from 'react';
import { Modal, Form, Badge, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideModal,
  addTag,
  removeTag,
  fileChange,
  formInputChange,
} from '../store/lost-item';

function FormModal() {
  const showModal = useSelector((state) => state.lostItem.showModal);
  const tags = useSelector((state) => state.lostItem.tags);
  const tagInput = useSelector((state) => state.lostItem.tagInput);
  const formData = useSelector((state) => state.lostItem.formData);

  const dispatch = useDispatch();

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      dispatch(addTag(tagInput.trim()));
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    dispatch(removeTag(index));
  };

  const handleFileChange = (e) => {
    dispatch(fileChange(e.target.files[0]));
  };

  const handleFormInputChange = (e, field) => {
    dispatch(formInputChange(field, e.target.value));
  };

  return (
    <Modal show={showModal} onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Lost Item Form</Modal.Title>
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
            placeholder='// 123 Street, Seattle, WA 98101'
          />
        </Form.Group>
        <Form.Group controlId='tags'>
          <Form.Label>Keywords</Form.Label>
          <div>
            {tags.map((tag, index) => (
              <Badge key={index} className='mr-2' variant='primary'>
                {tag}
                <Button
                  variant='secondary'
                  size='sm'
                  className='ml-2'
                  onClick={() => handleRemoveTag(index)}
                >
                  X
                </Button>
              </Badge>
            ))}
          </div>
          <Form.Control
            type='text'
            placeholder='// black leather credit card cash license'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <Form.Text className='text-muted'>
            Add keywords or tags related to the lost item.
          </Form.Text>
          <Button variant='primary' onClick={handleAddTag}>
            Add Tag
          </Button>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(hideModal())}>
          Close
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            // Dispatch an action to handle the form submission logic using formData
            console.log('Form Data:', formData);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;