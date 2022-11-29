const express = require('express');

const router = express.Router();
const {
  getAllTeams,
  getTeam,
  postTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamsController');

const { validateAdmin, validateLoggedUser } = require('../middlewares/auth');
const { validateMongoId } = require('../validators/mongoValidator');
const {
  validateCreate,
  validateUpdate,
} = require('../validators/teamValidator');

/**
 * @openapi
 * /teams:
 *  post:
 *    tags:
 *    - teams
 *    summary: add a team in the database (only admin)
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Team'
 *      required: true
 *    responses:
 *      201:
 *        description: (OK) the team was added successfully to the database
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Team'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.post('/', [validateAdmin, validateCreate], postTeam);

/**
 * @openapi
 * /teams:
 *  get:
 *    tags:
 *    - teams
 *    summary: get all teams in the database (only admin)
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    responses:
 *      201:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              description: array with all the teams
 *              items:
 *                $ref: '#/components/schemas/Team'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/', [validateAdmin], getAllTeams);

/**
 * @openapi
 * /teams/{teamId}:
 *  get:
 *    tags:
 *    - teams
 *    summary: get a team
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: teamId
 *      in: path
 *      description: id of the team you want to get
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Team'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/:id', [validateLoggedUser, validateMongoId], getTeam);

/**
 * @openapi
 * /teams/{teamId}:
 *  put:
 *    tags:
 *    - teams
 *    summary: edit a team (only admin)
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: teamId
 *      in: path
 *      description: id of the team you want to edit
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Team'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.put('/:id', [validateAdmin, validateUpdate], updateTeam);

/**
 * @openapi
 * /teams/{teamId}:
 *  delete:
 *    tags:
 *    - teams
 *    summary: delete a team (only admin)
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: teamId
 *      in: path
 *      description: id of the team you want to delete
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: (OK) Successfully removed
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', [validateAdmin, validateMongoId], deleteTeam);

module.exports = router;
