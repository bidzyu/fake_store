import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import checkAndSetScroll from '../../assets/checkAndSetScroll';
import {
  clearCart,
  deleteProductsFromCart,
} from '../../redux/reducers/cartSlice';

const ModalWindow = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedList = useSelector((state) => state.selectedList);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAndSetScroll();

    return () => checkAndSetScroll();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const clickHandler = (e) => {
    const shouldCloseModal = e.target.dataset.closeModal;

    if (!shouldCloseModal) return;

    closeModal();
  };

  const deleteBtnHandler = () => {
    closeModal();
    showScroll();
    if (props.allSelected) {
      dispatch(clearCart());
    } else {
      const idsList = Object.entries(selectedList)
        .filter((item) => item[1])
        .map((item) => item[0]);

      dispatch(deleteProductsFromCart(idsList));
    }
  };

  const content = (
    <div className="modal-window" data-close-modal onClick={clickHandler}>
      <div className="modal-content">
        <h2 className="modal-content__title">Delete products</h2>
        <p>
          Are you sure you want to delete the selected products? It will be
          impossible to cancel this action.
        </p>
        <button onClick={deleteBtnHandler}>Delete</button>
        <button className="modal-content__cancel">
          <img
            data-close-modal
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjpjdXJyZW50Q29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImgtZnVsbCB3LWZ1bGwiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiByeD0iMzAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIxMDAlIiBwYWludC1vcmRlcj0ic3Ryb2tlIj48L3JlY3Q+PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSJjdXJyZW50Q29sb3IiIHg9IjEyOCIgeT0iMTI4IiByb2xlPSJpbWciIHN0eWxlPSJkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBmaWxsPSIjMkIzQjQ3IiBkPSJtMzI1LjI5NyAyNTZsMTM0LjE0OC0xMzQuMTQ4YzE5LjEzNi0xOS4xMzYgMTkuMTM2LTUwLjE2MSAwLTY5LjI5N2MtMTkuMTM3LTE5LjEzNi01MC4xNi0xOS4xMzYtNjkuMjk3IDBMMjU2IDE4Ni43MDNMMTIxLjg1MiA1Mi41NTVjLTE5LjEzNi0xOS4xMzYtNTAuMTYxLTE5LjEzNi02OS4yOTcgMHMtMTkuMTM2IDUwLjE2MSAwIDY5LjI5N0wxODYuNzAzIDI1Nkw1Mi41NTUgMzkwLjE0OGMtMTkuMTM2IDE5LjEzNi0xOS4xMzYgNTAuMTYxIDAgNjkuMjk3YzkuNTY4IDkuNTY3IDIyLjEwOCAxNC4zNTIgMzQuNjQ4IDE0LjM1MnMyNS4wODEtNC43ODQgMzQuNjQ4LTE0LjM1MkwyNTYgMzI1LjI5N2wxMzQuMTQ4IDEzNC4xNDhjOS41NjggOS41NjcgMjIuMTA4IDE0LjM1MiAzNC42NDggMTQuMzUyczI1LjA4LTQuNzg0IDM0LjY0OC0xNC4zNTJjMTkuMTM2LTE5LjEzNiAxOS4xMzYtNTAuMTYxIDAtNjkuMjk3TDMyNS4yOTcgMjU2eiI+PC9wYXRoPjwvZz48L3N2Zz48L3N2Zz4="
            alt=""
          />
        </button>
      </div>
    </div>
  );

  const hideScroll = () => {
    document.body.classList.add('modal');
  };

  const showScroll = () => {
    document.body.classList.remove('modal');
  };

  if (modalIsOpen) {
    hideScroll();
  } else {
    showScroll();
  }

  return (
    <>
      <button className="delete-selected" onClick={openModal}>
        Delete selected
      </button>
      {modalIsOpen ? content : null}
    </>
  );
};

export default ModalWindow;
