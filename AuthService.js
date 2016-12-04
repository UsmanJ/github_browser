'use stric';

import buffer from 'buffer';

class AuthService {

  login(creds, cb) {
    const b = new buffer.Buffer(creds.username + ':' + creds.password);
    const encodeAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization' : 'Basic ' + encodeAuth
      }
    })
    .then((response) => {
      if(response.status >= 200 && response.status < 300) {
        return response;
      }

      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      return cb({success: true})
    })
    .catch((err) => {
      return cb(err)
    })
  }
}

module.exports = new AuthService();
