// Style Imports
import '../sass/styles.sass';

// JavaScript Imports
import 'babel-polyfill';
import globals from './globals';
import {
  Person, Film, Starship, Vehicle, Species, Planet,
} from './resources';

/** Functions */
async function getResource(e) {
  const { resource } = globals.resourceSelect.selectedOptions[0].dataset;
  const { url } = e.target.selectedOptions[0].dataset;
  globals.content.innerHTML = '';
  globals.toggleContentLoadState();

  try {
    const response = await fetch(url, globals.fetchOptions);
    const data = await response.json();

    globals.toggleContentLoadState();

    // eslint-disable-next-line default-case
    switch (resource) {
      case 'person':
        return new Person(data);
      case 'film':
        return new Film(data);
      case 'starship':
        return new Starship(data);
      case 'vehicle':
        return new Vehicle(data);
      case 'species':
        return new Species(data);
      case 'planet':
        return new Planet(data);
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
}

async function addResultToSelect(result) {
  const { resource } = globals.resourceSelect.selectedOptions[0].dataset;
  const option = document.createElement('option');
  option.textContent = resource === 'film' ? result.title : result.name;
  option.dataset.url = result.url;

  globals.itemSelect.appendChild(option);
}

async function getSelectedResource(url) {
  try {
    const response = await fetch(url, globals.fetchOptions);
    const { results, next } = await response.json();

    results.forEach(result => addResultToSelect(result));

    if (next) return getSelectedResource(next);

    globals.toggleInputLoadState();
    globals.toggleInputDisabledState();
    globals.itemSelect.addEventListener('input', getResource);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
}

async function selectResource(e) {
  const { url, label } = e.target.selectedOptions[0].dataset;

  getSelectedResource(url);

  globals.itemLabel.textContent = `Choose a ${label}`;
  globals.resetItemSelect();
  globals.toggleInputLoadState();
}

/** Onload */

// eslint-disable-next-line func-names
window.onload = () => globals.resourceSelect.addEventListener('input', selectResource);
