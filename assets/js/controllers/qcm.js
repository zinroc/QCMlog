angular.module('App.controllers').controller('qcmController', function ($scope, gameAPIservice, $timeout) {
	"use strict";

	$scope.editExperiment = {};
	$scope.editExperiment.id = null;

	$scope.para = {};
	$scope.coatingPara = {};
	$scope.solventPara = {};
	$scope.solutionPara = {};
	$scope.sensorPara = {};
	$scope.modulePara = {};
	$scope.tagPara = {};

	$scope.experimentID = null;
	$scope.loadedExperiment = null;

	$scope.measure = {};

	$scope.error = {};
	$scope.error.msg = null;

	$scope.expCoating = {};
	$scope.input = {};
	$scope.input.coating = false;
	$scope.input.solvent = false;
	$scope.input.solution = false;
	$scope.input.sensor = false;
	$scope.input.module = false;
	$scope.input.tag = false;
	$scope.input.measure = false;

	$scope.added = {};
	$scope.added.experiment = false;
	$scope.added.experimentTags = false;
	$scope.added.experimentMeasures = false;

	$scope.loading = {};
	$scope.loading.experimentAdd = false;
	$scope.loading.experimentEdit = false;

	$scope.loaded = {};
	$scope.loaded.experiment = false;
	$scope.loaded.parametersPlaced = false;
	$scope.loaded.experimentUpdate = false;
	$scope.loaded.measuresPlaced = false;
	$scope.loaded.tagsPlaced = false;

	$scope.solvent = {}; 
	$scope.solvent.name = null;

	$scope.expSolution = {};
	$scope.expSolution.name = null;

	$scope.expSensor = {};
	$scope.expSensor.name = null;

	$scope.expModule = {};
	$scope.expModule.name = null;

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


	$scope.resetLoadingScreen = function (){
		$scope.loading.experimentAdd = false;
		$scope.added.experiment = false;
		$scope.added.experimentMeasures = false;
		$scope.added.experimentTags = false;

		$scope.loading.experimentEdit = false;
		$scope.loaded.experiment = false;

		$scope.loading.experimentUpdate = false;

		$scope.loaded.experimentUpdate = false;

		$scope.loaded.parametersPlaced = false;
		$scope.loaded.tagsPlaced = false;
		$scope.loaded.measuresPlaced = false;

	};

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

	$scope.stopEditting = function (){
		$scope.editExperiment.id = null;
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

	$scope.placeParameters = function (){


		$scope.para.desc = $scope.loadedExperiment.description;
		$scope.expCoating.name = $scope.loadedExperiment.coating;
		$scope.expSolution.name = $scope.loadedExperiment.solution;
		$scope.expModule.name = $scope.loadedExperiment.module;
		$scope.expSensor.name = $scope.loadedExperiment.sensor;
		$scope.para.flow = parseInt($scope.loadedExperiment.flow_rate);
		$scope.para.conc = parseFloat($scope.loadedExperiment.conc_inlet);
		$scope.loaded.parametersPlaced = true;
	};

	$scope.placeMeasures = function (){
		$scope.maxMeasLength = 0;

		$scope.measIndex = [0];
		$scope.measVals = [];
		$scope.measVals[0] = {};
		$scope.measVals[0].name = null;
		$scope.measVals[0].val = null;

		for (var i=0; i<$scope.loadedExperimentMeasures.length; i++){
			if (i>$scope.maxMeasLength){
				$scope.increaseMeasures();
			}
			$scope.measVals[$scope.maxMeasLength] = {};
			$scope.measVals[$scope.maxMeasLength].name = $scope.loadedExperimentMeasures[i].measure;
			$scope.measVals[$scope.maxMeasLength].val = parseFloat($scope.loadedExperimentMeasures[i].value);
		}

		$scope.loaded.measuresPlaced = true;

	};

	$scope.placeTags = function (){
		$scope.maxTagLength = 0;

		$scope.tagIndex = [0];
		$scope.tagVals = [];
		$scope.tagVals[0] = {};
		$scope.tagVals[0].name = null;

		for (var i=0; i<$scope.loadedExperimentTags.length; i++){
			if (i>$scope.maxTagLength){
				$scope.increaseTags();
			}
			$scope.tagVals[$scope.maxTagLength] = {};
			$scope.tagVals[$scope.maxTagLength].name = $scope.loadedExperimentTags[i].tag;
		}
		$scope.loaded.tagsPlaced = true;
	};

	$scope.loadExperiment = function(){
		console.log($scope.editExperiment.id);
		$scope.loading.experimentEdit = true;

		gameAPIservice.getExperiment($scope.editExperiment.id).success(function (response){
			"use strict";
			console.log("Tried to fetch experiment " + $scope.editExperiment.id);
			console.log(response);
	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched experiment " + $scope.editExperiment.id;
	            $scope.error.msg = null;
	            $scope.loadedExperiment = response.experiment;
	            $scope.loaded.experiment = true;


	            $scope.placeParameters();
	        }
		});

		gameAPIservice.getExperimentTags($scope.editExperiment.id).success(function (response){
			"use strict";
			console.log("Tried to fetch experiment tags for exp " + $scope.editExperiment.id);
			console.log(response);

	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched experiment tags for exp " + $scope.editExperiment.id;
	            $scope.error.msg = null;
	            $scope.loadedExperimentTags = response.experimentTags;
	            $scope.loaded.experimentTags = true;

	            $scope.placeTags();
	        }

		});

		gameAPIservice.getExperimentMeasures($scope.editExperiment.id).success(function (response){
			"use strict";
			console.log("Tried to fetch experiment measures for exp " + $scope.editExperiment.id);
			console.log(response);

	        if (response.hasOwnProperty('status') && response.status === 'error') {
	            $scope.error.msg = response.msg;
	            $scope.success.msg = null;

	        } else {
	            $scope.success.msg = "fetched experiment measures for exp " + $scope.editExperiment.id;
	            $scope.error.msg = null;
	            $scope.loadedExperimentMeasures = response.experimentMeasures;
	            $scope.loaded.experimentMeasures = true;
	            
	            $scope.placeMeasures();
	        }

		});
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

    $scope.updateExperiment = function (){
    	console.log($scope.editExperiment.id);

    	$scope.loading.experimentUpdate = true;

		console.log("UPDATE EXPERIMENT WITH PARAMS:", $scope.editExperiment.id, $scope.para.desc, $scope.expCoating.name, $scope.expSolution.name, $scope.expSensor.name, $scope.expModule.name,
			$scope.para.conc, $scope.para.flow);


		gameAPIservice.updateExperiment($scope.editExperiment.id, $scope.para.desc, $scope.expCoating.name, $scope.expSolution.name, $scope.expSensor.name, $scope.expModule.name,
		$scope.para.conc, $scope.para.flow).success(function (response){
			"use strict";

			console.log("Tried to update experiment " + $scope.editExperiment.id);
			console.log(response);
			$scope.loaded.experimentUpdate = true;
		});

		gameAPIservice.deleteExperimentTags($scope.editExperiment.id).success(function (response){
			"use strict";

			console.log("Tried to delete experiment tags for id " + $scope.editExperiment.id);
			console.log(response);

			for (var i=0; i<$scope.tagVals.length; i++){
				gameAPIservice.addExperimentTag($scope.editExperiment.id, $scope.tagVals[i].name).success(function (response){
					"use strict";

					console.log("Tried to add experiment tag");
					console.log(response);
					if (i === $scope.tagVals.length){
						$scope.added.experimentTags = true;
					}
				});
			}
			if ($scope.tagVals.length ===0){
				$scope.added.experimentTags = true;
			}

		});

		gameAPIservice.deleteExperimentMeasures($scope.editExperiment.id).success(function (response){
			"use strict";

			console.log("Tried to delete experiment measures for id " + $scope.editExperiment.id);
			console.log(response);
			for (var j=0; j<$scope.measVals.length; j++){
				gameAPIservice.addExperimentMeasure($scope.editExperiment.id, $scope.measVals[j].name, $scope.measVals[j].val).success(function (response){
					"use strict";

					console.log("Tried to add experiment measure");
					console.log(response);
					if (j === $scope.measVals.length){
						$scope.added.experimentMeasures = true;
					}
				});
			}
			if ($scope.measVals.length ===0){
				$scope.added.experimentMeasures = true;
			}
		});
    };

    $scope.addExperiment = function (){

    	$scope.loading.experimentAdd = true;

		console.log("ADD EXPERIMENT WITH PARAMS:", $scope.para.desc, $scope.expCoating.name, $scope.expSolution.name, $scope.expSensor.name, $scope.expModule.name,
			$scope.para.conc, $scope.para.flow);

		gameAPIservice.addExperiment($scope.para.desc, $scope.expCoating.name, $scope.expSolution.name, $scope.expSensor.name, $scope.expModule.name,
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
					console.log(i, $scope.tagVals.length);
					if (i === $scope.tagVals.length){
						$scope.added.experimentTags = true;
					}
				});

			}
			if ($scope.tagVals.length ===0){
				$scope.added.experimentTags = true;
			}


			for(var j=0; j<$scope.measVals.length; j++){
				console.log($scope.experimentID, $scope.measVals[j].name, $scope.measVals[j].val);

				gameAPIservice.addExperimentMeasure($scope.experimentID, $scope.measVals[j].name, $scope.measVals[j].val).success(function (response){
					"use strict";

					console.log("Tried to add experiment measure");
					console.log(response);
					console.log(j, $scope.measVals.length);

					if (j === $scope.measVals.length){
						$scope.added.experimentMeasures = true;
					}
				});
			}
			if ($scope.measVals.length ===0){
				$scope.added.experimentMeasures = true;
			}
			$scope.added.experiment = true;
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