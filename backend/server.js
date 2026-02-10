import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'

const app = express()

app.use(cors(
//   {
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type']
// }
))
app.use(express.json())

app.use("/api/v1/movies", movies)
app.use('/./', (request, response) => { // using regex because wildcard * was invalid
  response.status(404).json({error: "not found"})
})

export default app