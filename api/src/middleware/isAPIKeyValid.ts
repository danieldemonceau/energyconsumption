import { API_KEY_CLIENT_AUTH } from '../config';

const isAPIKeyValid = (apiKeyToCheck: any) =>
  new Promise((resolve, reject) => {
    switch (apiKeyToCheck) {
      case 'undefined' || '' || null:
        reject(new Error(`No API key has been provided!`));
        break;
      case !API_KEY_CLIENT_AUTH:
        reject(new Error(`The API key provided is not valid!`));
        break;
      case API_KEY_CLIENT_AUTH:
        resolve(true);
        break;
      default:
        reject(new Error(`The API key provided is not valid!`));
    }
  });

export default isAPIKeyValid;
