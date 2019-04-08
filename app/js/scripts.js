const globals = {
  /** Properties */
  itemSelect: document.querySelector('#item-select'),
  itemLabel: document.querySelector('[for="item-select"]'),
  resourceSelect: document.querySelector('#resource-select'),
  content: document.querySelector('#content'),
  contentLoader: document.querySelector('#content-loader'),
  inputLoader: document.querySelector('#input-loader'),
  form: document.querySelector('#select-form'),
  fetchOptions: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },

  /** Methods */
  toggleContentLoadState() { this.contentLoader.classList.toggle('hidden') },

  toggleInputLoadState() { this.inputLoader.classList.toggle('hidden') },

  toggleInputDisabledState() { this.itemSelect.toggleAttribute('disabled') },

  resetItemSelect() {
    this.itemSelect.setAttribute('disabled', true);
    this.itemSelect.innerHTML = '<option disabled selected value></option>';
  },
};

/** Star Wars Base Class */
class StarWarsBaseClass {

}

/** Person Class */
class Person extends StarWarsBaseClass {
  constructor(person, ...args) {
    super(args);

    this.name = person.name;
    this.gender = person.gender;
    this.birthYear = person.birth_year;
    this.height = person.height;
    this.mass = person.mass;
    this.eyeColor = person.eye_color;
    this.hairColor = person.hair_color;
    this.homeworld = this._getHomeworld(person.homeworld);
    this.species = this._getSpecies(person.species);

    this.content = globals.content;
    this.card = document.createElement('div');

    this.createPersonHtml();
  }

  /** Methods */
  async createPersonHtml() {
    const homeworld = await this.homeworld;
    const species = await this.species;

    this.card.classList.add('col-md-12', 'person-card');
    this.card.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h4>${this.name}</h4>
        </div>
        <div class="card-body">
          <p>Gender: ${this.gender}</p>
          <p>Birth year: ${this.birthYear}</p>
          <p>Height: ${this.height} cm</p>
          <p>Mass: ${this.mass} kg</p>
          <p>Eye color: ${this.eyeColor}</p>
          <p>Hair color: ${this.hairColor}</p>
        </div>
        <div class="card-footer">
          <a class="btn btn-success" href="${homeworld.url}"><span class="fas fa-globe-europe"></span> Homeworld: ${homeworld.name}</a>
          <a class="btn btn-primary" href="${species.url}"><span class="fas fa-dna"></span> Species: ${species.name}</a>
        <div>
      </div>
    `;

    this.content.appendChild(this.card);
  }

  async _getHomeworld(url) {
    try {
      const response = await fetch(url, globals.fetchOptions);

      return await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  async _getSpecies(url) {
    try {
      const response = await fetch(url, globals.fetchOptions);

      return await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

class Film extends StarWarsBaseClass {
  constructor(film, ...args) {
    super(...args);

    console.log(film);
  }
}

class Starship extends StarWarsBaseClass {
  constructor(starship, ...args) {
    super(...args);

    console.log(starship);
  }
}

class Vehicle extends StarWarsBaseClass {
  constructor(vehicle, ...args) {
    super(...args);

    console.log(vehicle);
  }
}

class Species extends StarWarsBaseClass {
  constructor(species, ...args) {
    super(...args);

    console.log(species);
  }
}

class Planet extends StarWarsBaseClass {
  constructor(planet, ...args) {
    super(...args);

    console.log(planet);
  }
}

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
    // eslint-disable-next-line no-console
    console.log(error);
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
    // eslint-disable-next-line no-console
    console.log(error);
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
window.onload = function () {
  globals.resourceSelect.addEventListener('input', selectResource);
};
