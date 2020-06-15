module.exports = {
  getAllMovies: async (req, res) => {
    const db = req.app.get('db')
    const {rating, year} = req.query

    const movies = await db.movies.find()


    if(rating){
      const filteredMovies = movies.filter(movie => {
        return movie.rating > +rating
      })
      res.status(200).send(filteredMovies)
    }else {

      res.status(200).send(movies)
    }

    // const filteredMovies = movies.filter(movie => {
    //   let include = false
    //   for(let key in req.query){
    //     if(movie[key] > +req.query[key]){
    //       include = true
    //     }
    //   }
    //   return include
    // })
    // res.status(200).send(filteredMovies) playing around in class not working

  },
  getMovieById: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    const [movie] = await db.movies.find({id})

    if(movie){
      res.status(200).send(movie)
    } else {
      res.status(404).send('movie not found')
    }
  },

  addMovie: async (req, res) => {
    const db = req.app.get('db')

    const {title, rating, year} = req.body

    const newMovie = await db.movies.insert({title, rating, year})

    res.status(200).send(newMovie)
  },

  deleteMovie: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    await db.movies.destroy({id})
    res.status(200).send('deleted movie')

  },
}
