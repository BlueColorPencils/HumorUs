const rootUrl = 'https://localhost:3000'
const apiKey = ''
module.exports = {
  get () {
    return fetch(rootUrl, {
      headers: {
        'Authorization': 'Client-ID ' + apiKey
      }
    })
    .then((response) => {
      return response.json()
    })
  }
}
