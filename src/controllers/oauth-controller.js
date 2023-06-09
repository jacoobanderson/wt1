import createError from 'http-errors'
import fetch from 'node-fetch'

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
      if (req.session.state !== req.query.state) return next(createError(403))

      const urlOptions = {
        client_id: process.env.GITLAB_APPLICATION_ID,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.GITLAB_CALLBACK_URL,
        client_secret: process.env.GITLAB_SECRET
      }

      const gitlabTokenUrl =
        process.env.GITLAB_TOKEN_URL +
        new URLSearchParams(urlOptions).toString()

      const response = await fetch(gitlabTokenUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      req.session.auth = await response.json()
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
      const accessToken = req.session.auth.access_token
      const gitlabUserApiUrl =
        'https://gitlab.lnu.se/api/v4/user?access_token=' + accessToken
      const res = await fetch(gitlabUserApiUrl)

      if (res.status !== 200) return next(createError(403))

      const response = await res.json()

      req.session.user = {
        id: response.id,
        username: response.username,
        name: response.name,
        email: response.email,
        avatar: response.avatar_url,
        last_activity: response.last_activity_on
      }
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
    res.redirect('/user/profile')
  }

  /**
   * Redirects the user to the profile.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async refresh (req, res, next) {
    try {
      const urlOptions = {
        client_id: process.env.GITLAB_APPLICATION_ID,
        refresh_token: req.session.auth.refresh_token,
        grant_type: 'refresh_token',
        redirect_uri: process.env.GITLAB_CALLBACK_URL,
        client_secret: process.env.GITLAB_SECRET
      }

      const gitlabTokenUrl =
            process.env.GITLAB_TOKEN_URL +
            new URLSearchParams(urlOptions).toString()

      const response = await fetch(gitlabTokenUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      req.session.auth = await response.json()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Revokes the token.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async revoke (req, res, next) {
    try {
      const urlOptions = {
        client_id: process.env.GITLAB_APPLICATION_ID,
        client_secret: process.env.GITLAB_SECRET,
        token: req.session.auth.access_token
      }

      const gitlabTokenUrl =
                process.env.GITLAB_REVOKE_URL +
                new URLSearchParams(urlOptions).toString()

      await fetch(gitlabTokenUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      req.session.destroy((error) => {
        if (error) return next(error)
        res.redirect('/')
      })
    } catch (error) {
      next(error)
    }
  }
}
