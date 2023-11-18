'use strict';

import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ItemCard from './ItemCard';
import {
  showModal as showLostItemModal,
  hideModal as hideLostItemModal,
} from '../store/lost-item';
import FormModal from './FormModal';

function Lost() {
  const showModal = useSelector((state) => state.lostItem.showModal);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showLostItemModal());
  };

  const handleHideModal = () => {
    dispatch(hideLostItemModal());
  };

  return (
    <>
      <ItemCard />
      <Button onClick={handleShowModal}>+ Lost Item</Button>

      <FormModal showModal={showModal} handleCloseModal={handleCloseModal} />
    </>
  );
}

export default Lost;
