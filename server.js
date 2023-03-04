const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})
app.get('/shop', function (request, response) {
  response.render('pages/shop', { title: 'Shop' })
})
app.get('/spaceStation', function (request, response) {
  response.render('pages/spaceStation', { title: 'SpaceStation' })
})
app.get('/planet', function (request, response) {
  response.render('pages/planet', { title: 'Planet' })
})
app.get('/spaceStation_on_orbit', function (request, response) {
  response.render('pages/spaceStation_on_orbit', { title: 'SpaceStation_on_orbit' })
})
app.get('/delivered_cargo_to_station', function (request, response) {
  response.render('pages/delivered_cargo_to_station', { title: 'Delivered_cargo_to_station' })
})
app.get('/delivered_cargo_to_planet', function (request, response) {
  response.render('pages/delivered_cargo_to_planet', { title: 'Delivered_cargo_to_planet' })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 8080)