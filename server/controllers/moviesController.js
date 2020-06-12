module.exports = {
  getAllMovies: (req, res) => {
    const db = req.app.get('db')
    db.movies.find().then((movies) => res.status(200).send(movies))
  },
  getMovieById: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.movies.find({ id }).then((movie) => res.status(200).send(movie[0]))
  },
  addMovie: (req, res) => {
    const db = req.app.get('db')
    db.movies.insert(req.body).then(() => res.status(200).send('Movie added'))
  },
  deleteMovie: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.movies.destroy({ id }).then(() => res.status(200).send('Movie deleted'))
  },
}
