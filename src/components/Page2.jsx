import { useEffect, useState } from 'react';
import data from '../data.json';
export default function Page2({ formData, onInputChange, errors }) {
  // console.log(2, errors)
  const getValue = (fieldName) => formData[fieldName] || '';
  const handleIntegrationChange = (e) => {
    const selectedNature = data.work_integration_nature.find(
      nature => nature.id.toString() === e.target.value
    );
    onInputChange(e.target.name, selectedNature);
  };
  const showCompanyField = () => getValue('Dropdown')?.id?.toString() === '3';
 
  const showKeyTasksField = () => {
    const dropdownId = getValue('Dropdown')?.id?.toString();
    return dropdownId === '3' || dropdownId === '4';
  };
  return (
    <div>
      {/* Work Nature Type Dropdown */}
      <div className="mt-6">
        <label className="text-sm font-medium block">
          What is the nature of your work integration? <span className="text-red-500">*</span>
        </label>
        <select
          name="Dropdown"
          value={getValue('Dropdown')?.id?.toString() || ''}
          onChange={handleIntegrationChange}
          className="mt-1 w-full p-2 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 bg-white"
        >
          <option value="">Select integration type</option>
          {data?.work_integration_nature?.map((nature) => (
            <option key={nature.id} value={nature.id}>
              {nature.name}
            </option>
          ))}
        </select>
        {errors?.Dropdown && (
          <p className="text-red-500 text-xs">{errors?.Dropdown?.message}</p>
        )}
      </div>
      {/* Company Name Dropdown */}
      <div className={`mt-4 transition-all duration-300 overflow-hidden ${
        showCompanyField()
          ? "opacity-100 max-h-60"
          : "opacity-0 max-h-0"
      }`}>
        <label className="text-sm font-medium block">
          Enter the name of your company
        </label>
        <select
          name="Dropdown1"
          value={getValue('Dropdown1') || ''}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          className="mt-1 w-full p-2 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 bg-white"
        >
          <option value="">Select company</option>
          {data?.company_names?.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        {errors?.Dropdown1 && (
          <p className="text-red-500 text-xs">{errors?.Dropdown1?.message}</p>
        )}
      </div>
      {/* Key Tasks Textarea */}
      <div className={`mt-4 transition-all duration-300 overflow-hidden ${
        showKeyTasksField()
          ? "opacity-100 max-h-60"
          : "opacity-0 max-h-0"
      }`}>
        <label className="text-sm font-medium block">
          What were your key tasks for the day? <span className="text-red-500">*</span>
        </label>
        <textarea
          name="MultiLine"
          value={getValue('MultiLine') || ''}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          className="mt-1 w-full p-2 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 resize-none"
          rows={3}
        />
        {errors?.MultiLine && (
          <p className="text-red-500 text-xs">{errors?.MultiLine?.message}</p>
        )}
      </div>
    </div>
  );
}