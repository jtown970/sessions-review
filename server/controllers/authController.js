const bcrypt = require('bcryptjs')
const users = require('../data/dummyUsers.json')

module.exports = {
  seed: async (req, res) => {
    const db = req.app.get('db')

    try {
      await db.seed()

      const dbReadyUsers = users.map((user) => {
        const { email, role_id, password } = user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(user.password, salt)

        return { email, role_id: role_id, hash }
      })

      await db.users.insert(dbReadyUsers)

      res.status(200).send('DB Seeded')
    } catch (error) {
      res.status(500).send(error)
    }
  },
}
