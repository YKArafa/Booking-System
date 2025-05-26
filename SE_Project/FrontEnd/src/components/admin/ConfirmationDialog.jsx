import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationDialog = ({ isOpen, title, message, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">{message}</p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmationDialog; 