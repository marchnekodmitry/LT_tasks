import path from 'path';
import fs from 'fs';

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const PORT = 3101;
const filesDirectory = path.resolve(__dirname, 'ips');

const files = fs.readdirSync(filesDirectory);

const getFileContents = (file: Buffer) => {
  return file.toString().split('\n');
};

const readFile = (file: string) => fs.readFileSync(path.resolve(filesDirectory, file))

const filesContents = files
  .map(readFile)
  .map(getFileContents)
  .flat()
  .map((row) => row.replace('\r', ''))
  .map((row) => row.split(',').map((value) => value.replace(/\"/g, '')));

app.set('trust proxy', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const baseNto10 = (positions: Array<number>, base: number) => {
  return positions
    .reverse()
    .reduce((acc, cur, idx) => {
      return acc + cur * Math.pow(base, idx);
    }, 0);
}

const base10toN = (number: number, base: number) => {
  const positions = [];

  while (Math.floor(number / base)) {
    positions.push(number % base);
    number = Math.floor(number / base);
  }

  positions.push(number);

  return positions.reverse();
}

const dottedIpToNumber = (ip: string) => {
  const positions = ip.split('.').map((digit) => parseInt(digit, 10));

  return baseNto10(positions, 256);
}

const numberToDottedIp = (ipNumber: number) => {
  return base10toN(ipNumber, 256).join('.');
}

app.get('/geo', (req, res) => {
  // const { ip } = req.query as any;
  const ip = req.ip;

  const ipNumber = dottedIpToNumber(ip);

  const rangeInfo = filesContents.find((rangeInfo) => {
    const from = parseInt(rangeInfo[0], 10);
    const to = parseInt(rangeInfo[1], 10);

    return ipNumber > from && ipNumber < to;
  });

  const ipRange = rangeInfo ? [
    numberToDottedIp(parseInt(rangeInfo[0])),
    numberToDottedIp(parseInt(rangeInfo[1])),
  ] : undefined;

  res.send({
    ip,
    ipNumber,
    rangeInfo,
    ipRange,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});
