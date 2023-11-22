'use strict';

import React, { useState, useEffect } from 'react';
import { Button, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ItemCard from './ItemCard';
import { showModal, hideModal, fetchData } from '../store/item';
import FormModal from './FormModal';
import './Lost.css'; 

const ITEMS_PER_PAGE = 2;

function Found() {
  const stateShowModal = useSelector((state) => state.item.showModal);
  const itemsState = useSelector((state) => state.item.items);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleShowModal = () => {
    dispatch(showModal());
  };

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const foundItems = itemsState.filter((item) => item.type === 'found');

  const totalPages = Math.ceil(foundItems.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = foundItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {currentItems.map((item, index) => (
        <ItemCard
          key={index}
          id={item._id}
          type={item.type}
          itemName={item.itemName}
          image={item.image}
          location={item.location}
          description={item.description}
          notes={item.notes}
        />
      ))}

      <Button onClick={handleShowModal}>+ Found Item</Button>
      <div className='pagination-container'>
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <FormModal
        formType={'Found'}
        showModal={stateShowModal}
        handleCloseModal={handleHideModal}
      />
    </>
  );
}

export default Found;
