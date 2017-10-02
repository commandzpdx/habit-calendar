/**
 * Web Routes.
 *
 * @module server/routes/web
 */

const { Router } = require('express');

const staticController = require('../controllers/static');

// Express router for web routes.
const router = Router();

// Render single page app.
router.route('*')
  .get(staticController.index);

module.exports = router;
