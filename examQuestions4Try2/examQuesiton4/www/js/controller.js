/**
 * Created by kaspe on 2017-01-07.
 */
angular.module('starter.controllers', ['ionic', 'ngCordova']).controller('MapCtrl', ['$scope', '$http', '$cordovaGeolocation', function ($scope, $http, $cordovaGeolocation)
{

  $scope.track = function ()
  {
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position)
      {
        var lat = position.coords.latitude
        var long = position.coords.longitude
        myLatlng = new google.maps.LatLng(lat, long);
        console.log("her fra ctrl: " + lat + long)
        marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          label: "DU ER HER LIGE NU!",
          draggable: false
        });

      }, function (err)
      {
        // error
      });
  };

  $scope.user = {};
  $scope.saveDetails = function ()
  {
    var lat = $scope.user.latitude;
    var lng = $scope.user.longitude;
    var desc = $scope.user.desc;


    var jsonData =
      {
        lat: lat,
        lng: lng,
        desc: desc
      };
    console.log("i gem, her er json data: " + jsonData.lat + jsonData.lng + jsonData.desc)
    $http.post("http://82.211.198.31:3000/api/save", JSON.stringify(jsonData))
      .success(function (data, status, headers, config)
      {
        console.log("yay gemt!");
        $http.get("http://82.211.198.31:3000/api/get")
          .success(function (data, status, headers, config)
          {
            console.log("yay fundet her er data: " + data.length);
            for (i = 0; i < data.length; i++)
            {
              myLatlng = new google.maps.LatLng(data[i].lat, data[i].lng);
              marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                label: data[i].desc,
                draggable: false
              });
            }
          })
          .error(function (data, status, header, config)
          {
            console.log("ikke fundet!!");
          });
      })
      .error(function (data, status, header, config)
      {
        console.log("ikke gemt!");
      });

    $scope.populate = function (callback)
    {
      $http.get("http://82.211.198.31:3000/api/get")
        .success(function (data, status, headers, config)
        {
          console.log("yay fundet her er data: " + data);
          for (i = 0; i < data.length(); i++)
          {
            console.log("skubber datapoint: " + data[i]);
            $scope.places.push(data[i]);
          }
          callback($scope.places);
        })
        .error(function (data, status, header, config)
        {
          console.log("ikke fundet!!");
        });
    };


  }
}]).directive('map', ['$http', function ($http)
{
  return {
    restrict: 'A',
    link: function (scope, element, attrs)
    {


      var zValue = scope.$eval(attrs.zoom);
      var lat = scope.$eval(attrs.lat);
      var lng = scope.$eval(attrs.lng);


      var myLatlng = new google.maps.LatLng(lat, lng);
      mapOptions =
        {
          zoom: zValue,
          center: myLatlng
        };
      map = new google.maps.Map(element[0], mapOptions);


      marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        label: "TRÆK OG SLIP MIG FOR AT LAVE EN NY LOCATION!",
        draggable: true
      });
      google.maps.event.addListener(marker, 'dragend', function (evt)
      {
        scope.$parent.user.latitude = evt.latLng.lat();
        scope.$parent.user.longitude = evt.latLng.lng();
        scope.$apply();
      });

      var places = [];
      $http.get("http://82.211.198.31:3000/api/get")
        .success(function (data, status, headers, config)
        {
          console.log("yay fundet her er data: " + data.length);
          for (i = 0; i < data.length; i++)
          {
            myLatlng = new google.maps.LatLng(data[i].lat, data[i].lng);
            marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
              label: data[i].desc,
              draggable: false
            });
          }
        })
        .error(function (data, status, header, config)
        {
          console.log("ikke fundet!!");
        });

      // scope.$parent.populate(function (places)
      // {

      // });
    }
  };
}]);
