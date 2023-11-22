import React, { useState } from 'react';
import { Image, Container, Button } from 'react-bootstrap';
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleEdit = () => {
    // Pass the item data to the EditFormModal
    handleShow();
  };

  const handleDelete = async () => {
    await dispatch(deleteItem(id));
    dispatch(fetchData());
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
    </>
  );
}

export default ItemCard;
