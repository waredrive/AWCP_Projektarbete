export const getImageUrl = (url, param, width, height) => {
  if (param) {
    return url + param;
  }
  return `https://imgplaceholder.com/${width}x${height}/393939/8A8A8A/fa-image`;
};
export const formatEmptyFields = (field, functionToRunAfter) => {
  if (!field) {
    return '-';
  }
  if (!functionToRunAfter) {
    return field;
  }
  return functionToRunAfter(field);
};

export const convertRuntimeToHoursAndMinutes = runtime => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  if (hours === 0) {
    return `${minutes}m`;
  }
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
};

export const formatCurrency = amount => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  return formatter.format(amount);
};
