import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ModalProps {
  title: string;
  text: string;
  modalShow: boolean;
  handleClose: () => void;
  action: () => void;
}

const ModalPatient: React.FC<ModalProps> = ({ title, text, modalShow, handleClose, action }: ModalProps) => {
  return (
    <Modal show={modalShow} onHide={() => handleClose()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => action()}>
          Sim
        </Button>
        <Button variant="danger" onClick={() => handleClose()}>
          Não
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPatient;
