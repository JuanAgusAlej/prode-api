/* eslint-disable max-len */
/* eslint-disable comma-dangle */
const express = require('express');
const { newMetric, getMetrics } = require('../controllers/metricController');

const router = express.Router();
const { validateAdmin, validateLoggedUser } = require('../middlewares/auth');
const { validateMetric } = require('../validators/metricValidator');

/**
 * @openapi
 * /metrics:
 *  post:
 *    tags:
 *    - metrics
 *    summary: create a new metric
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              action:
 *                type: string
 *                description: describe what kind of action occured. Can be "PAGEVIEW" or "ACTIVE"
 *              value:
 *                type: string
 *                description: is required if the action = "PAGEVIEW". Value will be the path of the page viewed
 *      required: true
 *    responses:
 *      201:
 *        description: (OK) Created
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.post('/', [validateLoggedUser, validateMetric], newMetric);

/**
 * @openapi
 * /metrics:
 *  get:
 *    tags:
 *    - metrics
 *    summary: return all the metrics of the app
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    responses:
 *      200:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Metrics'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/', [validateAdmin], getMetrics);

module.exports = router;
