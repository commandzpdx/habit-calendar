/**
 * Server Entry Point.
 *
 * @module server/index
 */

const server = require('./libraries/server');
const database = require('./libraries/database');

database.connect()
  .then(() => server.start());
