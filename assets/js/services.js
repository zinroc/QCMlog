angular.module('App.services', []).factory('gameAPIservice', function($http) {
	"use strict";

	var gameAPI = {};

	/**
	 * Return the URL prefix that should go before the /controller/function part of the URL
	 */
	gameAPI.prefix = function () {
		// this won't always work, but should work for now
		var href = window.location.href;
		return href.substr(0, href.indexOf("index.php") + "index.php".length);
	};

	/**
	 * Return the URL prefix that should go before the asset URL.
	 * Does not include trailing slash
	 */
	gameAPI.assetPrefix = function () {
		var prefix = this.prefix();
		return prefix.substr(0, prefix.length - "/index.php".length) + "/assets";
	};

    gameAPI.getURL = function (controller, fn) {
        return this.prefix() + "/" + controller + "/" + fn;
    };

    gameAPI.getCoatings = function () {
        return this.getJSON("welcome", "getCoatings");
    };

    gameAPI.getCatagories = function (){
        return this.getJSON("welcome", "getCatagories");
    };

    gameAPI.getSolvents = function () {
        return this.getJSON("welcome", "getSolvents");
    };

    gameAPI.getTags = function () {
        return this.getJSON("welcome", "getTags");
    };

    gameAPI.getMeasures = function () {
        return this.getJSON("welcome", "getMeasures");
    };

    gameAPI.getSensors = function () {
        return this.getJSON("welcome", "getSensors");
    };

    gameAPI.getModules = function () {
        return this.getJSON("welcome", "getModules");
    };

    gameAPI.getSolutions = function () {
        return this.getJSON("welcome", "getSolutions");
    };

    gameAPI.searchMeasure = function (exp_id, measure){
        return this.getJSONWithParams("welcome", "searchMeasure", {"exp_id": exp_id, "measure": measure});
    };
    
    gameAPI.searchTag = function (exp_id, tag){
        return this.getJSONWithParams("welcome", "searchTag", {"exp_id": exp_id, "tag": tag});
    };

    gameAPI.search = function (query) {
        return this.getJSONWithParams("welcome", "search", {"query": query});
    };

    gameAPI.getExperiment = function (id) {
        return this.getJSONWithParams("welcome", "getExperiment", {"id": id});
    };

    gameAPI.loadCoating = function (coating_name){
        return this.getJSONWithParams("welcome", "loadCoating", {"coating_name": coating_name});
    };

    gameAPI.getExperimentTags = function (id) {
        return this.getJSONWithParams("welcome", "getExperimentTags", {"id": id});
    };

    gameAPI.getExperimentMeasures = function (id) {
        return this.getJSONWithParams("welcome", "getExperimentMeasures", {"id": id});
    };
    
    gameAPI.deleteExperimentMeasures = function (id) {
        return this.getJSONWithParams("welcome", "deleteExperimentMeasures", {"id": id});
    };


    gameAPI.deleteExperimentTags = function (id) {
        return this.getJSONWithParams("welcome", "deleteExperimentTags", {"id": id});
    };

    gameAPI.addCoating = function (name, solvent, thickness, thickness_var, rms){
    	return this.getJSONWithParams("welcome", "addCoating", {"name": name, "solvent": solvent, 
    		"thickness": thickness, "thickness_var": thickness_var, "rms": rms});
    };

    gameAPI.editCoating = function (name, solvent, thickness, thickness_var, rms){
        return this.getJSONWithParams("welcome", "editCoating", {"name": name, "solvent": solvent, 
            "thickness": thickness, "thickness_var": thickness_var, "rms": rms});
    };

    gameAPI.updateExperiment = function (id, description, coating, solution, sensor, module, conc, flow){
        return this.getJSONWithParams("welcome", "updateExperiment", {"id": id, "description": description, "coating": coating,
            "solution": solution, "sensor": sensor, "module": module, "conc": conc, "flow": flow});
    }


    gameAPI.addExperiment = function (description, coating, solution, sensor, module, conc, flow){
    	return this.getJSONWithParams("welcome", "addExperiment", {"description": description, "coating": coating,
    		"solution": solution, "sensor": sensor, "module": module, "conc": conc, "flow": flow});
    }

    gameAPI.addExperimentTag = function (id, tag){
        return this.getJSONWithParams("welcome", "addExperimentTag", {"id": id, "tag": tag});
    }

    gameAPI.addExperimentMeasure = function (id, measure, value){
        return this.getJSONWithParams("welcome", "addExperimentMeasure", {"id": id, "measure": measure, "value": value});
    }


    gameAPI.addTag = function (name){
        return this.getJSONWithParams("welcome", "addTag", {"name": name});
    };

    gameAPI.addMeasure = function (name){
        return this.getJSONWithParams("welcome", "addMeasure", {"name": name});
    };

    gameAPI.addSolvent = function (name){
    	return this.getJSONWithParams("welcome", "addSolvent", {"name": name});
    };

    gameAPI.addSolution = function (name){
    	return this.getJSONWithParams("welcome", "addSolution", {"name": name});
    };

    gameAPI.addSensor = function (name){
    	return this.getJSONWithParams("welcome", "addSensor", {"name": name});
    };


    gameAPI.addModule = function (name){
    	return this.getJSONWithParams("welcome", "addModule", {"name": name});
    };

	/**
	 * Get JSON from the controller with no parameters, from the given controller and function
	 * @param  {string}   controller The controller
	 * @param  {string}   fn         The function in the controller
	 */
	gameAPI.getJSON = function (controller, fn) {
		return $http.post(
			this.getURL(controller, fn),
			{}
		);
	};

	gameAPI.serializeObject = function (data) {
		var str = [];
		for (var k in data) {
			str.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
		}

		return str.join("&");
	};

	/**
	 * Return True iff the given server JSON response is an error
	 * @param  {Object}  response The server's JSON response
	 * @return {Boolean}          True iff the given server JSON response is an error
	 */
	gameAPI.isError = function (response) {
		return response.hasOwnProperty('status') && response.status === 'error';
	};

	/**
	 * Get JSON from the controller with given parameters
	 * @param  {string}   controller The controller
	 * @param  {string}   fn         The function in the controller
	 * @param  {Object}   data       The data to send
	 */
	gameAPI.getJSONWithParams = function (controller, fn, data) {
		return $http({
			method: 'POST',
			data: this.serializeObject(data),
			url: this.prefix() + '/' + controller + '/' + fn,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	};



	return gameAPI;
});
