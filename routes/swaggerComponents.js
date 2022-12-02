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
 *    Team:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: id of the team
 *        name:
 *          type: string
 *          description: name of the team
 *        country:
 *          type: string
 *          description: name of the country
 *        logo:
 *          type: string
 *          description: photo of the flag
 *        shortName:
 *          type: string
 *          description: Abbreviation of the team name
 *    CreateMatch:
 *      type: object
 *      properties:
 *        date:
 *          type: string
 *          description: date of the match
 *        teamAId:
 *          type: string
 *          description: team A id
 *        teamBId:
 *          type: string
 *          description: team B id
 *        instance:
 *          type: string
 *          description: instance of the match
 *    SetMatchScore:
 *      type: object
 *      properties:
 *        goalsA:
 *          type: integer
 *          description: goals of team A
 *        goalsB:
 *          type: integer
 *          description: goals of team B
 *    Match:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: id of the match
 *        date:
 *          type: string
 *          description: date of the match
 *        teamAId:
 *          $ref: '#/components/schemas/Team'
 *          description: team A Data
 *        goalsA:
 *          type: integer
 *          description: goals of team A
 *        teamBId:
 *          $ref: '#/components/schemas/Team'
 *          description: team B Data
 *        goalsB:
 *          type: integer
 *          description: goals of team B
 *        result:
 *          type: string
 *          description: result of the match
 *        predictionsId:
 *          type: array
 *          description: predictions of the match
 *          items:
 *            $ref: '#/components/schemas/Prediction'
 *        instance:
 *          type: string
 *          description: instance of the match
 *    Tournament:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: name of the tournament
 *        matchesId:
 *          type: object
 *          description: matchesData
 *        teamsId:
 *          type: object
 *          description: teamsData
 *        predictionResultPoints:
 *          type: integer
 *          description: points of the prediction
 *        predictionGoalsPoints:
 *          type: integer
 *          description: goals of the prediction
 *        prizes:
 *          type: array
 *          description: name of the tournament
 *        region:
 *          type: string
 *          description: name of the tournament
 *        finished:
 *          type: boolean
 *          description: name of the tournament
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
 *    BodyUser:
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
 *            predictions:
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
 *            predictions:
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
 *    ResponseUserAdmin:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        alias:
 *          type: string
 *        uid:
 *          type: string
 *        email:
 *          type: string
 *        region:
 *          type: string
 *        timezone:
 *          type: string
 *        role:
 *          type: string
 *        state:
 *          type: boolean
 *        avatar:
 *          type: string
 *        pushTokens:
 *          type: array
 *          items:
 *            type: string
 *        predictionsId:
 *          type: array
 *          items:
 *            type: string
 *        validated:
 *          type: boolean
 *        settings:
  *         type: string
 *    BodySettings:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *          description: user id belongs this settings
 *        push:
 *          type: boolean
 *          description: indicates if the user allow notification through push
 *        email:
 *          type: boolean
 *          description: indicates if the user allow notification through email
 *        language:
 *          type: string
 *          description: language automatically set by the region or manually by the user
 *    Prediction:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *          description: user id owner of the prediction
 *        matchId:
 *          type: string
 *          description: match id of the prediction
 *        goalsA:
 *          type: integer
 *          description: goals of the local team
 *        goalsB:
 *          type: integer
 *          description: goals of the visitor team
 *        pick:
 *          type: string
 *          enum: [WON_A, WON_B, DRAW]
 *        state:
 *          type: boolean
 *          description: indicates if the prediction was seccessfully
 *        points:
 *          type: integer
 *          description: indicates the amount of points that will receive the user
 *        _id:
 *          type: string
 *          description: autogenerated prediction id
 *    Metrics:
 *      type: object
 *      properties:
 *        total:
 *          type: object
 *          properties:
 *            users:
 *              type: object
 *              properties:
 *                total:
 *                  type: number
 *                active:
 *                  type: number
 *                blocked:
 *                  type: number
 *                activeToday:
 *                  type: number
 *                activeYesterday:
 *                  type: number
 *            tournaments:
 *              type: object
 *              properties:
 *                total:
 *                  type: number
 *                active:
 *                  type: number
 *                finished:
 *                  type: number
 *            matches:
 *              type: object
 *              properties:
 *                total:
 *                  type: number
 *                active:
 *                  type: number
 *                finished:
 *                  type: number
 *            predictions:
 *              type: object
 *              properties:
 *                total:
 *                  type: number
 *                pending:
 *                  type: number
 *                won:
 *                  type: number
 *                loss:
 *                  type: number
 *            notifications:
 *              type: object
 *              properties:
 *                total:
 *                  type: number
 *                push:
 *                  type: number
 *                email:
 *                  type: number
 *        kpi:
 *          type: object
 *          properties:
 *            pageviewsPerUser:
 *              type: string
 *            pushNotificationsPerUser:
 *              type: string
 *            emailNotificationsPerUser:
 *              type: string
 *            predictionsPerUser:
 *              type: string
 *            userPermanence:
 *              type: string
 *            predictionsWinRate:
 *              type: string
 */
