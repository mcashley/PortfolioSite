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
	  $http.get('data/projects.json').success(function(data) {
	      this.pieces = data;
	    });
	this.selectPiece = function(index){
		$location.path( '/detail/' + index );
	};
  });
  app.controller('DetailCntrl', function($scope, $route, $routeParams, $location){
	//  document.body.scrollTop = document.documentElement.scrollTop = 0;
	if ($routeParams.id != undefined){
	  	$scope.currentPiece = projects[$routeParams.id];	 
	}
	else {
		$scope.goBack();
	}
	$scope.goBack = function(){
		$location.path( '/' );
	};

  });
  })();