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

export const formatEmptyFields = (field, functionToRunOnText) => {
  if (!field) {
    return String.fromCharCode(0x2014); //EM DASH
  }
  if (!functionToRunOnText) {
    return field;
  }
  return functionToRunOnText(field);
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

export const updateObject = (oldObject, newProperties) => {
  return {
    ...oldObject,
    ...newProperties
  };
};

export const arrayExistsIsNotEmpty = arr => {
  return arr && arr.length > 0;
};
