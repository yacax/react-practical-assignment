import { BASE_URL } from './constants';

class Api {
  constructor(options) {
    this.baseUrl = options.BASE_BACKEND_URL;
    this.headers = options.headers;
  }

  _request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    let defaultOptions = { headers: this.headers };
    if (options.body instanceof FormData) {
      defaultOptions = {};
    }

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

  addNewPost(post) {
    return this._request('/post', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }

  uploadImage(postId, file) {
    const formData = new FormData();
    formData.append('picture', file);
    return this._request(`/post/${postId}/picture`, {
      method: 'POST',
      body: formData,
    });
  }

  getPostsByPage(pageNumber = 1) {
    return this._request(`/post/page/${pageNumber}`, {
      method: 'GET',
    });
  }

  deletePost(id) {
    return this._request(`/post/${id}`, {
      method: 'DELETE',
    });
  }

  updatePost(id, post) {
    return this._request(`/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  }

  createComment(comment) {
    return this._request('/comment', {
      method: 'POST',
      body: JSON.stringify(comment),
    });
  }
}

const mainApi = new Api({
  BASE_BACKEND_URL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
