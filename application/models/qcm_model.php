<?php

class Qcm_Model extends CI_MODEL {

	function searchMeasure ($exp_id, $measure){
		$query = $this->db->get_where("experiment_measures", array("experiment"=>$exp_id, "measure"=>$measure));
		if ($query->num_rows()===0){
			$result['experiment'] = $exp_id;
			$result['measure'] = $measure; 
			$result['value'] = false;
			return $result;

		} else {
			$measureInfo = $query->row_array();
			$result['experiment'] = $measureInfo['experiment'];
			$result['measure'] = $measureInfo['measure'];
			$result['value'] = $measureInfo['value'];
			return $result;
		}
	}


	function searchTag ($exp_id, $tag){
		$query = $this->db->get_where("experiment_tags", array("experiment"=>$exp_id, "tag"=>$tag));
		if ($query->num_rows()===0){
			$result['experiment'] = $exp_id;
			$result['tag'] = $tag;
			$result['value'] = false;
			return $result;

		} else {
			$tagInfo = $query->row_array();
			$result['experiment'] = $tagInfo['experiment'];
			$result['tag'] = $tagInfo['tag'];
			$result['value'] = true;
			return $result;
		}
	}

	//make sure this cannot have an SQL injection
	function search ($sql){
		//echo($sql);
		$query = $this->db->query($sql);
		$result = $query->result_array();
		return $result;
	}

	function getExperiment($id){
		$query = $this->db->get_where("experiments", array("id"=>$id));
		$result = $query->row_array();
		return $result;
	}



	function loadCoating($coating_name){
		$query = $this->db->get_where("coatings", array("name"=>$coating_name));
		$result = $query->row_array();

		return $result;
	}

	function getExperimentTags($id){
		$query = $this->db->get_where("experiment_tags", array("experiment"=>$id));
		$result = $query->result_array();
		return $result;
	}

	function deleteExperimentTags($id){
		$sql = "DELETE FROM experiment_tags WHERE experiment=?";
		$arr = array("experiment"=>$id);
		$this->db->query($sql, $arr);
		return true;
	}

	function deleteExperimentMeasures($id){
		$sql = "DELETE FROM experiment_measures WHERE experiment=?";
		$arr = array("experiment"=>$id);
		$this->db->query($sql, $arr);
		return true;
	}

	function getExperimentMeasures($id){
		$query = $this->db->get_where("experiment_measures", array("experiment"=>$id));
		$expMeasures = $query->result_array();
		$i = 0;
		foreach ($expMeasures as $measure){
			$query = $this->db->get_where("measures", array("name"=>$measure['measure']));
			$measureInfo = $query->row_array();
			$expMeasures[$i]['description'] = $measureInfo['description'];
			$expMeasures[$i]['units'] = $measureInfo['units'];
			$i++;
		}
		return $expMeasures;
	}

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

	function getCatagories (){
		$query = $this->db->get("catagories");
		$catagories = $query->result_array();

		return $catagories;

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

	function editCoating ($name, $solvent, $thickness, $thickness_var, $rms){
		$sql = "UPDATE coatings SET solvent=?, thickness=?, thickness_variability=?, rms=? WHERE name=?";
		$arr = array("solvent"=>$solvent, "thickness"=>$thickness, 
			"thickness_variability"=>$thickness_var, "rms"=>$rms, "name"=>$name);
		$result = $this->db->query($sql, $arr);

		if ($result){
			return true;
		} else {
			return false;
		}

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

	function updateExperiment ($id, $description, $coating, $solution, $sensor, $module, 
        $conc, $flow) {
		$sql = "UPDATE experiments SET description=?, coating=?, solution=?, sensor=?, module=?, conc_inlet=?, flow_rate=? WHERE id=?";
		$arr = array("description"=>$description, "coating"=>$coating, "solution"=>$solution,
			"sensor"=>$sensor, "module"=>$module, "conc_inlet"=>$conc, "flow_rate"=>$flow, "id"=>$id);
		$this->db->query($sql, $arr);
		return true;
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

	function addMeasure ($name, $description, $units){
		$sql = "INSERT INTO measures (id, name, description, units) VALUES (DEFAULT, ?, ?, ?)";
		$arr = array("name"=>$name, "description"=>$description, "units"=>$units);
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