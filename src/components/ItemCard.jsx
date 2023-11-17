import React from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function ItemCard() {
  return (
    <>
      <Container className='item-card-component'>
        <Image src='https://placehold.co/300x200' />
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href='#'>Card Link</Card.Link>
            <Card.Link href='#'>Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ItemCard;
