import { BASE_URL } from './constants';

class Api {
  constructor(options) {
    this.baseUrl = options.BASE_BACKEND_URL;
    this.headers = options.headers;
  }

  _request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = { headers: this.headers };
    const combinedOptions = { ...defaultOptions, ...options };

    return fetch(url, combinedOptions).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Error: ${response.status}`);
    });
  }

  authorize(name) {
    return this._request('/signin', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  getCards() {
    return this._request('/cards');
  }
}

const mainApi = new Api({
  BASE_BACKEND_URL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
