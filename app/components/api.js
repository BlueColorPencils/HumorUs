const rootUrl = 'https://localhost:3000'
const apiKey = 'b6273a59708a717'
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
