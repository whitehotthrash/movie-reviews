import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

async function main(){
  dotenv.config()

  const client = new mongodb.MongoClient(
    process.env.DATABASE_URI
  )
  const port = process.env.PORT || 8000

  try {
    // connect to mongo cluster
    await client.connect()
    await MoviesDAO.injectDB(client)

    app.listen(port, () =>{
      console.log('server is running on port: '+ port);
    })
  } catch (e) {
    console.error("Error has happened: " + e);
    process.exit(1)
  }
}

main().catch(console.error);