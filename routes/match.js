/* eslint-disable comma-dangle */
const express = require('express');
const {
  getAllMatches,
  getMatch,
  addMatch,
  editMatch,
  setResults,
  deleteMatch,
} = require('../controllers/matchController');

const router = express.Router({ mergeParams: true });
const { validateAdmin, validateLoggedUser } = require('../middlewares/auth');
const {
  validateMatchId,
  validateCreate,
  validateUpdate,
  validateSetResults,
} = require('../validators/matchValidator');

/**
 * @openapi
 * /tournament/{tournamentId}/match:
 *   get:
 *    tags:
 *    - tournament and matches
 *    summary: Get the information of all the matches of a tournament
 *    parameters:
 *    - name: tournamentId
 *      in: path
 *      description: id of the tournament you want to get
 *      required: true
 *      schema:
 *        type: string
 *    - $ref: '#/components/parameters/token'
 *    responses:
 *      200:
 *        description: (OK) Retrieving matches info
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              description: array with all the matches
 *              items:
 *                $ref: '#/components/schemas/Match'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

// Get all matches
router.get('/', validateLoggedUser, getAllMatches);

/**
 * @openapi
 * /tournament/{tournamentId}/match/{matchId}:
 *   get:
 *    tags:
 *    - tournament and matches
 *    summary: Get the information of all the matches of a tournament
 *    parameters:
 *    - name: tournamentId
 *      in: path
 *      description: id of the tournament you want to get
 *      required: true
 *      schema:
 *        type: string
 *    - name: matchId
 *      in: path
 *      description: id of the match you want to get
 *      required: true
 *      schema:
 *        type: string
 *    - $ref: '#/components/parameters/token'
 *    responses:
 *      200:
 *        description: (OK) Retrieving match info
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Match'
 *              description: selected match
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

// Get a match
router.get('/:matchId', [validateLoggedUser, validateMatchId], getMatch);

/**
 * @openapi
 * /tournament/{tournamentId}/match:
 *   post:
 *    tags:
 *    - tournament and matches
 *    summary: Add a match to a tournament
 *    parameters:
 *    - name: tournamentId
 *      in: path
 *      description: id of the tournament you want to get
 *      required: true
 *      schema:
 *        type: string
 *    - $ref: '#/components/parameters/token'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateMatch'
 *      required: true
 *    responses:
 *      200:
 *        description: (OK) Retrieving added Match info
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Match'
 *              description: Match added
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

// Add a match
router.post('/', [validateAdmin, validateCreate], addMatch);

/**
 * @openapi
 * /tournament/{tournamentId}/match/{matchId}:
 *   put:
 *    tags:
 *    - tournament and matches
 *    summary: Edit a match from a tournament
 *    parameters:
 *    - name: tournamentId
 *      in: path
 *      description: id of the tournament you want to get
 *      required: true
 *      schema:
 *        type: string
 *    - name: matchId
 *      in: path
 *      description: id of the match you want to update
 *      required: true
 *      schema:
 *        type: string
 *    - $ref: '#/components/parameters/token'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateMatch'
 *      required: true
 *    responses:
 *      201:
 *        description: (OK) Retrieving modified Match info
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Match'
 *              description: Match updated
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

// Update a match
router.put('/:matchId', [validateAdmin, validateUpdate], editMatch);

/**
 * @openapi
 * /tournament/{tournamentId}/match/{matchId}/results:
 *   put:
 *    tags:
 *    - tournament and matches
 *    summary: Edit the results of a match
 *    parameters:
 *    - name: tournamentId
 *      in: path
 *      description: id of the tournament you want to get
 *      required: true
 *      schema:
 *        type: string
 *    - name: matchId
 *      in: path
 *      description: id of the match you want to update
 *      required: true
 *      schema:
 *        type: string
 *    - $ref: '#/components/parameters/token'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SetMatchScore'
 *      required: true
 *    responses:
 *      201:
 *        description: (OK) Retrieving modified Match Result info
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Match'
 *              description: Finished Match
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

// Set results
router.put(
  '/:matchId/results',
  [validateAdmin, validateSetResults],
  setResults
);

/**
 * @openapi
 * /tournament/{tournamentId}/match/{matchId}:
 *   delete:
 *    tags:
 *    - tournament and matches
 *    summary: Delete an existing match
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: tournamentId
 *      in: path
 *      description: id of the tournament
 *      required: true
 *      schema:
 *        type: string
 *    - name: matchId
 *      in: path
 *      description: id of the match you want to delete
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      204:
 *        description: (OK)
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

// Delete a match
router.delete('/:matchId', [validateAdmin, validateMatchId], deleteMatch);

module.exports = router;
