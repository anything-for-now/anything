'use strict';

import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ItemCard from './ItemCard';
import { showModal, hideModal } from '../store/lost-item';
import FormModal from './FormModal';

function Lost() {
  const stateShowModal = useSelector((state) => state.lostItem.showModal);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModal());
  };

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  return (
    <>
      <ItemCard />
      <Button onClick={handleShowModal}>+ Lost Item</Button>

      <FormModal showModal={stateShowModal} handleCloseModal={handleHideModal} />
    </>
  );
}

export default Lost;