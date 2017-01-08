/**
 * Created by kaspe on 2017-01-07.
 */
let Location = require("./location");
let mongoose = require("mongoose");
let dbConnectionString = "mongodb://127.0.0.1:27017";

let saveCoordinate = function (lat, lng, desc)
{
    mongoose.connect(dbConnectionString);
    let coord = new Location
    ({
        lat: lat,
        lng: lng,
        desc: desc
    });

    coord.save(function (err)
    {
        if (err)
        {
            console.log("fejl i save coordinate: " + err)
            mongoose.disconnect();
        }
        else
        {
            console.log("koordinatet gemt!");
            mongoose.disconnect();
        }

    })
};


let getAllCoordinates = function (callback)
{
    mongoose.connect(dbConnectionString);
    Location.find({}, function (err, docs)
    {

        if (err)
        {
            console.log("fejl i getAllCoordinates: " + err);
            mongoose.disconnect();
        }
        else
        {
            mongoose.disconnect();
            callback(docs);
        }
    });
};

module.exports =
    {
        saveCoordinate: saveCoordinate,
        getAllCoordinates: getAllCoordinates
    };