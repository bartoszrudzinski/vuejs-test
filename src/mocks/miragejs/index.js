import { belongsTo, createServer, hasMany, Model } from 'miragejs'
import { AppSerializer } from '@/mocks/miragejs/serializer'
import { wrongInputDataError } from '@/mocks/miragejs/error'

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    serializers: {
      application: AppSerializer
    },

    models: {
      user: Model.extend({
        cars: hasMany()
      }),
      car: Model.extend({
        user: belongsTo()
      })
    },

    seeds(server) {
      server.create('user', {
        name: 'Bob',
        cars: [server.create('car', { make: 'Fiat', model: 'Panda', year: 2005, color: 'red' })]
      })
      server.create('user', {
        name: 'Alice',
        cars: [
          server.create('car', { make: 'Ford', model: 'Focus', year: 2014, color: 'white' }),
          server.create('car', { make: 'Ford', model: 'Mustang', year: 1969, color: 'red-white' }),
          server.create('car', { make: 'Citroen', model: 'Jumper', year: 2018, color: 'gray' })
        ]
      })
      server.create('user', {
        name: 'John',
        cars: [
          server.create('car', { make: 'BMW', model: '5', year: 2023, color: 'black' }),
          server.create('car', { make: 'BMW', model: '3', year: 2020, color: 'black' })
        ]
      })
    },

    routes() {
      this.namespace = 'api'

      this.get('users', (schema) => {
        return schema.users.all()
      })

      this.get('users/:id', (schema, request) => {
        return schema.users.find(request.params.id)
      })

      this.get('cars', (schema) => {
        return schema.cars.all()
      })

      this.post('/cars', (schema, request) => {
        const userData = JSON.parse(request.requestBody)

        const requiredKeys = ['make', 'model', 'year', 'color', 'user']
        const userDataKeys = Object.keys(userData)
        if (!requiredKeys.every((key) => userDataKeys.includes(key))) {
          return wrongInputDataError(
            `Some of the attributes are missing. Required attributes: ${requiredKeys.join(', ')}.`
          )
        }

        if (requiredKeys.some((key) => !userData[key])) {
          return wrongInputDataError('Values cannot be empty.')
        }

        const user = userData.user && schema.users.find(userData.user)
        if (!user) {
          return wrongInputDataError('"user" attribute value must be a valid user id.')
        }

        return schema.cars.create({
          make: userData.make,
          model: userData.model,
          year: userData.year,
          color: userData.color,
          user
        })
      })

      this.get('cars/:id', (schema, request) => {
        return schema.cars.find(request.params.id)
      })

      this.put('/cars', (schema, request) => {
        const userData = JSON.parse(request.requestBody)
        const requiredKeys = ['make', 'model', 'year', 'color', 'user']

        if (requiredKeys.some((key) => Object.hasOwn(userData, key) && !userData[key])) {
          return wrongInputDataError('Values cannot be empty.')
        }

        const user = userData.user && schema.users.find(userData.user)
        if (Object.hasOwn(userData, 'user') && !user) {
          return wrongInputDataError('"user" attribute value must be a valid user id.')
        }

        const carModel = schema.cars.find(userData.id)
        const updateData = {
          make: userData.make,
          model: userData.model,
          year: userData.year,
          color: userData.color,
          userId: userData.user
        }

        return carModel.update(updateData)
      })
    }
  })
}
