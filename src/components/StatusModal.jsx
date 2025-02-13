import React from 'react';

const StatusModal = ({ status, confirmationProps }) => {
  if (!status && !confirmationProps) return null;
 
  const isConfirmation = Boolean(confirmationProps);
 
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className={`fixed inset-0 ${isConfirmation ? 'bg-black/20 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm'}`} />

      <div className={`
        relative flex flex-col items-center justify-center gap-2
        ${isConfirmation ? 'bg-white rounded-lg p-4 shadow-xl max-w-xs w-full mx-4' : ''}
      `}>
        {/* Status Icons */}
        {!isConfirmation && (
          <>
            {status === 'loading' && (
              <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
            )}
           
            {status === 'success' && (
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-green-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            )}
           
            {status === 'error' && (
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-red-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
          </>
        )}

        {/* Confirmation Icon */}
        {isConfirmation && (
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 text-yellow-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
       
        {/* Status Messages */}
        {!isConfirmation && (
          <p className="text-gray-700 font-medium text-center text-sm">
            {status === 'loading' && 'Submitting...'}
            {status === 'success' && 'Success!'}
            {status === 'error' && 'Something went wrong'}
          </p>
        )}

        {/* Confirmation Content */}
        {isConfirmation && (
          <>
            <h3 className="text-base font-semibold text-gray-900">
              {confirmationProps.title || 'Confirm Action'}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {confirmationProps.message || 'Are you sure you want to proceed?'}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={confirmationProps.onCancel}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmationProps.onConfirm}
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusModal;