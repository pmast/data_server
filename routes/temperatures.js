var express = require('express');
var router = express.Router();
var redis = require("redis"),
	client = redis.createClient();

/* GET users listing. */
router.get('/', function(req, res) {
	client.smembers("temperatures:ids", function(err, data){
		console.log(err);
		res.json(JSON.parse(data));
	});
});

router.post('/:id', function(req, res) {
	var id = req.params.id;
	client.sadd("temperatures:ids", id, redis.print);
	client.set("temperatures:"+id, JSON.stringify(req.body));
	res.end();
});

router.get('/:id', function(req, res) {
	var id = req.params.id;
	client.get("temperatures:"+id, function(err, data){
		res.json(JSON.parse(data));
	});
});



module.exports = router;
