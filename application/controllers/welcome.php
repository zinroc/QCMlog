<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Main controller
 * Deals with authentication and central user functionality
 */
class Welcome extends CI_Controller {

    const PASSWORD_MIN_LENGTH = 5;
    const CHARNAME_MAX_LENGTH = 20;

    function __construct () {
        // call the parent constructor
        parent::__construct ();
        session_start ();
    }

    /**
     * Remap URLs so that only whitelisted methods can be accessed without authentication
     */
    public function _remap ($method, $params = array ()) {
        //enforce access controls to protected functions

        // these functions can be called by users that are not logged in
        $free_view = array(
            // unauthenticated views
            "index",
            "home",
            "qcm",
            "explore"
        );

        if (in_array($method, $free_view)) {
            return call_user_func_array(array($this, $method), $params);
        } else if (! isset($_SESSION['email']) && ! in_array($method, $free_view)) {
            //redirect('welcome/home');
            return call_user_func_array(array($this, $method), $params);
        }  else {
            return call_user_func_array(array($this, $method), $params);
        }

    }

    /**
     * Index Page for this controller
     * For now, this is the login page
     */
    public function index() {
        redirect('welcome/home', 'refresh');
    }

    /**
     * Go to the home page.
     */
    public function home() {

        $data = array(
            "page_title" => "Home",
            "extra_css" => array(asset_url() . "/css/auth-style.css"),
            "extra_js" => array(asset_url() . "/js/controllers/auth.js"),
            "view" => "home"
        );
        $this->load->view ('master', array("data" => $data));

    }

    /**
     * Go to the QCM page.
     */
    public function qcm() {

        $data = array(
            "page_title" => "qcm",
            "extra_css" => array(asset_url() . "/css/qcm.css"),
            "extra_js" => array(asset_url() . "/js/controllers/qcm.js"),
            "view" => "qcm"
        );
        $this->load->view ('master', array("data" => $data));

    }

    /**
     * Go to the explore page.
     */
    public function explore() {

        $data = array(
            "page_title" => "explore",
            "extra_css" => array(asset_url() . "/css/explore.css"),
            "extra_js" => array(asset_url() . "/js/controllers/explore.js"),
            "view" => "explore"
        );
        $this->load->view ('master', array("data" => $data));

    }


    public function editCoating() {
        $name = $this->input->post("name");
        $solvent = $this->input->post("solvent");
        $thickness = $this->input->post("thickness");
        $thickness_var = $this->input->post("thickness_var");
        $rms = $this->input->post("rms");

        //echo($name . " " . $solvent);

        $this->load->model('qcm_model');
        $result = $this->qcm_model->editCoating($name, $solvent, $thickness, $thickness_var, $rms);
        if ($result){
            $this->printJSONSuccess("editted coating " . $name);
        } else {
            $this->printJSONDatabaseError();
        }

    }

    public function addCoating() {
        $name = $this->input->post("name");
        $solvent = $this->input->post("solvent");
        $thickness = $this->input->post("thickness");
        $thickness_var = $this->input->post("thickness_var");
        $rms = $this->input->post("rms");

        //echo($name . " " . $solvent);

        $this->load->model('qcm_model');
        $result = $this->qcm_model->addCoating($name, $solvent, $thickness, $thickness_var, $rms);
        if ($result){
            $this->printJSONSuccess("added coating " . $name);
        } else {
            $this->printJSONDatabaseError();
        }

    }
    public function updateExperiment() {
        $id = $this->input->post("id");
        $description = $this->input->post("description");
        $date = $this->input->post("date");
        $coating = $this->input->post("coating");
        $solution = $this->input->post("solution");
        $sensor = $this->input->post("sensor");
        $module = $this->input->post("module");
        $conc = $this->input->post("conc");
        $flow = $this->input->post("flow");


        $this->load->model('qcm_model');
        $result = $this->qcm_model->updateExperiment($id, $description, $date, $coating, $solution, 
            $sensor, $module, $conc, $flow);
        if ($result){
            $this->printJSONSuccess("updated experiment " . $id);
        } else {
            $this->printJSONDatabaseError();
        }

    }

