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

  models.grocery_store.findAll({ where: {id: storeId}, include: [
    {model: models.grocery_item, as: 'items'},
    {model: models.aisle, as: 'aisles'}
  ]}).then(function(results){
    

    var theStore = results[0]

    // first, populate parsedAisles var with an object that looks like 
    //  {
    //      id: * the aisle id *
    //      aisle_number: * the aisle number *
    //      items: [] * the array that you will push items of this aisle to *
    //  }



  
    var parsedItems = theStore.dataValues.items
    var storeAisles = theStore.dataValues.aisles
    var parsedAisles = []
    theStore.parsedItems = parsedItems
    theStore.parsedAisles = parsedAisles

    

    // loop over items, check the aisle_id of the item, look in the array of aisles for the aisle that has an id equal
    // to the aisle_id of the item, if it does, push the item into that aisle object, in the array under the items key

    for(var i in storeAisles){
   
      var parsedAisle = storeAisles[i].dataValues

      var itemsOfAisle = []


      for (var j = 0; j < parsedItems.length; j++) {
        let theItem = parsedItems[j].dataValues

        console.log(parsedAisle.id, theItem)

        if(parsedAisle.id === theItem.aisle_id){
          itemsOfAisle.push(theItem)
        }
      
      }




      parsedAisles.push({
        id: parsedAisle.id,
        store_id: parsedAisle.store_id,
        aisle_number: parsedAisle.number,
        items: itemsOfAisle
      })



    }

    console.log(parsedAisles)
    





    // for (i = 0; i < theStore.length; i++) {
    //   if (parsedAisles.includes(theStore[i])) {
    //       continue
    //   } else {
    //       parsedAisles.push(theStore[i])
    //   }
    // }

    theStore.aislesArray = parsedAisles
  
    res.render('store',{theStore: theStore})

  })
})

app.post('/add-item/:storeid', function(req,res){
  let storeID = parseInt(req.params.storeid)
  var aisleId = parseInt(req.body.aisle)
  let item = req.body.item
  let qty = req.body.qty
  const grocery_item =  models.grocery_item.build({
    store:storeID,
    aisle_id: aisleId,
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
