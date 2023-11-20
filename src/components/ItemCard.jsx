import React from 'react';
import { Image, Container, Button } from 'react-bootstrap';
import './ItemCard.css';

function ItemCard({ itemName, description, location, image }) {
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
          <Button className='item-buttons' variant='info'>
            EDIT
          </Button>
          <Button className='item-buttons' variant='danger'>
            DELETE
          </Button>
        </div>
      </Container>
    </>
  );
}

export default ItemCard;
