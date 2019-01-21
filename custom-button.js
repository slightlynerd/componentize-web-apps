// create a template with some DOM
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      margin: 10px;
    }
    p {
      font-size: 24px;
    }
    p #counter {
      color: red;
    } 
    button {
      background-color: #212121;
      color: #FCFCFC;
      padding: 16px;
      border: none;
      outline: none;
      font-size: 18px;
      font-weight: bold;
      border-radius: 8px;
    }
  </style>
  <p>Count: <span id="counter">0</span></p>
  <button>Click Me</span>
`;

class CustomButton extends HTMLElement {

  constructor(){
    // always call super first!
    super();
    // set shadowRoot mode and attach template to it
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // attributes to observe
  static get observedAttributes() { return ['count']; }

  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
      case 'count':
        if (oldVal !== newVal) {
          // set count property to newVal
          this[attr] = newVal;
          this._updateUI();
        }
        break;
    }
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', this._increaseCount.bind(this));
  }

  disconnectedCallback() {
    const button = this.shadowRoot.querySelector('button');
    button.removeEventListener('click', this._increaseCount.bind(this));
  }

  set count(value) {
    if (value) {
      this.setAttribute('count', value);
    } else {
      this.removeAttribute('count');
    }
  }

  get count() {
    return this.getAttribute('count');
  }

  _increaseCount() {
    // convert the attribute's value to a base 10 integer
    const count = parseInt(this.getAttribute('count'), 10);
    this.count = count + 1;
    this._updateUI();
  }

  _updateUI() {
    const counter = this.shadowRoot.querySelector('#counter');
    counter.innerText = this.count;
  }
}

window.customElements.define('custom-button', CustomButton);