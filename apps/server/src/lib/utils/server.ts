import bodyParser from 'body-parser';

const cors = require('cors');
const express = require('express');

const LIMIT = '1000mb';

export const createServer = () => {
  const server = express();

  server.use(cors());
  server.use(bodyParser.json({ limit: LIMIT }));
  server.use(
    bodyParser.urlencoded({
      extended: true,
      limit: LIMIT,
    }),
  );

  return server;
};
