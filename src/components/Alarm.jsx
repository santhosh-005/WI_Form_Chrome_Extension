import React, { useState, useEffect } from 'react';
import { chromeStorage } from './storage';

const BellIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24"     
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const BellOffIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
    <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" />
    <path d="M18 8a6 6 0 0 0-9.33-5" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const AlarmSettings = ({onClose}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [time, setTime] = useState('18:00');
  const [loading, setLoading] = useState(true);

  // Load saved settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await chromeStorage.getData('alarmSettings');
        if (settings) {
          setIsEnabled(settings.isEnabled);
          setTime(settings.time);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading alarm settings:', error);
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const updateSettings = async (newIsEnabled, newTime) => {
    try {
      await chromeStorage.saveData('alarmSettings', {
        isEnabled: newIsEnabled,
        time: newTime
      });
    } catch (error) {
      console.error('Error saving alarm settings:', error);
    }
  };

  const handleToggle = async () => {
    const newIsEnabled = !isEnabled;
    setIsEnabled(newIsEnabled);
    await updateSettings(newIsEnabled, time);
  };

  const handleTimeChange = async (e) => {
    const newTime = e.target.value;
    setTime(newTime);
    await updateSettings(isEnabled, newTime);
  };

  if (loading) {
    return <div className="mt-4">Loading settings...</div>;
  }

  return (
    <div className="mt-4">
         <div className="flex items-center w-full justify-between mb-4 px-2">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h2 className="text-sm font-semibold">Daily Reminder Settings</h2>
      </div>
      
      <div className="mt-2 flex items-center justify-between p-3 border rounded-md bg-gray-50 h-[20vh]">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className={`p-2 rounded-full transition-colors ${
              isEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
            }`}
            aria-label={isEnabled ? 'Disable notifications' : 'Enable notifications'}
          >
            {isEnabled ? <BellIcon /> : <BellOffIcon />}
          </button>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {isEnabled ? 'Reminder Active' : 'Reminder Disabled'}
            </span>
            <span className="text-xs text-gray-500">
              {isEnabled ? 'You will be notified daily' : 'Click to enable daily notifications'}
            </span>
          </div>
        </div>
        
        <input
          type="time"
          value={time}
          onChange={handleTimeChange}
          className="p-2 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600"
          disabled={!isEnabled}
        />
      </div>
      
      <p className="mt-1 text-xs text-gray-500">
        Click the bell icon to toggle notifications. When enabled, you'll receive a daily reminder to fill out your form.
      </p>
    </div>
  );
};

export default AlarmSettings;