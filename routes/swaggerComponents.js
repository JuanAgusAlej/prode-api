/**
 * @openapi
 *  components:
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
 */
