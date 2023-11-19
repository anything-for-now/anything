'use strict';

import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ItemCard from './ItemCard';
import { showModal, hideModal } from '../store/lost-item';
import FormModal from './FormModal';

function Lost() {
  const stateShowModal = useSelector((state) => state.lostItem.showModal);
  const lostItemsState = useSelector((state) => state.lostItem.lostItems);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModal());
  };

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  return (
    <>
      {lostItemsState.map((item, index) => (
        <ItemCard
          key={index}
          itemName={item.itemName}
          image={item.image}
          location={item.location}
          description={item.description}
        />
      ))}
      <Button onClick={handleShowModal}>+ Lost Item</Button>

      <FormModal
        formName={'Lost'}
        showModal={stateShowModal}
        handleCloseModal={handleHideModal}
      />
    </>
  );
}

export default Lost;