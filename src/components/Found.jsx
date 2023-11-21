'use strict';

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ItemCard from './ItemCard';
import { showModal, hideModal, fetchData } from '../store/item';
import FormModal from './FormModal';

function Found() {
  const stateShowModal = useSelector((state) => state.item.showModal);
  const itemsState = useSelector((state) => state.item.items);
  const dispatch = useDispatch();
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    console.log('HERES THE ITEMS STATE:', itemsState);
    setForceUpdate((prev) => !prev);
  }, [itemsState]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleShowModal = () => {
    dispatch(showModal());
  };

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  return (
    <>
      {itemsState
        ? itemsState
            .filter((item) => item.type === 'found')
            .map((item, index) => (
              <ItemCard
                key={index}
                id={item._id}
                type={item.type}
                itemName={item.itemName}
                image={item.image}
                location={item.location}
                description={item.description}
              />
            ))
        : null}
      <Button onClick={handleShowModal}>+ Found Item</Button>

      <FormModal
        formType={'Found'}
        showModal={stateShowModal}
        handleCloseModal={handleHideModal}
      />
    </>
  );
}

export default Found;
