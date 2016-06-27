var app = angular.module('app', [])

app.controller('myCtrl', function ($scope) {

  var heroOneEvent =[];
  var heroTwoEvent = [];

  var containEvents = [
    heroOneEvent, heroTwoEvent
  ]

  function clear() {

      $scope.heroOneReturn= {
        id: '',
        description: '',
        img: '',
        name: '',
      }
      $scope.heroTwoReturn= {
        id: '',
        description: '',
        img: '',
        name: ''
      }
  }

  var apiKey = '64f1f5a1ab896a13dd9c6b4009b0817e';

  $scope.clickMe = function() {

        	async.series({
            one: function(callback){
              var heroOne = $scope.heroOne;
    $.ajax({
      type:"GET",
      url: 'http://gateway.marvel.com:80/v1/public/characters?name=' + heroOne +
				'&limit=100&apikey='+apiKey,
      dataType: 'json',
      success: function(json){
        $scope.heroOneReturn = {
            id:json.data.results[0].id,
            description: json.data.results[0].description,
            img: json.data.results[0].thumbnail.path + '/detail.jpg',
            name: json.data.results[0].name
        }
        $.each(json.data.results[0].events.items, function(i, item){
          heroTwoEvent.push(item.name)
        })

      },
      error: function() {
        console.log('coulnd\'t that hero.')

      }
    })
    setTimeout(function(){
      $('#heroOneImg').attr('src', $scope.heroOneReturn.img);
      $('#heroOneName').html($scope.heroOneReturn.name)
				callback(null, 1);
			}, 2500);
  },
  two: function(callback){
    console.log('one')
    var heroTwo = $scope.heroTwo;
    $.ajax({

      type: "GET",
      url: 'http://gateway.marvel.com:80/v1/public/characters?name=' + heroTwo +
				'&limit=100&apikey='+apiKey,
        dataType: 'json',
        success:function(json){
          $scope.heroTwoReturn= {
            id: json.data.results[0].id,
            description: json.data.results[0].description,
            img: json.data.results[0].thumbnail.path + '/detail.jpg',
            name: json.data.results[0].name
          }
          $.each(json.data.results[0].events.items, function(i, item){
            heroTwoEvent.push(item.name)
          })
        },
        error: function(){
          $scope.heroTwoReturn.name= "this name didn't work."
        }
      })
      setTimeout(function(){
          callback(null, 1);

        }, 2500);
    }

});
        clear();
}

$scope.testTwo = function(){
  alert($scope.heroOneReturn.id)
}
});
