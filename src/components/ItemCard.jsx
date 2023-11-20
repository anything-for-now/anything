import React from 'react';
import { Image, Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editItem, deleteItem, fetchData } from '../store/item';
import './ItemCard.css';

function ItemCard({ id, itemName, description, location, image }) {
  const dispatch = useDispatch();

  const handleEdit = async () => {
    // Pass the item's ID to the editItem function
    dispatch(editItem({ id, itemName, description, location, image }));
    // Fetch updated data after edit
    dispatch(fetchData());
  };

  const handleDelete = async () => {
    // Pass the item's ID to the deleteItem function
    await dispatch(deleteItem(id));
    // Fetch updated data after deletion
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
    </>
  );
}

export default ItemCard;
