import http from 'k6/http';
import sleep from 'k6';

export default function () {
  const baseUrl = `http://localhost:${process.env.PORT}`;

  http.get(baseUrl + '/products/1');

  sleep(1);
}
