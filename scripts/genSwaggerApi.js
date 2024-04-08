const { generateApi } = require('swagger-typescript-api');
const path = require('path');

generateApi({
  name: 'serverApi.ts',
  output: path.join(__dirname, '../interface'),
  // input: path.join(__dirname, './swagger.json'),
  // url: 'http://10.0.1.174:8500/v3/api-docs',
  url: 'http://10.0.0.99:8500/v3/api-docs',
  generateClient: false,
}).catch((e) => console.error(e));
