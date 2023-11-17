import React from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import './ItemCard.css';

function ItemCard() {
  return (
    <>
      <Container id='item-card-container'>
        <Image id='item-card-image' src='https://placehold.co/300x200' />
        <div className='item-card-description'>
          <h2>Item Name: Wallet</h2>
          <p>Location: 123 Street, Seattle WA 98101</p>
          <p>Keywords: black leather credit card cash license</p>
        </div>
      </Container>
    </>
  );
}

export default ItemCard;
