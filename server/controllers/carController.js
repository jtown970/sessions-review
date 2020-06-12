module.exports = {
  getAllCars: (req, res) => {
    const db = req.app.get('db')
    db.cars.find().then((cars) => res.status(200).send(cars))
  },
  getCarById: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.cars.find({ id }).then((car) => res.status(200).send(car[0]))
  },
  addCar: (req, res) => {
    const db = req.app.get('db')
    db.cars.insert(req.body).then(() => res.status(200).send('Car added'))
  },
  deleteCar: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.cars.destroy({ id }).then(() => res.status(200).send('Car deleted'))
  },
}
