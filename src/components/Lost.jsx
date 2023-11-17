import React, { useState } from 'react';
import { Button, Modal, Form, Badge } from 'react-bootstrap';

function Lost() {
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Clear tag input when closing the modal
    setTagInput('');
  };

  const handleAddTag = () => {
    // Avoid adding empty tags
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <>
      <Button onClick={handleShowModal}>+ Lost Item</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Lost Item Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Item Name</Form.Label>
            <Form.Control type='text' placeholder='// Wallet' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Location</Form.Label>
            <Form.Control type='text' placeholder='// 123 Street, Seattle, WA 98101' />
          </Form.Group>
          <Form.Group controlId='tags'>
            <Form.Label>Tags/Keywords</Form.Label>
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
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          {/* Add your form submission logic here */}
          <Button
            variant='primary'
            // onClick={() => {
            //   /* Add your form submission logic here */
            // }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Lost;
