/**
 * @openapi
 *  components:
 *  responses:
 *    Unauthorized:
 *      description: (Unauthorized) you are not authorized to access the service
 *    NotFound:
 *      description: (NotFound) information was not found
 *    BadRequest:
 *      description: (BadRequest) the data sent is incorrect or there is required data not sent
 *    ServerError:
 *      description: (ServerError) error in the server
 *  parameters:
 *    token:
 *      name: token
 *      in: header
 *      description: Authentication token
 *      required: true
 *      schema:
 *        type: string
 *  schemas:
 *    BodyUserSignup:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: firstname and lastname
 *        alias:
 *          type: string
 *          description: an alias to identify the user in the app
 *        uid:
 *          type: string
 *          description: id from google SSO
 *        email:
 *          type: string
 *          description: the email from google SSO
 *        avatar:
 *          type: string
 *          description: pathfile of an image
 *        region:
 *          type: string
 *          enum: [AR, BR, US]
 *          description: region of the user obtained automatically from geolocation
 *        timezone:
 *          type: string
 *          description: timezone obtained automatically by the region
 *    BodyUserLogin:
 *      type: object
 *      properties:
 *        user:
 *          type: object
 *          description: userData
 *          properties:
 *            id:
 *              type: string
 *              description: id of the user in the database
 *            name:
 *              type: string
 *              description: firstname and lastname
 *            alias:
 *              type: string
 *              description: an alias to identify the user in the app
 *            uid:
 *              type: string
 *              description: id from google SSO
 *            points:
 *              type: integer
 *              description: points of the user account
 *            email:
 *              type: string
 *              description: the email from google SSO
 *            avatar:
 *              type: string
 *              description: pathfile of an image
 *            region:
 *              type: string
 *              enum: [AR, BR, US]
 *              description: region of the user obtained automatically from geolocation
 *            timezone:
 *              type: string
 *              description: timezone obtained automatically by the region
 *            language:
 *              type: string
 *              description: language automatically set by the region or manually by the user
 *            role:
 *              type: string
 *              description: user account role, automatically seted to USER_ROLE
 *            state:
 *              type: boolean
 *              description: user account state, indicates if the account is active or not
 *            validated:
 *              type: boolean
 *              description: indicates if the account is validated or not
 *            predictionsId:
 *              type: array
 *              description: array with all the predictions made by the user
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: autogenerate id
 *                  userId:
 *                    type: string
 *                    description: user id who made the prediction
 *                  matchId:
 *                    type: string
 *                    description: match id where the prediction was made
 *                  goalsA:
 *                    type: integer
 *                    description: goals of team A
 *                  goalsB:
 *                    type: integer
 *                    description: goals of team B
 *                  state:
 *                    type: boolean
 *                    description: indicates if user guessed the prediction
 *                  points:
 *                    type: integer
 *                    description: indicates how much points will receive the user
 *                  pick:
 *                    type: string
 *                    description: team picked by the user
 *            notifications:
 *              type: object
 *              description: configuration of the notifications selected by the user
 *              properties:
 *                email:
 *                  type: boolean
 *                  description: indicates if the user allow notification through email
 *                push:
 *                  type: boolean
 *                  description: indicates if the user allow notification through push
 *        token:
 *          type: string
 *          description: Authentication token
 */
