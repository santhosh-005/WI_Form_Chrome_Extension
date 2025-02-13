import React, { useEffect, useState, useCallback } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Alarm from './Alarm';
import StatusModal from './StatusModal';
import History from './History';
import { validateForm, handleSubmit } from './validate';
import { chromeStorage } from './storage';

function Form() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const [errors, setErrors] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showHistoryPage, setShowHistoryPage] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAlarmPage, setShowAlarmPage] = useState(false);

  const [formData, setFormData] = useState({
    Email: '',
    Date: new Date().toISOString().split('T')[0],
    TermsConditions: true,
    Slider: 3,
    Slider2: 3,
  });

  const sendFormDataTovalidate = async () => {
    const res = await validateForm(formData);
    if (res?.errors && Object.keys(res.errors).length > 0) {
      setErrors(res.errors);
      setCurrentPage(res.firstErrorPage);
      return;
    }
    setShowConfirmation(true)
  }

  const onSubmit = useCallback(async () => {
    setSubmitStatus('loading');
    try {
      const result = await handleSubmit(formData);

      if (result?.success) {
        setSubmitStatus('success');
        setErrors({});
        setCurrentPage(1);
        const date = new Date().toISOString()
        try {
          // Save form data
          const { Date, ...dataToSave } = formData;
          await chromeStorage.saveData('formData', dataToSave);

          // Save to history
          let submissions = await chromeStorage.getData('submissions') || [];
          const newSubmission = {
            email: formData.Email,
            datetime: date
          };

          // console.log("Test object:", newSubmission);

          submissions.push(newSubmission);
          if (submissions.length > 10) {
            submissions.shift();
          }
          await chromeStorage.saveData('submissions', submissions);
        } catch (storageError) {
          console.error('Storage operation failed:', storageError);
        }
      } else {
        setSubmitStatus('error');
        console.error("Submission error:", result?.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }

    setTimeout(() => setSubmitStatus(null), 2000);
  }, [formData]);

  // Load saved data on mount
  useEffect(() => {
    let mounted = true;

    const loadSavedData = async () => {
      try {
        const savedData = await chromeStorage.getData('formData');
        if (savedData && mounted) {
          setFormData(prev => ({ ...prev, ...savedData }));
        }
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    };

    loadSavedData();
    return () => {
      mounted = false;
    };
  }, []);

  // Update total pages based on dropdown
  useEffect(() => {
    if (!formData?.Dropdown?.id) return;

    const pages = {
      '3': 5,
      '4': 4,
      'default': 2
    };

    setTotalPages(pages[formData.Dropdown.id] || pages.default);
  }, [formData?.Dropdown?.id]);

  const updateFormField = useCallback((fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  const handleNavigation = useCallback((direction) => {
    if (isAnimating) return;

    setSlideDirection(direction);
    setIsAnimating(true);

    const timer = setTimeout(() => {
      setCurrentPage(prev => direction === 'right' ? prev + 1 : prev - 1);
      setIsAnimating(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [isAnimating]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      handleNavigation('right');
    }
  }, [currentPage, totalPages, handleNavigation]);

  const handleBack = useCallback(() => {
    if (currentPage > 1) {
      handleNavigation('left');
    }
  }, [currentPage, handleNavigation]);

  const getAnimationClasses = useCallback(() => {
    const baseClasses = "transition-all duration-200 w-full";

    if (!isAnimating) return `${baseClasses} opacity-100 translate-x-0`;

    return `${baseClasses} opacity-0 ${slideDirection === 'right' ? 'translate-x-full' : '-translate-x-full'
      }`;
  }, [isAnimating, slideDirection]);

  const renderPage = useCallback(() => {
    const pages = {
      1: <Page1
        Email={formData.Email}
        Date={formData.Date}
        TermsConditions={formData.TermsConditions}
        onInputChange={updateFormField}
        errors={errors}
      />,
      2: <Page2 formData={formData} onInputChange={updateFormField} errors={errors} />,
      3: <Page3 formData={formData} onInputChange={updateFormField} errors={errors} />,
      4: <Page4 formData={formData} onInputChange={updateFormField} errors={errors} />,
      5: <Page5 formData={formData} onInputChange={updateFormField} errors={errors} />
    };

    return (
      <div className={getAnimationClasses()}>
        {pages[currentPage] || pages[1]}
      </div>
    );
  }, [currentPage, formData, errors, updateFormField, getAnimationClasses]);


  return (
    <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-2xl">
      <StatusModal
        status={submitStatus}
        confirmationProps={showConfirmation ? {
          title: "Confirm Submission",
          message: "Are you sure you want to submit this form?",
          onConfirm: () => {
            setShowConfirmation(false);
            onSubmit();
          },
          onCancel: () => setShowConfirmation(false)
        } : null}
      />

      <h1 className="text-2xl font-bold text-center text-red-600">Kalvium</h1>
      <h2 className="text-lg font-semibold text-center mt-2">
        Kalvium Work Integration Form
      </h2>

      <div className="relative overflow-hidden">
        {showHistoryPage ? (
          <History onClose={() => {
            setShowHistoryPage(false);
            setCurrentPage(1);
          }} />
        ) : showAlarmPage ? (
          <Alarm onClose={() => setShowAlarmPage(false)} />
        ) : (
          <>
            <div className="mt-1 flex w-full justify-between items-center">
              <div className="flex gap-1 items-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`rounded-full transition-all duration-300 ${currentPage === index + 1
                        ? 'w-3 h-3 bg-gray-500'
                        : 'w-2 h-2 bg-gray-300'
                      }`}
                    onClick={() => setCurrentPage(index + 1)}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
              <div>
              <button
               className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
               onClick={() => setShowAlarmPage(true)}
               aria-label="View alarm page"
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
                      className='text-gray-500 hover:text-black'
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
              </button>

              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                onClick={() => setShowHistoryPage(true)}
                aria-label="View submission history"
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
                  className="text-gray-500 hover:text-black"
                >
                  <path d="M3 3v5h5" />
                  <path d="M3 3l6.385 6.385" />
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
              </button>
              </div>
            </div>
            {renderPage()}

            <div className="flex justify-between items-center mt-6">
              <button
                className="py-1 px-6 bg-gray-600 text-white rounded-md disabled:bg-gray-400 transition-colors select-none"
                onClick={handleBack}
                disabled={currentPage === 1 || isAnimating}
              >
                Back
              </button>
              <button
                className="py-1 px-6 bg-gray-600 text-white rounded-md disabled:bg-gray-400 transition-colors select-none"
                onClick={handleNext}
                disabled={currentPage === totalPages || isAnimating}
              >
                Next
              </button>
            </div>

            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className="w-full bg-gradient-to-r from-red-400 to-pink-400 text-white py-2 px-4 rounded-lg font-medium
                hover:from-red-500 hover:to-pink-500 focus:outline-none focus:ring-0
                transform transition-all duration-500 hover:scale-[1.01] mt-4 cursor-pointer select-none"
              onClick={sendFormDataTovalidate}
            >
              {submitStatus === 'loading' ? 'Submitting...' : 'SUBMIT'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Form;