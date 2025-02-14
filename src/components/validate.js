const validationRules = {
  Email: {
    page: 1,
    required: true,
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address'
  },
  Date: {
    page: 1,
    required: true,
    message: 'Please select a date'
  },
  TermsConditions: {
    page: 1,
    required: true,
    validate: (value) => value === true,
    message: 'You must accept the terms and conditions'
  },
  Dropdown: {
    page: 2,
    required: true,
    validate: (value) => value?.id !== undefined,
    message: 'Please select work integration nature'
  },
  MultiLine: {
    page: 2,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return dropdownId === '3' || dropdownId === '4';
    },
    validate: (value) => value?.length > 0,
    message: 'Please describe your key tasks'
  },
  Dropdown1: {
    page: 2,
    required: (formData) => formData.Dropdown?.id?.toString() === '3',
    message: 'Please select your company'
  },
  // Page 3 rules
  Slider: {
    page: 3,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return dropdownId === '3' || dropdownId === '4';
    },
    validate: (value) => value >= 1 && value <= 5,
    message: 'Please rate your engagement level'
  },
  Radio2: {
    page: 3,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return (dropdownId === '3' || dropdownId === '4') && (formData.Slider || 3) < 3;
    },
    message: 'Please select whether you faced challenges'
  },
  MultiLine2: {
    page: 3,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return (dropdownId === '3' || dropdownId === '4') && (formData.Slider || 3) < 3 && formData.Radio2 === "Yes";
    },
    validate: (value) => value?.length > 0,
    message: 'Please describe the challenges you faced'
  },
  MultiLine1: {
    page: 3,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return (dropdownId === '3' || dropdownId === '4') && (formData.Slider || 3) > 3;
    },
    validate: (value) => true,
    message: 'Please describe your wins for the day'
  },
  // Page 4 rules
  Slider2: {
    page: 4,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return dropdownId === '3' || dropdownId === '4';
    },
    validate: (value) => value >= 1 && value <= 5,
    message: 'Please rate your productivity level'
  },
  Radio3: {
    page: 4,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return (dropdownId === '3' || dropdownId === '4') && (formData.Slider2 || 3) < 3;
    },
    message: 'Please select whether you faced challenges'
  },
  MultiLine4: {
    page: 4,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return (dropdownId === '3' || dropdownId === '4') && (formData.Slider2 || 3) < 3 && formData.Radio3 === "Yes";
    },
    validate: (value) => value?.length > 0,
    message: 'Please describe the challenges you faced'
  },
  MultiLine5: {
    page: 4,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return (dropdownId === '3' || dropdownId === '4') && (formData.Slider2 || 3) > 3;
    },
    validate: (value) => true,
    message: 'Please describe your wins for the day'
  },
  // Page 5 rules
  Radio: {
    page: 5,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return dropdownId === '3';
    },
    message: 'Please select if you had a meeting with your supervisor'
  },
  MultiLine6: {
    page: 5,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return (dropdownId === '3' ) && formData.Radio === "Yes";
    },
    validate: (value) => value?.length > 0,
    message: 'Please provide meeting highlights and feedback'
  },
  Radio1: {
    page: 5,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return (dropdownId === '3') && formData.Radio === "No";
    },
    message: 'Please select if you had a meeting in the last 5 working days'
  },
  SingleLine1: {
    page: 5,
    required: (formData) => {
      const dropdownId = formData.Dropdown?.id?.toString();
      return (dropdownId === '3') && formData.Radio === "No" && formData.Radio1 === "No";
    },
    validate: (value) => value?.length > 0,
    message: 'Please provide the ticket number'
  }
};

  function convertDateFormat(dateString) {
    if (!dateString) return "";
    try{
    const trimmedDate = dateString.trim();
    if (trimmedDate === "") return "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmedDate)) {
      console.warn('Invalid date format:', trimmedDate);
      return "";
    }
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const [year, month, day] = dateString.split('-');
      const monthName = months[parseInt(month) - 1];
      return `${day}-${monthName}-${year}`;
    }catch(err){
      console.log("Error Found", err?.message)
    }
}
  
  
  // validation function that returns errors with page info
  const validateForm = (formData) => {
    if (!formData) {
      return {
          errors: {},
          firstErrorPage: 1
      };
    }
  
    const errors = {};
    let firstErrorPage = null;
    
    Object.entries(validationRules).forEach(([fieldName, rules]) => {
      const isRequired = typeof rules.required === 'function' 
        ? rules.required(formData)
        : rules.required;
  
      if (isRequired) {
        // Check if field is empty
        if (!formData[fieldName]) {
          if (fieldName === 'MultiLine1' || fieldName === 'MultiLine5') {
            return;
          }
          errors[fieldName] = {
            message: rules.message,
            page: rules.page
          };
          if (!firstErrorPage || rules.page < firstErrorPage) {
            firstErrorPage = rules.page;
          }
          return;
        }
  
        // Run custom validation if exists
        if (rules.validate && !rules.validate(formData[fieldName])) {
          errors[fieldName] = {
            message: rules.message,
            page: rules.page
          };
          if (!firstErrorPage || rules.page < firstErrorPage) {
            firstErrorPage = rules.page;
          }
        }
      }
    });
  
    return {
      errors,
      firstErrorPage
    };
  };
  
  // Submission handler that uses the simplified validation
  const handleSubmit = async (formData) => {  
    // Get only required fields for submission
    const requiredFields = Object.entries(validationRules)
      .reduce((fields, [fieldName, rules]) => {
        const isRequired = typeof rules.required === 'function'
          ? rules.required(formData)
          : rules.required;
  
        if (isRequired && formData[fieldName] !== undefined) {
          let value = formData[fieldName];
          if (fieldName == 'Date'){
            value = convertDateFormat(value) || value;
          } 

          if (fieldName == 'Dropdown'){
            value = value?.name || "";
          } 

          fields[fieldName] = value;
        }
        return fields;
      }, {});
  
      try {
        const response = await fetch("https://forms.zohopublic.in/gurmindersinghkal1/form/Signup/formperma/GeJFMLBDfoWlIJfhI46Qyx0Dlf3kHhMSRsvMItq_Riw/records", {
          method: 'POST',
          headers: {
            'Accept': 'application/zoho.forms-v1+json',
            'Content-Type': 'application/json',
            'Origin': 'https://forms.zohopublic.in',
            'Referer': 'https://forms.zohopublic.in/gurmindersinghkal1/form/Signup/formperma/GeJFMLBDfoWlIJfhI46Qyx0Dlf3kHhMSRsvMItq_Riw',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify(requiredFields)
        });
    
        if (!response.ok) {
          throw new Error('Submission failed');
        }
  
        const data = await response.json();
        // console.log("Form submitted successfully:", data);
    
        return {
          success: true,
          data: data
        };
      } catch (error) {
        console.error("Error submitting form:", error);
        return {
          success: false,
          error: error.message
        };
      }
  };
  
  export { validateForm, handleSubmit };