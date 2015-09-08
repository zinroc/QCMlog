angular.module('App.controllers').controller('qcmController', function ($scope, gameAPIservice, $timeout) {
	"use strict";

	$scope.para = {};
	$scope.coatingPara = {};
	$scope.solventPara = {};
	$scope.solutionPara = {};
	$scope.sensorPara = {};
	$scope.modulePara = {};
	$scope.tagPara = {};

	$scope.experimentID = null;

	$scope.measure = {};

	$scope.input = {};
	$scope.input.coating = false;
	$scope.input.solvent = false;
	$scope.input.solution = false;
	$scope.input.sensor = false;
	$scope.input.module = false;
	$scope.input.tag = false;
	$scope.input.measure = false;

	$scope.solvent = {}; 
	$scope.solvent.name = null;

	$scope.solution = {};
	$scope.solution.name = null;

	$scope.sensor = {};
	$scope.sensor.name = null;

	$scope.module = {};
	$scope.module.name = null;

	$scope.tagIndex = [0];
	$scope.measIndex = [0];
	$scope.tagVals = [];
	$scope.measVals = [];
	$scope.tagVals[0] = {};
	$scope.measVals[0] = {};
	$scope.tagVals[0].name = null;
	$scope.measVals[0].name = null;
	$scope.measVals[0].val = null;

	$scope.maxMeasLength = 0;
	$scope.maxTagLength = 0;

	$scope.success = {};
	$scope.error = {};


	$scope.increaseTags = function (){
		$scope.maxTagLength++;
		$scope.tagIndex[$scope.maxTagLength] = $scope.maxTagLength; 
		$scope.tagVals[$scope.maxTagLength] = {};
		$scope.tagVals[$scope.maxTagLength].name = null;
		console.log($scope.maxTagLength, $scope.tagIndex, $scope.tagVals);
	};

	$scope.increaseMeasures = function (){
		$scope.maxMeasLength++;
		$scope.measIndex[$scope.maxMeasLength] = $scope.maxMeasLength;
		$scope.measVals[$scope.maxMeasLength] = {};
		$scope.measVals[$scope.maxMeasLength].name = null;
		console.log($scope.maxMeasLength, $scope.measIndex, $scope.measVals);
	};

	$scope.decreaseMeasures = function(){
		$scope.maxMeasLength--;

		var tempMeasVals = [];
		var tempMeasIndex = [];
		for (var i=0; i<$scope.maxMeasLength+1; i++){
			tempMeasVals[i] = $scope.measVals[i];
			tempMeasIndex[i] = i;
		}

		$scope.measIndex = tempMeasIndex;
		$scope.measVals = tempMeasVals;


		console.log($scope.maxMeasLength, $scope.measIndex, $scope.measVals);

	};

	$scope.decreaseTags = function(){
		$scope.maxTagLength--;

		var tempTagVals = [];
		var tempTagIndex = [];
		for (var i=0; i<$scope.maxTagLength+1; i++){
			tempTagVals[i] = $scope.tagVals[i];
			tempTagIndex[i] = i;
		}

		$scope.tagIndex = tempTagIndex;
		$scope.tagVals = tempTagVals;


		console.log($scope.maxTagLength, $scope.tagIndex, $scope.tagVals);

	};

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


	$scope.getCoatings();
	$scope.getSolvents();
	$scope.getSolutions();
	$scope.getSensors();
	$scope.getModules();
	$scope.getTags();
	$scope.getMeasures();

    $scope.showCoatingInput = function (){
    	$scope.input.coating = true; 
    };

    $scope.showMeasureInput = function (){
    	$scope.input.measure = true; 
    };

    $scope.showSolventInput = function (){
    	$scope.input.solvent = true;
    };

    $scope.showSolutionInput = function (){
    	$scope.input.solution = true;
    };

    $scope.showSensorInput = function (){
    	$scope.input.sensor = true;
    };

    $scope.showModuleInput = function (){
    	$scope.input.module = true;
    };

    $scope.showTagInput = function (){
    	$scope.input.tag = true;
    };

    $scope.addCoating = function (){
    	//console.log($scope.coatingPara.name, $scope.coatingPara.solvent, $scope.coatingPara.thickness, 
    	//	$scope.coatingPara.thickness_var, $scope.coatingPara.rms);

    	gameAPIservice.addCoating($scope.coatingPara.name, $scope.solvent.name, $scope.coatingPara.thickness, 
    		$scope.coatingPara.thickness_var, $scope.coatingPara.rms).success(function (response){
    		"use strict";
    		
    		console.log($scope.coatingPara.name, $scope.solvent.name, $scope.coatingPara.thickness, 
    		$scope.coatingPara.thickness_var, $scope.coatingPara.rms);

    		console.log("Tried to add coating");
    		console.log(response);

	    	$scope.getCoatings();

    	});

    	$scope.input.coating = false;

    };

    $scope.addSensor = function (){
    	console.log($scope.sensorPara.name);

    	gameAPIservice.addSensor($scope.sensorPara.name).success(function (response){
    		"use strict";

    		console.log("Tried to add sensor");
    		console.log(response);

	    	$scope.getSensors();

    	});


    	$scope.input.sensor = false;

    };

    $scope.addMeasure = function (){
    	console.log($scope.measure.name);
    	
    	gameAPIservice.addMeasure($scope.measure.name).success(function (response){
    		"use strict";

    		console.log("Tried to add measure");
    		console.log(response);

	    	$scope.getMeasures();

    	});

    	$scope.input.measure = false;
	
    };

    $scope.addTag = function (){
    	console.log($scope.tagPara.name);

    	gameAPIservice.addTag($scope.tagPara.name).success(function (response){
    		"use strict";

    		console.log("Tried to add tag");
    		console.log(response);

	    	$scope.getTags();

    	});

    	$scope.input.tag = false;

    };

    $scope.addModule = function (){
    	console.log($scope.modulePara.name);

    	gameAPIservice.addModule($scope.modulePara.name).success(function (response){
    		"use strict";

    		console.log("Tried to add module");
    		console.log(response);

	    	$scope.getModules();

    	});


    	$scope.input.module = false;

    };


    $scope.addSolvent = function (){
    	console.log($scope.solventPara.name);

    	gameAPIservice.addSolvent($scope.solventPara.name).success(function (response){
    		"use strict";

    		console.log("Tried to add solvent");
    		console.log(response);

	    	$scope.getSolvents();

    	});


    	$scope.input.solvent = false;

    };

    $scope.addSolution = function (){
    	console.log($scope.solutionPara.name);

    	gameAPIservice.addSolution($scope.solutionPara.name).success(function (response){
    		"use strict";

    		console.log("Tried to add solution");
    		console.log(response);

    		$scope.getSolutions();
    	});


    	$scope.input.solution = false;

    };

    $scope.addExperiment = function (){

		console.log($scope.para.desc, $scope.coating.name, $scope.solution.name, $scope.sensor.name, $scope.module.name,
			$scope.para.conc, $scope.para.flow);

		gameAPIservice.addExperiment($scope.para.desc, $scope.coating.name, $scope.solution.name, $scope.sensor.name, $scope.module.name,
		$scope.para.conc, $scope.para.flow).success(function (response){
			"use strict";

			console.log("Tried to add experiment");
			console.log(response);
			$scope.experimentID = response.id;


			for(var i=0; i<$scope.tagVals.length; i++){
				console.log($scope.experimentID, $scope.tagVals[i].name);


				gameAPIservice.addExperimentTag($scope.experimentID, $scope.tagVals[i].name).success(function (response){
					"use strict";

					console.log("Tried to add experiment tag");
					console.log(response);
				});

			}


			for(i=0; i<$scope.measVals.length; i++){
				console.log($scope.experimentID, $scope.measVals[i].name, $scope.measVals[i].val);

				gameAPIservice.addExperimentMeasure($scope.experimentID, $scope.measVals[i].name, $scope.measVals[i].val).success(function (response){
					"use strict";

					console.log("Tried to add experiment measure");
					console.log(response);
				});
			}



		});

    };

    $scope.cancelTag = function (){
    	$scope.input.tag = false;
    };


    $scope.cancelMeasure = function (){
    	$scope.input.measure = false;
    };

    $scope.cancelSolvent = function (){
    	$scope.input.solvent = false;
    };

    $scope.cancelCoating = function (){
    	$scope.input.coating = false;
    };


    $scope.cancelSolution = function (){
    	$scope.input.solution = false;
    };


    $scope.cancelSensor = function (){
    	$scope.input.sensor = false;
    };


    $scope.cancelModule = function (){
    	$scope.input.module = false;
    };

});