GenuinePartsesbPortal.myApp.controller("ReplayController",["$scope","$http","myService",
function($scope,$http,myService) {
	 $http.get("Sample.html")
  .then(function(response) {
      $scope.myWelcome = response.data;
  });
}]);