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

export { globals as default };
