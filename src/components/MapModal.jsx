import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Map from './Map';

function MapModal({ show, handleClose }) {
  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Choose a location</Modal.Title>
      </Modal.Header>
      <Map />
    </Modal>
  );
}

export default MapModal