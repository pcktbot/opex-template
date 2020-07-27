require('dotenv').config()
const models = require('../../../server/models')
const hooks = require('../../../server/models/hooks')

describe('Models Index', () => {
  test('Sequelize Class Exists', () => {
    expect(models).toHaveProperty('Sequelize')
  })
  test('Sequelize Instance Exists', () => {
    expect(models).toHaveProperty('sequelize')
  })
  test('Feedback Model Exists', () => {
    expect(models).toHaveProperty('feedback')
  })
  test('Model Hooks Added', () => {
    expect(models.feedback.options.hooks).toHaveProperty('afterCreate')
  })
})
