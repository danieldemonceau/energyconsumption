import { API_KEY_CLIENT_AUTH } from '../config';

const isAPIKeyValid = (apiKeyToCheck: unknown): Promise<string> =>
  new Promise((resolve, reject) => {
    switch (true) {
      case apiKeyToCheck === 'undefined' || apiKeyToCheck === '' || apiKeyToCheck === null:
        reject(new Error(`No API key has been provided!`));
        break;
      case apiKeyToCheck === API_KEY_CLIENT_AUTH:
        resolve('true');
        break;
      default:
        reject(new Error(`The API key provided is not valid!`));
    }
  });

export default isAPIKeyValid;
