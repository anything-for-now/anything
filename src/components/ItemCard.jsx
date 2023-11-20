import React from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
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
      </Container>
    </>
  );
}

export default ItemCard;
