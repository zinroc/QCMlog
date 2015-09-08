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


    gameAPI.getCards = function () {
        return this.getJSON("welcome", "getCards");
    };

    gameAPI.getCoatings = function () {
        return this.getJSON("welcome", "getCoatings");
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

    gameAPI.addCoating = function (name, solvent, thickness, thickness_var, rms){
    	return this.getJSONWithParams("welcome", "addCoating", {"name": name, "solvent": solvent, 
    		"thickness": thickness, "thickness_var": thickness_var, "rms": rms});
    };

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

    gameAPI.getPlayers = function () {
        return this.getJSON("welcome", "getPlayers");
    };

    gameAPI.getDecisions = function (){
    	return this.getJSON("welcome", "getDecisions");
    };

    gameAPI.getGameID = function (){
    	return this.getJSON("welcome", "getGameID");
    };

    gameAPI.getPlayerDecisionVectors = function (id, index){
    	return this.getJSONWithParams("welcome", "getPlayerDecisionVectors", {"id": id, "index": index});
    };

    gameAPI.getPlayerDecisionMatrix = function (id, index){
    	return this.getJSONWithParams("welcome", "getPlayerDecisionMatrix", {"id": id, "index": index});
    };

    gameAPI.downloadAI = function (){
    	return this.getJSON("welcome", "downloadAI");
    };

    gameAPI.createPlayer = function (name) {
    	return this.getJSONWithParams("welcome", "createPlayer", {"name": name});
    };

    gameAPI.recordMove = function (turn, decision, game, player) {
    	return this.getJSONWithParams("welcome", "recordMove", {"turn": turn, "decision": decision, "game": game, "player": player});
    };

    gameAPI.recordMatrixID = function (decision, type, vector, game, turn, player) {
    	return this.getJSONWithParams("welcome", "recordMatrixID", {"decision": decision, "type": type, "vector": vector, "game": game, "turn": turn, "player": player});
    };

    gameAPI.updateGame = function (winner, loser_1, loser_2, loser_3, game, turn) {
    	return this.getJSONWithParams("welcome", "updateGame", {"winner": winner, "loser_1": loser_1, "loser_2": loser_2, "loser_3": loser_3, "game": game, "turn": turn});
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
