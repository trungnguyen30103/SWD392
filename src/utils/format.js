/**
 * Format a number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format a date string
 * @param {string} dateString - ISO date string
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  
  const defaultOptions = {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
};

/**
 * Capitalize first letter of each word in a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format age recommendation for toys
 * @param {string} ageString - Age recommendation string (e.g. "8+")
 * @returns {string} Formatted age recommendation
 */
export const formatAgeRecommendation = (ageString) => {
  if (!ageString) return 'All Ages';
  
  if (ageString === 'All ages') return 'All Ages';
  
  // Handle range format like "3-8"
  if (ageString.includes('-')) {
    const [min, max] = ageString.split('-');
    return `Ages ${min.trim()}-${max.trim()} years`;
  }
  
  // Handle "plus" format like "8+"
  if (ageString.includes('+')) {
    const age = ageString.replace('+', '').trim();
    return `Ages ${age} and up`;
  }
  
  return `Age ${ageString}`;
};

/**
 * Truncate text if longer than maxLength
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
