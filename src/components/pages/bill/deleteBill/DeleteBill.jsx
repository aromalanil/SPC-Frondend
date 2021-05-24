import React from 'react';
import { useSetRhinoState } from '../../../../config/context';
import useApiError from '../../../../hooks/useApiError';
import { deleteBill } from '../../../../Services/user';
import './deleteBill.scss';

const DeleteBill = ({ handleClose, userType, billId }) => {
  const { handleApiError } = useApiError();
  const setToastMessage = useSetRhinoState('toastMessage');
  const handleDeleteBill = async () => {
    try {
      await deleteBill(userType, billId);
      setToastMessage({
        severity: 'success',
        message: 'Bill deleted successfully',
      });
      handleClose();
    } catch (err) {
      handleApiError(err);
    }
  };
  return (
    <div className="delete-form">
      <p className="paragraph">This Bill will be permanently deleted. </p>
      <div className="button-wrapper">
        <button type="button" className="button cancel-button" onClick={handleClose}>
          Cancel
        </button>
        <button type="button" className="button delete-button" onClick={handleDeleteBill}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBill;
