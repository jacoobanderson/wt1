import createError from 'http-errors'
import fetch from 'node-fetch'

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

  /**
   * Renders the activities.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async renderActivities (req, res, next) {
    try {
      const perPage = 50
      const amountOfActivities = 101
      const amountOfFetches = Math.ceil(amountOfActivities / perPage)
      const accessToken = req.session.auth.access_token
      const activities = []
      let activityCount = 0

      for (let i = 0; i < amountOfFetches; i++) {
        const gitlabUserApiUrl =
                  'https://gitlab.lnu.se/api/v4/users/' + req.session.user.id + '/events' + '?access_token=' + accessToken + '&per_page=' + perPage + '&page=' + (i + 1)
        const res = await fetch(gitlabUserApiUrl)

        const response = await res.json()

        for (let j = 0; activityCount < amountOfActivities && j < response.length; j++) {
          activities.push({
            action_name: response[j].action_name,
            target_type: response[j].target_type,
            target_title: response[j].target_title,
            created_at: response[j].created_at
          })
          activityCount++
        }
      }
    } catch (error) {
      next(error)
    }
    next()
  }
}
