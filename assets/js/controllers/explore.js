angular.module('App.controllers').controller('exploreController', function ($scope, gameAPIservice, $timeout) {
	"use strict";



	$scope.init = function (){
		$scope.search = {};
		$scope.search.primary = null;
		$scope.search.order = "ids";

		$scope.primarySearch = {};

		$scope.searchResult = {};
		$scope.measResults = {};
		$scope.tagResults = {};

		$scope.searchDisplay = [];

		$scope.error = {};
		$scope.error.msg = null;
		$scope.success = {};
		$scope.success.msg = null;

		$scope.query = "";
		$scope.experimentColumnsChecked = false;
		$scope.tagColumnsChecked = false;
		$scope.measureColumnsChecked = false;

		$scope.experimentColumns = ['id', 'date', 'coating', 'flow_rate', 'sensor', 'module', 'solution', 'inlet_concentration'];
		$scope.measureColumns = [];
		$scope.tagColumns = [];

		$scope.searched = false;
	};
	$scope.init();

	$scope.clearSearch = function (){
		//TODO make a reset that doesn't bug
		location.reload();

		/*
		$scope.init();
		$scope.initSearchDisplay();
		$scope.initSearchDisplayMeasures();
		$scope.initSearchDisplayTags();
		*/

	};
	
	$scope.checkAllMeasureColumns = function (){
		if (!$scope.measureColumnsChecked){
			$scope.measureColumnsChecked = true;
			for (var i=0; i<$scope.measures.length; i++){
				var column = $scope.measures[i];
				$scope.searchDisplay[column.name] = true;
			}
			return;
		} else if ($scope.measureColumnsChecked){
			$scope.measureColumnsChecked = false;
			for (var i=0; i<$scope.measures.length; i++){
				var column = $scope.measures[i];
				$scope.searchDisplay[column.name] = false;
			}
			return;
		}
	};

	$scope.checkAllTagColumns = function (){
		if (!$scope.tagColumnsChecked){
			$scope.tagColumnsChecked = true;
			for (var i=0; i<$scope.tags.length; i++){
				var column = $scope.tags[i];
				$scope.searchDisplay[column.name] = true;
			}
			return;
		} else if ($scope.tagColumnsChecked){
			$scope.tagColumnsChecked = false;
			for (var i=0; i<$scope.tags.length; i++){
				var column = $scope.tags[i];
				$scope.searchDisplay[column.name] = false;
			}
			return;
		}
	};

	$scope.checkAllExperimentColumns = function (){
		if (!$scope.experimentColumnsChecked){
			$scope.experimentColumnsChecked = true;
			for (var i=0; i<$scope.experimentColumns.length; i++){
				var column = $scope.experimentColumns[i];
				$scope.searchDisplay[column] = true;
			}
			return;
		}	else if ($scope.experimentColumnsChecked){
			$scope.experimentColumnsChecked = false;
			for (var i=0; i<$scope.experimentColumns.length; i++){
				var column = $scope.experimentColumns[i];
				$scope.searchDisplay[column] = false;
			}
			return;
		}
	};

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

	$scope.getMeasureColumnName = function (name){
		name = name.trim();
		name = name.replace(/ /g, "_");
		name = name.replace('(', "_");
		name = name.replace(')', "");
		name = name.replace(/,/g, "_");
		name = name.replace(/-/g, "_");
		name = name.toLowerCase();
		//TODO strip_tags
		return name;
	};

    $scope.search = function (){



    	console.log($scope.search.primary, $scope.search.value);
		var column = $scope.search.primary.replace(/(<([^>]+)>)/ig, "");
		column = column.slice(0, -1);
		var value = $scope.search.value.replace(/(<([^>]+)>)/ig, "");
		var order = $scope.search.order.replace(/(<([^>]+)>)/ig, "");
		if (order ==='inlet_concentration'){
			order = 'conc_inlet';
		}
		var order_string = "ORDER BY "+order+";";
		var query = "";

		var catagoryDisplay = "";
		for (var i=0; i<$scope.experimentColumns.length; i++){
			var cat = $scope.experimentColumns[i];
			if ($scope.searchDisplay[cat]){
				if (cat !== 'inlet_concentration'){
					catagoryDisplay += " experiments." + cat + ",";
				} else {
					catagoryDisplay += " experiments.conc_inlet,";
				}
			}
		}

		var measureDisplay = "";

    	for (var i=0; i<$scope.measures.length; i++){
    		var measure = $scope.measures[i];
    		if ($scope.searchDisplay[measure.name]){
	    		if (measureDisplay===""){
	    			measureDisplay = " INNER JOIN experiment_measure_columns ON experiments.id=experiment_measure_columns.experiment ";
	    		}
	    		var measureName = $scope.getMeasureColumnName(measure.name);
    			$scope.measureColumns.push(measure.name);

	    		catagoryDisplay += " experiment_measure_columns."+measureName+",";

    		}
    	}


		var tagDisplay = "";
    	for (var i=0; i<$scope.tags.length; i++){
    		var tag = $scope.tags[i];
    		if ($scope.searchDisplay[tag.name]){

    			if (tagDisplay===""){
    				tagDisplay = " RIGHT OUTER JOIN experiment_tag_columns ON experiments.id=experiment_tag_columns.experiment ";
    			}
    			var tagName = $scope.getMeasureColumnName(tag.name);
    			$scope.tagColumns.push(tag.name);

    			catagoryDisplay +=" experiment_tag_columns."+tagName+",";
    		}
    	}

		catagoryDisplay = catagoryDisplay.slice(0, -1);

    	for (var i=0; i<$scope.tagColumns.length; i++){
    		var tagColumn = $scope.tagColumns[i];
    		$scope.tagResults[tagColumn] = {};
    	}

    	for (var i=0; i<$scope.measureColumns.length; i++){
    		var measureColumn = $scope.measureColumns[i];
    		$scope.measResults[measureColumn] = {};
    	}

		if (column==='measure' || column==='tag'){
			query = "SELECT experiments.id," + catagoryDisplay + " FROM experiments "+measureDisplay+tagDisplay+" WHERE experiments.id IN (SELECT experiment FROM experiment_"+column+"s WHERE "+column+"='"+value+"') " + order_string;
		} else if (column==='solvent') {
			query = "SELECT experiments.id," + catagoryDisplay + " FROM experiments "+measureDisplay+tagDisplay+" WHERE experiments.coating IN (SELECT name FROM coatings WHERE "+column+"='"+value+"') " + order_string;
		} else {
    		query = "SELECT experiments.id," + catagoryDisplay + " FROM experiments "+measureDisplay+tagDisplay+" WHERE experiments."+column+"='"+value+"' " + order_string;
    	}
    	$scope.query = query;

    	gameAPIservice.search(query).success(function (response){
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
    			$scope.searched = true;

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