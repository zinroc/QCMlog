angular.module('App.controllers').controller('exploreController', function ($scope, gameAPIservice, $timeout) {
	"use strict";

	$scope.search = {};
	$scope.search.primary = null;

	$scope.primarySearch = {};

	$scope.searchResult = {};

	$scope.error = {};
	$scope.error.msg = null;
	$scope.success = {};
	$scope.success.msg = null;

	$scope.experimentColumns = ['id', 'coating', 'flow_rate', 'sensor', 'module', 'solution', 'inlet_concentration'];

	$scope.getCatagories = function (){
	    gameAPIservice.getCatagories().success(function (response){
	        "use strict";
	        console.log("Tried to fetch catagories");
	        console.log(response);

	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched catagories";
	            $scope.error.msg = null;
	            $scope.catagories = response.catagories;
	        }
	    });
	}

	$scope.getMeasures = function (){
	    gameAPIservice.getMeasures().success(function (response){
	        "use strict";
	        console.log("Tried to fetch measures");
	        console.log(response);

	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched measures";
	            $scope.error.msg = null;
	            $scope.measures = response.measures;
	        }
	    });
	};

	$scope.getTags = function (){
	    gameAPIservice.getTags().success(function (response){
	        "use strict";
	        console.log("Tried to fetch tags");
	        console.log(response);

	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched tags";
	            $scope.error.msg = null;
	            $scope.tags = response.tags;
	        }
	    });
	};


	$scope.getSensors = function (){
	    gameAPIservice.getSensors().success(function (response){
	        "use strict";
	        console.log("Tried to fetch get sensors");
	        console.log(response);

	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched sensors";
	            $scope.error.msg = null;
	            $scope.sensors = response.sensors;
	        }
	    });
	};

	$scope.getModules = function (){
	    gameAPIservice.getModules().success(function (response){
	        "use strict";
	        console.log("Tried to fetch modules");
	        console.log(response);

	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched modules";
	            $scope.error.msg = null;
	            $scope.modules = response.modules;
	        }
	    });
	};

	$scope.getSolutions = function (){
	    gameAPIservice.getSolutions().success(function (response){
	        "use strict";
	        console.log("Tried to fetch solutions");
	        console.log(response);

	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched solutions";
	            $scope.error.msg = null;
	            $scope.solutions = response.solutions;
	        }
	    });
	};

	$scope.getCoatings = function (){
	    gameAPIservice.getCoatings().success(function (response){
	        "use strict";
	        console.log("Tried to fetch coatings");
	        console.log(response);

	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched coatings";
	            $scope.error.msg = null;
	            $scope.coatings = response.coatings;
	        }
	    });
	};

	$scope.getSolvents = function (){
	    gameAPIservice.getSolvents().success(function (response){
	        "use strict";
	        console.log("Tried to fetch solvents");
	        console.log(response);

	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched solvents";
	            $scope.error.msg = null;
	            $scope.solvents = response.solvents;
	        }
	    });
	};


	$scope.setPrimarySearchArray = function (){
		console.log($scope.search.primary + "ENTER PRIMARY SEARCH");
		$scope.primarySearch = $scope[$scope.search.primary];
		console.log($scope.setPrimarySearchArray);
		return;
	}
    $scope.search = function (){
    	console.log($scope.search.primary, $scope.search.value);
		var column = $scope.search.primary.replace(/(<([^>]+)>)/ig, "");
		column = column.slice(0, -1);
		var value = $scope.search.value.replace(/(<([^>]+)>)/ig, "");
    	var query = "SELECT * FROM experiments WHERE "+column+"='"+value+"' ORDER BY("+column+")";

    	gameAPIservice.search(query).success(function(response){
    		"use strict";
    		console.log("Tried to search");
    		console.log(response);
	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched search result";
	            $scope.error.msg = null;
	            $scope.searchResult = response.search;
	            console.log($scope.searchResult + "SEARCH RESULT");
	        }
    	});

    };

    $scope.getCatagories();
	$scope.getCoatings();
	$scope.getSolvents();
	$scope.getSolutions();
	$scope.getSensors();
	$scope.getModules();
	$scope.getTags();
	$scope.getMeasures();

});