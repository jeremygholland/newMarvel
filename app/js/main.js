var app = angular.module('app', [])

app.controller('myCtrl', function ($scope) {
  $scope.clickMe= function() {
    var heroOne = $scope.heroOne;
    $.ajax({
      type:"GET",
      url: 'http://gateway.marvel.com:80/v1/public/characters?name=' + heroOne +
				'&limit=100&apikey=64f1f5a1ab896a13dd9c6b4009b0817e',
      dataType: 'json',
      success: function(json){
        $scope.firstSearchResult ={
            id:json.data.results[0].id,
            description: json.data.results[0].description,
            img: json.data.results[0].thumbnail.path + '/detail.jpg',
            name: json.data.results[0].name
        }

      },
      error: function() {
        console.log('coulnd\'t that hero.')

      }
    })

  }
})
