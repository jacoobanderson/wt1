import createError from 'http-errors'

/**
 * Controller for homepage.
 */
export default class UserController {
  /**
   * Renders the user's profile.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async renderUserProfile (req, res, next) {
    const user = req.session.user
    res.render('pages/profile', { user })
  }
}
