import fetch from 'node-fetch'
  /**
   * Gets the groups.
   *
   * @param {number} groupsPerPage The amount of groups per page.
   * @param {string} accessToken The access token.
   */
  export const getGroups = async (groupsPerPage, accessToken) => {
    const gitlabGroupApiUrl =
        'https://gitlab.lnu.se/api/v4/groups' + '?access_token=' + accessToken + '&per_page=' + groupsPerPage
    const response = await fetch(gitlabGroupApiUrl)
    return await response.json()
  }

  /**
   * Gets the subgroups.
   *
   * @param {number} groupsPerPage The amount of groups per page.
   * @param {string} accessToken The access token.
   */
    export const getSubGroups = async (id, groupsPerPage, accessToken) => {
        const gitlabGroupApiUrl =
            'https://gitlab.lnu.se/api/v4/groups' + '?access_token=' + accessToken + '&per_page=' + groupsPerPage
        const response = await fetch(gitlabGroupApiUrl)
        return await response.json()
    }