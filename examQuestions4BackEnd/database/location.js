/**
 * Created by kaspe on 2017-01-07.
 */
var mongoose = require('mongoose');
let float = require("mongoose-float").loadType(mongoose);
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    lat: {type: float, required: true},
    lng: {type: float, required: true},
    desc: {type: String, required: true}
});

let Location = mongoose.model("Location", locationSchema);

module.exports = Location;