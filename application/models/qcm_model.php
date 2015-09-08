<?php

class Qcm_Model extends CI_MODEL {


	function getCoatings (){
		$query = $this->db->get("coatings");
		$coatings = $query->result_array();
		return $coatings;
	}

	function getSolvents (){
		$query = $this->db->get("solvents");
		$solvents = $query->result_array();
		return $solvents;
	}

	function getSolutions (){
		$query = $this->db->get("solutions");
		$solutions = $query->result_array();
		return $solutions;
	}

	function getSensors (){
		$query = $this->db->get("sensors");
		$sensors = $query->result_array();
		return $sensors;
	}

	function getMeasures (){
		$query = $this->db->get("measures");
		$measures = $query->result_array();
		return $measures;
	}

	function getTags (){
		$query = $this->db->get("tags");
		$tags = $query->result_array();
		return $tags;
	}

	function getModules (){
		$query = $this->db->get("modules");
		$modules = $query->result_array();
		return $modules;
	}

	function addCoating ($name, $solvent, $thickness, $thickness_var, $rms){
		$sql = "INSERT INTO coatings (id, name, solvent, thickness, thickness_variability, rms) VALUES 
		(DEFAULT, ?, ?, ?, ?, ?)";
		$arr = array("name"=>$name, "solvent"=>$solvent, "thickness"=>$thickness, 
			"thickness_variability"=>$thickness_var, "rms"=>$rms);
		$result = $this->db->query($sql, $arr);

		if ($result){
			return true;
		} else {
			return false;
		}

	}

	function addExperiment ($description, $coating, $solution, $sensor, $module, 
        $conc, $flow) {
		$sql = "INSERT INTO experiments (id, description, coating, solution, sensor, 
			module, conc_inlet, flow_rate) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)";
		$arr = array("description"=>$description, "coating"=>$coating, "solution"=>$solution,
			"sensor"=>$sensor, "module"=>$module, "conc_inlet"=>$conc, "flow_rate"=>$flow);
		$this->db->query($sql, $arr);

		$sql = "SELECT * FROM experiments WHERE id IN (SELECT max(id) FROM experiments)";
		$query = $this->db->query($sql);
		$result = $query->row_array();

		return $result['id'];
	}

	function addExperimentTag ($id, $tag){
		$sql = "INSERT INTO experiment_tags (id, experiment, tag) VALUES (DEFAULT, ?, ?)";
		$arr = array("experiment"=>$id, "tag"=>$tag);
		$query = $this->db->query($sql, $arr);
		if ($query){
			return true;
		} else {
			return false;
		}
	}

	function addExperimentMeasure ($id, $measure, $value){
		$sql ="INSERT INTO experiment_measures (id, experiment, measure, value) VALUES (DEFAULT, ?, ?, ?)";
		$arr = array("experiment"=>$id, "measure"=>$measure, "value"=>$value);
		$query = $this->db->query($sql, $arr);
		if ($query){
			return true;
		} else {
			return false;
		}
	}

	function addMeasure ($name){
		$sql = "INSERT INTO measures (id, name) VALUES (DEFAULT, ?)";
		$arr = array("name"=>$name);
		$result = $this->db->query($sql, $arr);

		if($result){
			return true;
		} else{
			return false;
		}
	}


	function addTag ($name){
		$sql = "INSERT INTO tags (id, name) VALUES (DEFAULT, ?)";
		$arr = array("name"=>$name);
		$result = $this->db->query($sql, $arr);

		if($result){
			return true;
		} else{
			return false;
		}
	}

	function addSolvent ($name){
		$sql = "INSERT INTO solvents (id, name) VALUES (DEFAULT, ?)";
		$arr = array("name"=>$name);
		$result = $this->db->query($sql, $arr);

		if($result){
			return true;
		} else{
			return false;
		}
	}


	function addSensor ($name){
		$sql = "INSERT INTO sensors (id, name) VALUES (DEFAULT, ?)";
		$arr = array("name"=>$name);
		$result = $this->db->query($sql, $arr);

		if($result){
			return true;
		} else{
			return false;
		}
	}


	function addModule ($name){
		$sql = "INSERT INTO modules (id, name) VALUES (DEFAULT, ?)";
		$arr = array("name"=>$name);
		$result = $this->db->query($sql, $arr);

		if($result){
			return true;
		} else{
			return false;
		}
	}

	function addSolution ($name){
		$sql = "INSERT INTO solutions (id, name) VALUES (DEFAULT, ?)";
		$arr = array("name"=>$name);
		$result = $this->db->query($sql, $arr);

		if($result){
			return true;
		} else{
			return false;
		}
	}
}
?>