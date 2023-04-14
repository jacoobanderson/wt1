import createError from 'http-errors'
import { nanoid } from 'nanoid'
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
      return res.render('pages/home', { viewData: { gitlab_redirect_url: req.session.gitlab_url } })
    //   { gitlab_redirect_url: req.session.gitlabUrl }
    //   }
    } catch (err) {
      next(createError(500, err.message))
    }
  }

  /**
   * Creates the gitlab url that is used to login and sends it to the view.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async createGitlabUrl (req, res, next) {
    const generatedState = nanoid()
    req.session.state = generatedState

    try {
      const urlOptions = {
        client_id: process.env.GITLAB_APPLICATION_ID,
        redirect_uri: process.env.GITLAB_CALLBACK_URL,
        response_type: 'code',
        state: generatedState,
        scope: 'read_api openid'
      }
      const gitlabUrl = process.env.GITLAB_OAUTH_URL + new URLSearchParams(urlOptions).toString()
      req.session.gitlab_url = gitlabUrl
    } catch (error) {
      next(error)
    }
    next()
  }
}
