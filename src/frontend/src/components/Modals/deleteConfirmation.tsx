import { useState } from 'react';

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[var(--primary-main-bg)] rounded-2xl p-6 shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800">Delete Item?</h2>
        <p className="text-sm text-gray-600 mt-2">
          Are you sure you want to delete this? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-[#4B9770] text-[#4B9770] "
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
