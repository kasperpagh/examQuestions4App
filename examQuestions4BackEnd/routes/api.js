var express = require('express');
var router = express.Router();
let facade = require("../database/facade");

/* GET api listing. */
router.post('/save', function (req, res, next)
{
    console.log("her er body: " + req.body.lat + req.body.lng + req.body.desc)
    facade.saveCoordinate(req.body.lat, req.body.lng, req.body.desc);
    res.status(200).send();
});

router.get("/get", function(req,res,next)
{
   facade.getAllCoordinates(function(docs)
   {
       res.status(200).end(JSON.stringify(docs));
   }) ;
});

module.exports = router;
