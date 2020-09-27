import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

interface ModalProps {
  title: string;
  text: string;
  show: boolean;
  handleClose: () => void;
}

const ModalPatient: React.FC<ModalProps> = ({ title, text, show, handleClose }: ModalProps) => {
  return (
    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>{text}</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalPatient;
