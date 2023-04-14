import createError from 'http-errors'

/**
 * Controller for the oauth.
 */
export default class OauthController {
  /**
   * Handles the gitlab callback.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async handleCallback (req, res, next) {
  }

  /**
   * Gets the user information.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async getUser (req, res, next) {

  }

  /**
   * Gets the user information.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async redirectToProfile (req, res, next) {

  }
}
