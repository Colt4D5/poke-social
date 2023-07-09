import { MongoClient } from "mongodb"
import { MONGO_URL } from '$env/static/private'

const client = new MongoClient(MONGO_URL)

export const start_mongo = () => {
  console.log('Starting mongo...')
  return client.connect()
}

export default client.db('pokemon_tcg');
