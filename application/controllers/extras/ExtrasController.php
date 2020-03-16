<?php

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');
/**
 * 
 *
 * @author pedrobros
 */
class ExtrasController extends CI_Controller{
    function __construct() {
        parent::__construct();
        
        $this->load->model('extras/ExtrasModel'); //Cargamos el modelo

        $this->output
            ->set_content_type('application/json')
            ->set_header("Access-Control-Allow-Origin: *")
            ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
            ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function validarFechaHora(){
        //print_r($this->input->get('p_fec1') . " " . $$this->input->get('p_hh1'));
        $input = file_get_contents('php://input');
        $json = json_decode($input, true);

        $p_fec_ini = $_GET['p_fec1'] . " " . $_GET['p_hh1'];
        $p_fec_ter = $_GET['p_fec2'] . " " . $_GET['p_hh2'];
        /*if(empty($_GET['p_fec1']))
        {
            $p_fec_ini = $_GET['p_fec1'] . " " . $_GET['p_hh1'];
        }
        if(empty($_GET['p_fec2']))
        {
            $p_fec_ter = $_GET['p_fec2'] . " " . $_GET['p_hh2'];
        }*/
        $query = $this->ExtrasModel->validarFechaHora($p_fec_ini, $p_fec_ter);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    
    public function validarFechaMenorActual(){
        //FORMATO YYYYMMDD
        $p_fec_ini = $this->input->get('p_fec_ini');
        $query = $this->ExtrasModel->validarFechaMenorActual($p_fec_ini);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    
    public function validarFechaMayorActual(){
        //print_r($this->input->get('p_fec1') . " " . $$this->input->get('p_hh1'));
        $input = file_get_contents('php://input');
        $json = json_decode($input, true);
        $p_fec_ini = $_GET['p_fec1'] . " " . $_GET['p_hh1'];
        /*if(empty($_GET['p_fec1']))
        {
            $p_fec_ini = $_GET['p_fec1'] . " " . $_GET['p_hh1'];
        }*/
        $query = $this->ExtrasModel->validarFechaMayorActual($p_fec_ini);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    
    public function contarMesesDiferencia(){
        //print_r($this->input->get('p_fec1') . " " . $$this->input->get('p_hh1'));
        $p_fec1 = $_GET['p_fec1'];
        $p_fec2 = $_GET['p_fec2'];
        if(empty($p_fec1) && empty($p_fec2))
        {
            $p_fec1 = '01/01/2017';
            $p_fec2 = '01/01/2017';
        }
        
        $query = $this->ExtrasModel->contarMesesDiferencia($p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) .'}';
        $this->output->set_output($result);
    }
}
