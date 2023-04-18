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

  // Gets the latest commit and adds to the project
  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].length; j++) {
      const gitlabProjectCommits =
        'https://gitlab.lnu.se/api/v4/projects/' + projects[i][j].id + '/repository/commits' + '?access_token=' + accessToken + '&per_page=1'
      const response = await fetch(gitlabProjectCommits)
      projects[i][j].commit = await response.json()
    }
  }
  return projects
}
