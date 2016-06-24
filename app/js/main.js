var app = angular.module('app', [])

app.controller('myCtrl', function ($scope) {
  $scope.clickMe= function () {
    var heroOne = $scope.heroOne;
    alert(heroOne)  

  }
})
