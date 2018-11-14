const getImageUrl = (url, param, width, height) => {
  if (param) {
    return url + param;
  }
  return `https://imgplaceholder.com/${width}x${height}/393939/8A8A8A/fa-image`;
};

export default getImageUrl;
