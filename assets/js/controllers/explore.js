angular.module('App.controllers').controller('exploreController', function ($scope, gameAPIservice, $timeout) {
	"use strict";

	$scope.search = {};
	$scope.search.primary = null;
	$scope.search.order = "ids";

	$scope.primarySearch = {};

	$scope.searchResult = {};

	$scope.searchDisplay = [];

	$scope.error = {};
	$scope.error.msg = null;
	$scope.success = {};
	$scope.success.msg = null;

	$scope.query = "";

	$scope.experimentColumns = ['id', 'coating', 'flow_rate', 'sensor', 'module', 'solution', 'inlet_concentration'];

	$scope.initSearchDisplay = function (){
		for (var i=0; i<$scope.experimentColumns.length; i++){
			var column = $scope.experimentColumns[i];

			$scope.searchDisplay[column] = false;
		}
	};

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
	            $scope.initSearchDisplayMeasures();
	        }
	    });
	};

	$scope.initSearchDisplayMeasures = function (){
		for (var i=0; i<$scope.measures.length; i++){
			$scope.searchDisplay[$scope.measures[i].name] = false;
		}
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
	            $scope.initSearchDisplayTags();
	        }
	    });
	};

	$scope.initSearchDisplayTags = function (){
		for (var i=0; i<$scope.tags.length; i++){
			$scope.searchDisplay[$scope.tags[i].name] = false;
		}
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
		$scope.primarySearch = $scope[$scope.search.primary];
		return;
	};


    $scope.search = function (){
    	console.log($scope.search.primary, $scope.search.value);
		var column = $scope.search.primary.replace(/(<([^>]+)>)/ig, "");
		column = column.slice(0, -1);
		var value = $scope.search.value.replace(/(<([^>]+)>)/ig, "");
		var order = $scope.search.order.replace(/(<([^>]+)>)/ig, "");
		order = order.slice(0, -1);
		var order_string = "ORDER BY ("+order+");";
		var query = "";

		var catagoryDisplay = "";
		for (var i=0; i<$scope.experimentColumns.length; i++){
			var cat = $scope.experimentColumns[i];
			if ($scope.searchDisplay[cat]){
				if (cat !== 'inlet_concentration'){
					catagoryDisplay += " " + cat + ",";
				} else {
					catagoryDisplay += " conc_inlet,";
				}
			}
		}
		catagoryDisplay = catagoryDisplay.slice(0, -1);


		if (column==='measure' || column==='tag'){
			query = "SELECT" + catagoryDisplay + " FROM experiments WHERE id IN (SELECT experiment FROM experiment_"+column+"s WHERE "+column+"='"+value+"') " + order_string;
		} else if (column==='solvent') {
			query = "SELECT " + catagoryDisplay + " FROM experiments WHERE coating IN (SELECT name FROM coatings WHERE "+column+"='"+value+"')";
		} else {
    		query = "SELECT" + catagoryDisplay + " FROM experiments WHERE "+column+"='"+value+"' " + order_string;
    	}
    	$scope.query = query;
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
	            //console.log($scope.searchResult + "SEARCH RESULT");
	        }
    	});

    };

    $scope.initSearchDisplay();
    $scope.getCatagories();
	$scope.getCoatings();
	$scope.getSolvents();
	$scope.getSolutions();
	$scope.getSensors();
	$scope.getModules();
	$scope.getTags();
	$scope.getMeasures();

});