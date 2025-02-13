import React, { useState, useEffect } from "react";
import { chromeStorage } from './storage';

const History = ({ onClose }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const data = await chromeStorage.getData('submissions') || [];
        // const data = [{"datetime":"2025-02-12T07:00:38.420Z","email":"Santhoshkumar.v@kalvium.community"},{"datetime":"2025-02-12T07:01:03.596Z","email":"Santhoshkumar.v@kalvium.community"},{"datetime":"2025-02-12T07:05:49.998Z","email":"Santhoshkumar.v@kalvium.community"},{"datetime":"2025-02-12T07:05:52.632Z","email":"Santhoshkumar.v@kalvium.community"},{"datetime":"2025-02-12T07:05:55.143Z","email":"Santhoshkumar.v@kalvium.community"},{"datetime":"2025-02-12T07:05:57.675Z","email":"Santhoshkumar.v@kalvium.community"},{"datetime":"2025-02-12T07:06:00.169Z","email":"Santhoshkumar.v@kalvium.community"},{"datetime":"2025-02-12T07:06:02.618Z","email":"Santhoshkumar.v@kalvium.community"},{"datetime":"2025-02-12T07:06:05.127Z","email":"Santhoshkumar.v@kalvium.community"},{"datetime":"2025-02-12T07:06:30.220Z","email":"Santhoshkumar.v@kalvium.community"}]
        const sortedData = data.sort((a, b) => 
          new Date(b.datetime) - new Date(a.datetime)
        );
        setSubmissions(sortedData);
      } catch (error) {
        console.error('Error loading submission history:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSubmissions();
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl py-2">
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
        <h2 className="text-md font-semibold">Submission History</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"/>
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No submissions yet
        </div>
      ) : (
        <div className="space-y-3 px-4 max-h-[70vh] overflow-y-scroll">
          {submissions.map((submission, index) => (
            <div
              key={submission.datetime}
              className={`p-2 rounded-lg ${
                index === 0
                  ? 'bg-gradient-to-r from-red-50 to-pink-50 border border-pink-100'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{submission.email}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-1"
                    >
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {formatDateTime(submission.datetime)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;