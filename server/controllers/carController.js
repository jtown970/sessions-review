module.exports = {
  getAllCars: async (req, res) => {
    const db = req.app.get('db')

    try{
      const cars = await db.get_all_cars()
  
      res.status(200).send(cars)

    } catch (err) {
      console.log(err)
      res.status(500).send('could not retruve cars')
    }

  },

  getCarById: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    const car = await db.get_car_by_id([id])

    if(car[0]){
      res.status(200).send(car[0])

    } else {
      res.status(404).send('could not find car')
    }

  },

  addCar: async (req, res) => {
    const db = req.app.get('db')
    const {make, model, year, miles, color} = req.body

    const newCar = await db.create_car({make, model, year, miles, color}) // need to {} because of   sql set up

    res.status(200).send(newCar[0])
  },
  deleteCar: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    try{
      await db.delete_car_by_id([id])
      res.status(200).send('car deleted')
    } catch {
      res.status(500).send('could not delete car')
    }
  },
}
