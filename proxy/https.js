const express = require('express')
const app = express()
const port = 3002

app.use((request, response, next) => {
  return response.redirect("https://" + request.headers.host + request.url);
})

app.listen(port, () => {
  console.log(`Http->https proxy listening at http://localhost:${port}`)
})

