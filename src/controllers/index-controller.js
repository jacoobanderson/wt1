import createError from 'http-errors'
/**
 * Controller for homepage.
 */
export default class IndexController {
  /**
   * Checks if there is an user and if not renders the homepage with the gitlab url to login.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async showHomePage (req, res, next) {
    try {
    //   if (req.session.user) {
    //     // res.redirect()
    //   } else {
      return res.render('pages/home', { viewData: { gitlab_redirect_url: 'gitlab.com' } })
    //   { gitlab_redirect_url: req.session.gitlabUrl }
    //   }
    } catch (err) {
      next(createError(500, err.message))
    }
  }
}
