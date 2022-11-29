const express = require('express');

const router = express.Router();
const { generatePrediction } = require('../controllers/predictions');
const { validateLoggedUser } = require('../middlewares/auth');
const { validatePrediction } = require('../validators/predictionValidator');

/**
 * @openapi
 * /prediction:
 *  post:
 *    tags:
 *    - predictions
 *    summary: create a prediction
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              goalsA:
 *                type: integer
 *                description: goals of the local team
 *              goalsB:
 *                type: integer
 *                description: goals of the visitor team
 *              matchId:
 *                type: string
 *                description: match id of the prediction
 *      required: true
 *    responses:
 *      201:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Prediction'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.post('/', [validatePrediction, validateLoggedUser], generatePrediction);

module.exports = router;
