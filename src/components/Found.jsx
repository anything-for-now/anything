import React, { useState } from 'react';
import { Button, Modal, Form, Badge } from 'react-bootstrap';

function Found() {
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // The backend responds with the public URL of the uploaded image
      const data = await response.json();
      console.log('File uploaded successfully, public URL:', data.imageUrl);
      handleCloseModal(); 
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <>
      <Button onClick={handleShowModal}>+ Found Item</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Found Item Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Item Name</Form.Label>
            <Form.Control type='text' placeholder='// Wallet' />
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
              Add keywords or tags related to the found item.
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
        onClick={handleSaveChanges} 
      >
        Save Changes
      </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Found;
