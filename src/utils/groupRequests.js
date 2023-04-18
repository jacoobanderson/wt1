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
 * Gets the projects of both subgroups and groups.
 *
 * @param {Array} groups The array of groups.
 * @param {string} accessToken The access token.
 */
export const getProjects = async (groups, accessToken) => {
  const projects = []
  for (let i = 0; i < groups.length; i++) {
    const gitlabGroupApiUrl =
        'https://gitlab.lnu.se/api/v4/groups/' + groups[i].id + '/projects' + '?access_token=' + accessToken + '&include_subgroups=true'
    const response = await fetch(gitlabGroupApiUrl)
    projects.push(await response.json())
  }
//   console.log(projects)
//   console.log('LENGTHHHH OF PROJECTS' + ' ' + projects.length)
//   console.log('LENGTH ' + projects[0][0].id)
//   console.log('LENGTH ' + projects[1][0].id)
//   console.log('LENGTH ' + projects[2][0])

  return projects
}
