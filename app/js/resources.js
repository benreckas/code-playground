import globals from './globals';

export class StarWarsResource {
  async getResource(url) {
    try {
      const response = await fetch(url, globals.fetchOptions);

      return await response.json();
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  }
}

/**
 * Person Class
 */
export class Person extends StarWarsResource {
  constructor(person, ...args) {
    super(args);

    console.log(person); // eslint-disable-line no-console

    this.name = person.name;
    this.gender = person.gender;
    this.birthYear = person.birth_year;
    this.height = person.height;
    this.mass = person.mass;
    this.eyeColor = person.eye_color;
    this.hairColor = person.hair_color;
    this.homeworld = this.getResource(person.homeworld);
    this.species = this.getResource(person.species);
    this.films = person.films;

    this.content = globals.content;
    this.card = document.createElement('div');

    this._createPersonHtml();
  }

  async _createFilmHtml() {
    this.films.forEach(async (url) => {
      const film = await this.getResource(url);
      console.log('film:', film); // eslint-disable-line no-console
    });
  }

  async _createPersonHtml() {
    const homeworld = await this.homeworld;
    const species = await this.species;

    this.card.classList.add('col-md-12', 'person-card');
    this.card.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h4>${this.name}</h4>
        </div>
        <div class="card-body">
          <ul class="col-md-9 attributes">
            <li>Gender: ${this.gender}</li>
            <li>Birth year: ${this.birthYear}</li>
            <li>Height: ${this.height} cm</li>
            <li>Mass: ${this.mass} kg</li>
            <li>Eye color: ${this.eyeColor}</li>
            <li>Hair color: ${this.hairColor}</li>
          </ul>
          <ul class="col-md-3 films">
          </ul>
        </div>
        <div class="card-footer">
          <a class="btn btn-success" href="${homeworld.url}"><span class="fas fa-globe-europe"></span> Homeworld: ${homeworld.name}</a>
          <a class="btn btn-primary" href="${species.url}"><span class="fas fa-dna"></span> Species: ${species.name}</a>
        <div>
      </div>
    `;

    this._createFilmHtml();
    this.content.appendChild(this.card);
  }
}

/**
 * Film Class
 */
export class Film extends StarWarsResource {
  constructor(film, ...args) {
    super(args);

    console.log(film); // eslint-disable-line no-console
  }
}

/**
 * Starship Class
 */
export class Starship extends StarWarsResource {
  constructor(starship, ...args) {
    super(args);

    console.log(starship); // eslint-disable-line no-console
  }
}

/**
 * Vehicle Class
 */
export class Vehicle extends StarWarsResource {
  constructor(vehicle, ...args) {
    super(args);

    console.log(vehicle); // eslint-disable-line no-console
  }
}

/**
 * Species Class
 */
export class Species extends StarWarsResource {
  constructor(species, ...args) {
    super(args);

    console.log(species); // eslint-disable-line no-console
  }
}

/**
 * Planet Class
 */
export class Planet extends StarWarsResource {
  constructor(planet, ...args) {
    super(args);

    console.log(planet); // eslint-disable-line no-console
  }
}