    public function deleteExperimentMeasures() {
        $id = $this->input->post("id");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->deleteExperimentMeasures($id);
        if ($result){
            $this->printJSONSuccess("deleted experiment measures for id " . $id);
        } else {
            $this->printJSONDatabaseError();
        }

    }

    public function deleteExperimentTags() {
        $id = $this->input->post("id");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->deleteExperimentTags($id);
        if ($result){
            $this->printJSONSuccess("deleted experiment tags for id " . $id);
        } else {
            $this->printJSONDatabaseError();
        }

    }

    public function addExperiment() {
        $description = $this->input->post("description");
        $date = $this->input->post("date");
        $coating = $this->input->post("coating");
        $solution = $this->input->post("solution");
        $sensor = $this->input->post("sensor");
        $module = $this->input->post("module");
        $conc = $this->input->post("conc");
        $flow = $this->input->post("flow");


        $this->load->model('qcm_model');
        $result = $this->qcm_model->addExperiment($description, $date, $coating, $solution, $sensor, $module, 
            $conc, $flow);
        if ($result){
            $this->printJSON(array("id"=>$result));
        } else {
            $this->printJSONDatabaseError();
        }

    }

    public function addExperimentTag(){
        $id = $this->input->post("id");
        $tag = $this->input->post("tag");
        $this->load->model("qcm_model");
        $result = $this->qcm_model->addExperimentTag($id, $tag); 
        if ($result){
            $this->printJSONSuccess( "added experiment tag");
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function addExperimentMeasure(){
        $id = $this->input->post("id");
        $measure = $this->input->post("measure");
        $value = $this->input->post("value");
        $this->load->model("qcm_model");
        $result = $this->qcm_model->addExperimentMeasure($id, $measure, $value);
        if ($result){
            $this->printJSONSuccess( "added experiment measure");
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function addSolvent() {
        $name = $this->input->post("name");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->addSolvent($name);
        if ($result){
            $this->printJSONSuccess("added solvent " . $name);
        } else {
            $this->printJSONDatabaseError();
        }

    }

    public function addMeasure() {
        $name = $this->input->post("name");
        $description = $this->input->post("description");
        $units = $this->input->post("units");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->addMeasure($name, $description, $units);
        if ($result){
            $this->printJSONSuccess("added measure " . $name);
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function addTag() {
        $name = $this->input->post("name");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->addTag($name);
        if ($result){
            $this->printJSONSuccess("added tag " . $name);
        } else {
            $this->printJSONDatabaseError();
        }

    }

    public function addSensor() {
        $name = $this->input->post("name");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->addSensor($name);
        if ($result){
            $this->printJSONSuccess("added sensor " . $name);
        } else {
            $this->printJSONDatabaseError();
        }

    }

    public function addModule() {
        $name = $this->input->post("name");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->addModule($name);
        if ($result){
            $this->printJSONSuccess("added module " . $name);
        } else {
            $this->printJSONDatabaseError();
        }

    }

    public function addSolution() {
        $name = $this->input->post("name");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->addSolution($name);
        if ($result){
            $this->printJSONSuccess("added solution " . $name);
        } else {
            $this->printJSONDatabaseError();
        }

    }
    public function getExperimentTags (){
        $id = $this->input->post("id");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->getExperimentTags($id);
            $this->printJSON(array("experimentTags" => $result));

    }
    public function getExperimentMeasures (){
        $id = $this->input->post("id");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->getExperimentMeasures($id);
            $this->printJSON(array("experimentMeasures" => $result));

    }


    public function searchMeasure (){
        $exp_id = $this->input->post("exp_id");
        $measure = $this->input->post("measure");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->searchMeasure($exp_id, $measure);
        if ($result){
            $this->printJSON(array("measure" => $result['measure'], 
                "experiment" => $result['experiment'], "value" => $result['value']));
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function searchTag (){
        $exp_id = $this->input->post("exp_id");
        $tag = $this->input->post("tag");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->searchTag($exp_id, $tag);
        if ($result){
            $this->printJSON(array("tag" => $result['tag'], 
                "experiment" => $result['experiment'], "value" => $result['value']));
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function search (){
        $query = $this->input->post("query");

        $query = strip_tags($query);

        $this->load->model('qcm_model');
        $result = $this->qcm_model->search($query);
        if ($result){
            $this->printJSON(array("search" => $result));
        } else {
            $this->printJSONDatabaseError();
        }
    }


    public function getExperiment (){
        $id = $this->input->post("id");

        $this->load->model('qcm_model');
        $result = $this->qcm_model->getExperiment($id);
        if ($result){
            $this->printJSON(array("experiment" => $result));
        } else {
            $this->printJSONDatabaseError();
        }
    }


    public function loadCoating (){
        $coating_name = $this->input->post("coating_name");
        //echo($coating_name . "COATING NAME");
        $this->load->model('qcm_model');
        $result = $this->qcm_model->loadCoating($coating_name);
        if ($result){
            $this->printJSON(array("coating" => $result));
        } else {
            $this->printJSONDatabaseError();
        }
    }



    public function getCoatings() {

        $this->load->model('qcm_model');
        $coatings = $this->qcm_model->getCoatings();
        if ($coatings){
            $this->printJSON(array("coatings" => $coatings));
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function getSolvents() {

        $this->load->model('qcm_model');
        $solvents = $this->qcm_model->getSolvents();
        if ($solvents){
            $this->printJSON(array("solvents" => $solvents));
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function getSensors() {

        $this->load->model('qcm_model');
        $sensors = $this->qcm_model->getSensors();
        if ($sensors){
            $this->printJSON(array("sensors" => $sensors));
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function getMeasures() {

        $this->load->model('qcm_model');
        $measures = $this->qcm_model->getMeasures();
        if ($measures){
            $this->printJSON(array("measures" => $measures));
        } else {
            $this->printJSONDatabaseError();
        }
    }


    public function getCatagories() {

        $this->load->model('qcm_model');
        $catagories = $this->qcm_model->getCatagories();
        if ($catagories){
            $this->printJSON(array("catagories" => $catagories));
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function getTags() {

        $this->load->model('qcm_model');
        $tags = $this->qcm_model->getTags();
        if ($tags){
            $this->printJSON(array("tags" => $tags));
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function getModules() {

        $this->load->model('qcm_model');
        $modules = $this->qcm_model->getModules();
        if ($modules){
            $this->printJSON(array("modules" => $modules));
        } else {
            $this->printJSONDatabaseError();
        }
    }

    public function getSolutions() {

        $this->load->model('qcm_model');
        $solutions = $this->qcm_model->getSolutions();
        if ($solutions){
            $this->printJSON(array("solutions" => $solutions));
        } else {
            $this->printJSONDatabaseError();
        }
    }

    /**
     * Print the given array in JSON with the correct content type.
     */
    private function printJSON ($arr) {
        $this->output->set_content_type("application/json");
        $this->output->set_output(json_encode($arr));
    }

    /**
     * Helper function to avoid code duplication
     */
    private function printJSONDatabaseError() {
        $this->printJSONError("DB error: " . pg_last_error());
    }

    /**
     * Helper function to avoid code duplication
     */
    private function printJSONError($msg) {
        $this->printJSON(array('status' => 'error', 'msg' => $msg));
    }

    /**
     * Helper function to avoid code duplication
     */
    private function printJSONSuccess($msg) {
        $this->printJSON(array('status' => 'success', 'msg' => $msg));
    }
}

?>
