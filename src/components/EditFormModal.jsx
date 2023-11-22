'use strict';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, fileChange, formInputChange, editItem, uploadFile } from '../store/item';
import MapModal from './MapModal';
import './FormModal.css';

function EditFormModal({ formType, show, handleClose, item }) {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    id: item.id || '',
    type: item.type || '',
    itemName: item.itemName || '',
    image: item.image || '',
    location: item.location || '',
    description: item.description || '',
  });
  const [mapShow, setMapShow] = useState(false);

  useEffect(() => {
    setFormValues({
      id: item.id || '',
      type: item.type || '',
      itemName: item.itemName || '',
      image: item.image || '',
      location: item.location || '',
      description: item.description || '',
    });
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadedImage = await dispatch(uploadFile(file)).unwrap();
      setFormValues({ ...formValues, image: uploadedImage });
    }
  };

  const handleMapShow = () => {
    setMapShow(true);
  };

  const handleSaveChanges = () => {
    // Dispatch action to save changes to Redux state
    dispatch(editItem(formValues));
    handleClose();
  };

  const handleAddLocation = (selectedLocation) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      location: selectedLocation,
    }));
  };

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
            <Form.Control type='file' onChange={handleFileChange} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Location</Form.Label>
            <div className='d-flex'>
              <Form.Control
                type='text'
                name='location'
                value={formValues.location}
                onChange={handleInputChange}
                className="me-2"
              />
              <Button variant='secondary' onClick={handleMapShow}>
                Open Map
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
        handleClose={() => {
          // Dispatch action to update Redux state only if location changed
          if (formValues.location !== item.location) {
            dispatch(
              formInputChange({ field: 'location', value: formValues.location })
            );
          }
          setMapShow(false);
        }}
        handleAddLocation={handleAddLocation}
        itemType={item.type}
      />
    </>
  );
}

export default EditFormModal;
