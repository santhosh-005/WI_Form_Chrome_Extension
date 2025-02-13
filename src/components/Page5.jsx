import React from 'react';

export default function Page5({ formData, onInputChange, errors }) {
  const getValue = (fieldName) => formData[fieldName] || '';

  return (
    <div>
      {/* Had Meet Question */}
      <div className="mt-4 transition-all duration-300 overflow-hidden">
        <label className="text-sm font-medium block">
          Did you have a meeting with your work supervisor?
          <span className="text-red-500">*</span>
        </label>
        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="yes"
              name="Radio"
              value="Yes"
              checked={getValue('Radio') === "Yes"}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="yes" className="ml-2 text-sm">Yes</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="no"
              name="Radio"
              value="No"
              checked={getValue('Radio') === "No"}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="no" className="ml-2 text-sm">No</label>
          </div>
        </div>
        {errors?.Radio && (
          <p className="text-red-500 text-xs mt-1">{errors?.Radio?.message}</p>
        )}
      </div>

      {/* Meet Highlights */}
      <div
        className={`mt-4 transition-all duration-300 overflow-hidden ${
          getValue('Radio') === "Yes" ? "opacity-100 max-h-60" : "opacity-0 max-h-0"
        }`}
      >
        <label className="text-sm font-medium block">
          Please list your meeting highlights along with any feedback that you shared or was shared by you?
          <span className="text-red-500">*</span>
        </label>
        <textarea
          name="MultiLine6"
          value={getValue('MultiLine6') || ''}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          className="w-full p-2 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 resize-none"
          rows={3}
        />
        {errors?.MultiLine6 && (
          <p className="text-red-500 text-xs mt-1">{errors?.MultiLine6?.message}</p>
        )}
      </div>

      {/* Had last 5 Days Meet Question */}
      <div
        className={`mt-4 transition-all duration-300 overflow-hidden ${
          getValue('Radio') === "No" ? "opacity-100 max-h-60" : "opacity-0 max-h-0"
        }`}
      >
        <label className="text-sm font-medium block">
          Did you have any meeting with your supervisor in the last 5 working days?
          <span className="text-red-500">*</span>
        </label>
        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="yes5"
              name="Radio1"
              value="Yes"
              checked={getValue('Radio1') === "Yes"}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="yes5" className="ml-2 text-sm">Yes</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="no5"
              name="Radio1"
              value="No"
              checked={getValue('Radio1') === "No"}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="no5" className="ml-2 text-sm">No</label>
          </div>
        </div>
        {errors?.Radio1 && (
          <p className="text-red-500 text-xs mt-1">{errors?.Radio1?.message}</p>
        )}
      </div>

      {/* Reason for not Meet - Issue Ticket Number */}
      <div
        className={`mt-4 transition-all duration-300 overflow-hidden ${
          (getValue('Radio') === "No" && getValue('Radio1') === "No")
            ? "opacity-100 max-h-60"
            : "opacity-0 max-h-0"
        }`}
      >
        <label className="text-xs font-medium block">
          Since you have not met your supervisor for last 5 working days and have not submitted any feedback, we request you to please raise a ticket to the Industry Success Team who will resolve the issue for you. Please provide the ticket number.
          <span className="text-red-500">*</span>
        </label>
        <textarea
          name="SingleLine1"
          value={getValue('SingleLine1') || ''}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          className="w-full p-2 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 resize-none"
          rows={3}
        />
         {errors?.SingleLine1 && (
          <p className="text-red-500 text-xs mt-1">{errors?.SingleLine1?.message}</p>
        )}
      </div>
    </div>
  );
}