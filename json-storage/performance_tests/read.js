import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://0.0.0.0:3100/THygs/fWJTd/PrPrO/skDtQ');
  sleep(1);
}