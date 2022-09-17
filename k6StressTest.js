import http from 'k6/http';
import sleep from 'k6';

export default function () {
  const baseUrl = `https://test.k6.io`;

  console.log(baseUrl);

  http.get(baseUrl);

  sleep(1);
}
