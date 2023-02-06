import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  card: document.querySelector('.country-info'),
};

const listBuilder = function (data) {
  refs.list.innerHTML = data
    .map(country => {
      return `<li class='list__item'><img heigth='30px' width='30px' src=${country.flags.svg} class='list__countryImage'><span class='list__countryName'>${country.name.official}</span></li>`;
    })
    .join('');
};

const countryCardBuilder = function (data) {
  refs.card.innerHTML = `<div class='card__wrapper'><img class='card__countryImage' src=${
    data[0].flags.svg
  }><span class='card__countryName'>${
    data[0].name.official
  }</span></div><p class='card__countryCapital'>Capital: ${
    data[0].capital
  }</p><p class='card__countryPopulation'>Population: ${
    data[0].population
  }</p><p class='card__countryLanguages'>Languages: ${Object.values(
    data[0].languages
  ).join(', ')}</p>`;
};

const errorHandler = function (error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
};

const dataHandler = function (data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    listBuilder(data);
  } else {
    countryCardBuilder(data);
  }
};

const onInputChange = function (event) {
  refs.card.innerHTML = '';
  refs.list.innerHTML = '';
  if (event.target.value.trim() !== '') {
    fetchCountries(event.target.value).then(dataHandler).catch(errorHandler);
  }
};

// fetchCountries('switz');

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
