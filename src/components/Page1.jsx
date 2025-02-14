import { useState, useMemo} from "react";
export default function Page1({ Email, Date: selectedDate, TermsConditions, onInputChange, errors }) {

  const { today, yesterday } = useMemo(() => ({
    today: new window.Date().toISOString().split('T')[0],
    yesterday: new window.Date(Date.now() - 86400000).toISOString().split('T')[0]
  }), []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate === today || selectedDate === yesterday) {
      onInputChange(e.target.name, selectedDate);
    }
  };
  return (
    <div>
      {/* Email Input */}
      <div className="mt-2">
        <label className="text-sm font-medium block">
          Enter your .community email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="Email"
          className="w-full p-2 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600"
          value={Email}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          placeholder="Santhoshkumar.v@kalvium.community"
        />
        {errors?.Email && (
          <p className="text-red-500 text-xs">{errors.Email.message}</p>
        )}
      </div>
      {/* Date Input */}
      <div className="mt-4">
        <label className="text-sm font-medium block">
          Enter the date of WI Report <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="Date"
          className="mt-1 w-full p-2 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 appearance-none"
          value={selectedDate}
          min={yesterday}
          max={today}
          onChange={handleDateChange}
        />
        {errors?.Date && (
          <p className="text-red-500 text-xs">{errors?.Date?.message}</p>
        )}
      </div>
      {/* Terms and Conditions */}
      <div className="mt-4">
        <label className="text-sm font-medium block">
          Terms and Conditions <span className="text-red-500">*</span>
        </label>
        <div className="border p-3 rounded-md mt-1 text-xs bg-gray-100 text-gray-700">
          I agree that all the responses shared are correct and any discrepancy found will result in an integrity review which can lead to either academic or professional breach of code of conduct. I also confirm that no information shared is confidential to the business of the company.
        </div>
      </div>
      {/* Checkbox */}
      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          id="terms"
          name="TermsConditions"
          className="w-4 h-4"
          checked={TermsConditions}
          onChange={(e) => onInputChange(e.target.name, e.target.checked)}
        />
        <label htmlFor="terms" className="ml-2 text-xs">I accept the Terms and Conditions.</label>
      </div>
      {errors?.TermsConditions && (
        <p className="text-red-500 text-xs mt-1">{errors?.TermsConditions?.message}</p>
      )}
    </div>
  );
}