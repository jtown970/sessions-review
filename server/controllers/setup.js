const bcrypt = require('bcryptjs')
const users = require('../data/dummyUsers.json')
const movies = require('../data/movies.json')
const cars = require('../data/cars.json')

module.exports = {
  seed: async (req, res) => {
    const { confirm } = req.query

    if (!confirm) {
      res.status(400).send('Could not seed db')
    }

    const db = req.app.get('db')

    try {
      await db.seed()

      const dbReadyUsers = users.map((user) => {
        const { email, role_id, password } = user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        return { email, role_id: role_id, hash }
      })

      await db.users.insert(dbReadyUsers)
      await db.movies.insert(movies)
      await db.cars.insert(cars)

      res.status(200).send('DB Seeded')
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
}
