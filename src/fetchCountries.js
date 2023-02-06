export const fetchCountries = function (name) {
  if (name.trim() !== '') {
    const fetchUrl = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(fetchUrl).then(responseHandler);
  }
};

function responseHandler(response) {
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
}
