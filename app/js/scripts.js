const globals = {
  /** Properties */
  itemSelect: document.querySelector('#item-select'),
  resourceSelect: document.querySelector('#resource-select'),
  characterCard: document.querySelector('#character-card'),
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
};

/** Star Wars Base Class */
class StarWarsBaseClass {

}

/** Character Class */
class Character extends StarWarsBaseClass {
  constructor(character, ...args) {
    super(args);

    this.name = character.name;
    this.gender = character.gender;
    this.birthYear = character.birth_year;
    this.height = character.height;
    this.mass = character.mass;
    this.eyeColor = character.eye_color;
    this.hairColor = character.hair_color;
    this.homeworld = this._getHomeworld(character.homeworld);
    this.species = this._getSpecies(character.species);

    this.characterCard = globals.characterCard;

    this.card = document.createElement('div');
  }

  /** Methods */
  async createCharacterHtml() {
    const homeworld = await this.homeworld;
    const species = await this.species;

    this.card.classList.add('col-md-12', 'character-card');
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
          <a class="btn btn-success" href="${homeworld.url}">Homeworld: ${homeworld.name}</a>
          <a class="btn btn-default" href="${species.url}">Species: ${species.name}</a>
        <div>
      </div>
    `;

    this.characterCard.appendChild(this.card);
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

/** Functions */
async function getCharacter(e) {
  const characterUrl = e.target.selectedOptions[0].dataset.url;
  globals.characterCard.innerHTML = '';
  globals.toggleContentLoadState();

  try {
    const response = await fetch(characterUrl, globals.fetchOptions);
    const characterData = await response.json();

    const character = new Character(characterData);
    character.createCharacterHtml();

    globals.toggleContentLoadState();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

async function addCharacterToSelect(character) {
  const option = document.createElement('option');
  option.textContent = character.name;
  option.dataset.url = character.url;

  globals.itemSelect.appendChild(option);
}

async function getAllStarWarsCharacters(url) {
  try {
    const response = await fetch(url, globals.fetchOptions);
    const { results, next } = await response.json();

    results.forEach(character => addCharacterToSelect(character));

    if (next) return getAllStarWarsCharacters(next);

    globals.toggleInputLoadState();
    globals.toggleInputDisabledState();
    globals.itemSelect.addEventListener('input', getCharacter);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

async function selectResource(e) {
  const selectedResource = e.target.value;

  switch (selectedResource) {
    case 'Characters':
      getAllStarWarsCharacters('https://swapi.co/api/people/');
      globals.toggleInputLoadState();
      break;
    case 'Films':
      getAllStarWarsCharacters('https://swapi.co/api/films/');
      break;
    case 'Starships':
      getAllStarWarsCharacters('https://swapi.co/api/starships/');
      break;
    case 'Vehicles':
      getAllStarWarsCharacters('https://swapi.co/api/vehicles/');
      break;
    case 'Species':
      getAllStarWarsCharacters('https://swapi.co/api/species/');
      break;
    case 'Planets':
      getAllStarWarsCharacters('https://swapi.co/api/planets/');
      break;
    default:
      break;
  }
}

/** Onload */

// eslint-disable-next-line func-names
window.onload = function () {
  globals.resourceSelect.addEventListener('input', selectResource);
};
