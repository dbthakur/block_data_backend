
// return current financial year in format YYYY-YYYY
export const getCurrentFinancialYearFormatted = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed in JavaScript

    if (currentMonth >= 4) {
        return `${currentYear}-${currentYear + 1}`;
    } else {
        return `${currentYear - 1}-${currentYear}`;
    }
};

export const getCurrentFinancialYearandprevious = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JS months are 0-indexed

  let startYear, nextYear, prevStart, prevEnd;

  if (currentMonth >= 4) {
    startYear = currentYear;
    nextYear = currentYear + 1;
    prevStart = currentYear - 1;
    prevEnd = currentYear;
  } else {
    startYear = currentYear - 1;
    nextYear = currentYear;
    prevStart = currentYear - 2;
    prevEnd = currentYear - 1;
  }

  // Format as "YYYY-YY", e.g., "2024-25"
  const formatYear = (start, end) => `${start}-${String(end).slice(-2)}`;

  return [
    formatYear(startYear, nextYear),
    formatYear(prevStart, prevEnd)
  ];
};
