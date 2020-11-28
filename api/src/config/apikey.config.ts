let env: string;
switch (require('current-git-branch')()) {
  case 'develop':
    env = 'dev';
    break;
  case 'staging':
    env = 'sta';
    break;
  case 'master':
    env = 'pro';
    break;
  default:
    env = '';
}
const customEnv = require('custom-env');
customEnv.env(env);
customEnv.config();

const apiKey = process.env.API_KEY;

export default apiKey;
