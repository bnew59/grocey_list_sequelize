const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()
// import the pg-promise library which is used to connect and execute SQL on a postgres database
const pgp = require('pg-promise')()
// connection string which is used to specify the location of the database
const connectionString = "postgres://localhost:5432/grocery_list"
// creating a new database object which will allow us to interact with the database
const db = pgp(connectionString)
const models = require('./models')

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')





app.get('/',function(req, res){

  models.grocery_store.findAll({ include: [{model: models.grocery_item, as: 'items'}]}).then(function(stores){
    


    var storesWithItems = []

    stores.forEach(function(store, i){
      var theStore = store
      var storeItems = store.dataValues.items
      theStore.parsedItems = storeItems
      storesWithItems.push(theStore)
    })
    
    res.render('index',{stores: storesWithItems})

  })
})

app.post('/',function(req,res){
  let store = req.body.store
  let city = req.body.city

  const grocery_stores=  models.grocery_store.build({
      store:store,
      city:city
          })
      grocery_stores.save().then(function(newgrocerylist){
        var newStoreId = newgrocerylist.dataValues.id
        res.redirect(`/store/${newStoreId}`)
      })
})
 

app.get('/store/:id',function(req, res){

  var storeId = req.params.id

  models.grocery_store.findAll({ where: {id: storeId}, include: [{model: models.grocery_item, as: 'items'}]}).then(function(results){
    

    var theStore = results[0]
    var storeItems = theStore.dataValues.items
    theStore.parsedItems = storeItems
    res.render('store',{theStore: theStore})

  })
})

app.post('/add-item/:storeid', function(req,res){
  let storeID = req.params.storeid
  let item = req.body.item
  let qty = req.body.qty
  const grocery_item =  models.grocery_item.build({
    store:storeID,
    item:item,
    qty:qty
        })
    grocery_item.save().then(function(newgrocerylist){
    res.redirect(`/store/${storeID}`)
    })
  
})


app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
})
