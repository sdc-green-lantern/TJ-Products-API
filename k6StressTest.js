import http from 'k6/http';
import { sleep } from 'k6';

let randProdId = Math.floor(Math.random() * 1000012);

export let options = {
  insecureSkipTLSVerifty: true,
  noConnectionReuse: false,
  stages: [
    // spike test
    { duration: '10s', target: 100 }, // below normal load
    // { duration: '1m', target: 100 },
    { duration: '10s', target: 200 }, // spike to 1000 users
    // { duration: '1m', target: 500 }, // stay at 1000 users
    { duration: '10s', target: 100 }, // scale back down to normal
    // { duration: '1m', target: 100 }, // stay at 100 users
    { duration: '10s', target: 0 }, // recovery stage
  ],
  /* typically used for benchmark testing
  thresholds: {
    http_req_duration: [`p(99)<150`], // 99% of requests must complete below 150ms
  },
  */
};

const baseUrl = `http://localhost:3000`;

export default () => {
  http.batch([
    // ['GET', `${baseUrl}/products`],
    ['GET', `${baseUrl}/products/${randProdId}`],
    ['GET', `${baseUrl}/products/${randProdId}/styles`],
    ['GET', `${baseUrl}/products/${randProdId}/related`],
  ]);

  sleep(1);
};
