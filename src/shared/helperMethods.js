// Returns a placeholder image path if pathParam does not exist otherwise returns url to image on TMDB.
// Both url and local paths are based on the size parameters (Height, Width or HeightWidth).
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

// Returns "em dash" character if text is empty. Can run a function on text before
// returning it.
export const formatEmptyFields = (text, functionToRunOnText) => {
  if (!text) {
    return String.fromCharCode(0x2014);
  }
  if (!functionToRunOnText) {
    return text;
  }
  return functionToRunOnText(text);
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

// For immutable update of an object.
export const updateObject = (oldObject, newProperties) => ({
  ...oldObject,
  ...newProperties
});

export const arrayExistsIsNotEmpty = arr => arr && arr.length > 0;
