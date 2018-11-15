/* eslint-disable */
export const getImageUrl = (pathParam, firstSizeParam, secondSizeParam) => {
  const localImgNamePath =
    firstSizeParam && secondSizeParam
      ? firstSizeParam + secondSizeParam
      : firstSizeParam;

  if (pathParam) {
    return `https://image.tmdb.org/t/p/${firstSizeParam}${pathParam}`;
  }
  return require(`../assets/images/placeholders/${localImgNamePath}.png`);
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
