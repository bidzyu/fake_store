import ModalWindow from '../modal/ModalWindow';

const DeleteSelected = (props) => {
  return (
    <>
      {props.visible ? <ModalWindow allSelected={props.allSelected} /> : null}
    </>
  );
};

export default DeleteSelected;
