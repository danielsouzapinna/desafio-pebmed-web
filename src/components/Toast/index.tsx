import React from 'react';
import Toast from 'react-bootstrap/Toast';

interface ToastCustomProps {
  title: string;
  text: string;
  showToast: boolean;
  handleCloseToast: () => void;
}

const ToastCustom: React.FC<ToastCustomProps> = ({ title, text, showToast, handleCloseToast }: ToastCustomProps) => {
  return (
    <Toast onClose={handleCloseToast} show={showToast} delay={5000} autohide className="float-right">
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};

export default ToastCustom;
