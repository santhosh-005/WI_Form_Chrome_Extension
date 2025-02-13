import React from 'react';

export default function Page4({ formData, onInputChange, errors }) {
  const getValue = (fieldName) => formData[fieldName] || '';

  const handleRatingChange = (value) => {
    onInputChange('Slider2', value);
  };

  return (
    <div>
      <div className="mt-6">
        <label className="text-sm font-medium block">
          How would you rate your productivity level? <span className="text-red-500">*</span>
        </label>
        <div className="relative px-2">
          {/* Points and Line */}
          <div className="flex justify-between items-center relative">
            {/* Background Line */}
            <div className="absolute w-full h-0.5 bg-gray-200" />

            {/* Active Line */}
            <div
              className="absolute h-0.5 bg-blue-500 transition-all duration-300"
              style={{ width: `${((getValue('Slider2') || 3) - 1) * 25}%` }}
            />

            {/* Points */}
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex flex-col items-center z-10">
                <button
                  onClick={() => handleRatingChange(value)}
                  className={`w-4 h-4 rounded-full border-2 transition-colors duration-200 mt-7 cursor-pointer ${
                    value <= (getValue('Slider2') || 3)
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white border-gray-300"
                  }`}
                />
                <span className="mt-2 text-sm text-gray-600">{value}</span>
              </div>
            ))}
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">low</span>
            <span className="text-sm text-gray-600">high</span>
          </div>
        </div>
        {errors?.Slider2 && (
          <p className="text-red-500 text-xs mt-1">{errors?.Slider2?.message}</p>
        )}  
      </div>

      {/* Had Challenges Question */}
      <div
        className={`mt-4 transition-all duration-300 overflow-hidden ${
          (getValue('Slider2') || 3) < 3 ? "opacity-100 max-h-60" : "opacity-0 max-h-0"
        }`}
      >
        <label className="text-sm font-medium block">
          Did you face any challenges today which impacted your productivity?
          <span className="text-red-500">*</span>
        </label>
        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="yes"
              name="Radio3"
              value="Yes"
              checked={getValue('Radio3') === "Yes"}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="yes" className="ml-2 text-sm">Yes</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="no"
              name="Radio3"
              value="No"
              checked={getValue('Radio3') === "No"}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="no" className="ml-2 text-sm">No</label>
          </div>
        </div>
        {errors?.Radio3 && (
          <p className="text-red-500 text-xs mt-1">{errors?.Radio3?.message}</p>
        )}
      </div>

      {/* Productivity Challenges */}
      <div
        className={`mt-4 transition-all duration-300 overflow-hidden ${
          (getValue('Slider2') || 3) < 3 && getValue('Radio3') === "Yes"
            ? "opacity-100 max-h-60"
            : "opacity-0 max-h-0"
        }`}
      >
        <label className="text-sm font-medium block">
          What were the productivity challenges that you faced and how did you overcome?
          <span className="text-red-500">*</span>
        </label>
        <textarea
          name="MultiLine4"
          value={getValue('MultiLine4') || ''}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          className="w-full p-2 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 resize-none"
          rows={3}
        />
         {errors?.MultiLine4 && (
          <p className="text-red-500 text-xs mt-1">{errors?.MultiLine4?.message}</p>
        )}
      </div>

      {/* Wins of the Day */}
      <div
        className={`mt-4 transition-all duration-300 overflow-hidden ${
          (getValue('Slider2') || 3) > 3 
            ? "opacity-100 max-h-60"
            : "opacity-0 max-h-0"
        }`}
      >
        <label className="text-sm font-medium block">
          What were your wins for the day? <span className="text-red-500">*</span>
        </label>
        <textarea
          name="MultiLine5"
          value={getValue('MultiLine5') || ''}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          className="w-full p-2 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 resize-none"
          rows={3}
        />
        {errors?.MultiLine5 && (
          <p className="text-red-500 text-xs mt-1">{errors?.MultiLine5?.message}</p>
        )}
      </div>
    </div>
  );
}