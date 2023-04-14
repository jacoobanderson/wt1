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
    try {
        console.log('tesetsetsetsetsetstststsset')
    } catch (error) {
        next(error)
    }
    next()
  }

  /**
   * Gets the user information.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async getUser (req, res, next) {
    try {
        console.log('UUUUSER')
    } catch (error) {
        next(error)
    }
    next()
  }

  /**
   * Redirects the user to the profile.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async redirectToProfile (req, res, next) {
    console.log('REEEEEENDER')
    res.redirect('/user/profile')
  }
}
