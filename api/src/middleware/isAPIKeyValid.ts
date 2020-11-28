import apiKey from '../config/apikey.config';

const isAPIKeyValid = (apiKeyToCheck: string): boolean => {
  if (apiKey === apiKeyToCheck) {
    return true;
  } else {
    return false;
  }
};

export default isAPIKeyValid;
