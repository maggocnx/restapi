module.exports = function(app, db){

	app.param('collectionName', function(req, res, next, collectionName){
	  req.collection = db.collection(collectionName)
	  return next()
	})

	app.get('/collections/:collectionName', function(req, res) {

	var sort = 'date', dir = 1, limit = 10;
	  req.collection.find({},{ sort: [['_id',-1]]}).toArray(function(e, results){
		if (e) 
			res.send(500, e)
		else
			res.send(results)
	  })
	})

	app.post('/collections/:collectionName', function(req, res) {
	  req.collection.insert(req.body, {}, function(e, results){
		if (e) 
			res.send(500, e)
		else
			res.send(results)
	  })
	})

	app.get('/collections/:collectionName/:id', function(req, res) {
	  req.collection.findOne({_id: ObjectID(req.params.id)}, function(e, result){
		if (e) 
			res.send(500, e)
		else
			res.send(results)
	  })
	})

	app.put('/collections/:collectionName/:id', function(req, res) {
		delete req.body._id;
	  req.collection.update({_id: ObjectID(req.params.id)}, {$set:req.body}, {safe:true, multi:false}, function(e, result){
		if (e) 
			res.send(500, e)
		else
		res.send((result===1)?{msg:'success'}:{msg:'error'})
	  })
	})

	app.del('/collections/:collectionName/:id', function(req, res) {
	  req.collection.remove({_id: ObjectID(req.params.id)}, function(e, result){
	  	console.log("DELL" , e, result)
		if (e) 
			res.send(500, e)
		else
			res.send((result===1)?{msg:'success'}:{msg:'error'})
	  })
	})
}
