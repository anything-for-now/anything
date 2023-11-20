'use strict';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideModal,
  fileChange,
  formInputChange,
  editItem,
} from '../store/item';
import MapModal from './MapModal';
import './FormModal.css';

function EditFormModal({ formType, show, handleClose, item }) {
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    location: '',
    image: '',
  });

  const [mapShow, setMapShow] = useState(false);

  const handleMapClose = () => setMapShow(false);
  const handleMapShow = () => setMapShow(true);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.item.formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveChanges = () => {
    const updatedItem = {
      itemName: formData.itemName,
      image: formData.image,
      location: formData.location,
      description: formData.description,
    };
    dispatch(editItem(updatedItem));
    dispatch(hideModal());
  };

  const handleAddLocation = (address) => {
    dispatch(formInputChange({ field: 'location', value: address }));
  };

  useEffect(() => {
    if (item) {
      setFormValues({
        itemName: item.itemName || '',
        description: item.description || '',
        location: item.location || '',
        image: item.image || '',
      });
    }
  }, [item]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formType} Item Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='// Wallet'
              name='itemName'
              value={formValues.itemName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='file' onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Location</Form.Label>
            <div className='location-container'>
              <Form.Control
                type='text'
                name='location'
                value={formValues.location}
                onChange={handleInputChange}
              />
              <Button variant='secondary' onClick={handleMapShow}>
                Choose on Map
              </Button>
            </div>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name='description'
              value={formValues.description}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <MapModal
        show={mapShow}
        handleClose={handleMapClose}
        handleAddLocation={handleAddLocation}
      />
    </>
  );
}

export default EditFormModal;
