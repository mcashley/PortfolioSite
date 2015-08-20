(function() {
  var app = angular.module('portfoliosite', ['ngTouch', 'ngRoute']);
  app.config(['$routeProvider', function($routeProvider) {
	      $routeProvider
	        .when('/', {
	          templateUrl: 'views/home.html',
	          controller: 'PortfolioCntrl'
	        })
	        .when('/detail/:id', {
	          templateUrl: 'views/detail.html',
	          controller: 'DetailCntrl'
	        })
	        .otherwise({
	          redirectTo: '/'
	        });
	}]);

  app.controller('PortfolioCntrl', function($scope, $route, $http, $routeParams, $location){
	  $scope.pieces = [];
	  $http.get('data/projects.json').then(function(response) {
	      $scope.pieces = response.data;

		}, function(respponse) {
	        console.log(response);
	    });
	$scope.selectPiece = function(index){
		$location.path( '/detail/' + index );
	};
  });
  
  app.controller('DetailCntrl', function($scope,$http, $route, $routeParams, $location){
	//  document.body.scrollTop = document.documentElement.scrollTop = 0;
	$scope.currentPiece = null;
	if ($routeParams.id != undefined){
  	  $http.get('data/projects.json').then(function(response) {
  	      $scope.currentPiece = response.data[$routeParams.id];

  		}, function(respponse) {
  	        console.log(response);
  	    });
		//$scope.currentPiece = projects[$routeParams.id];	 
	}
	else {
		$scope.goBack();
	}
	$scope.goBack = function(){
		$location.path( '/' );
	};

  });
  })();
 