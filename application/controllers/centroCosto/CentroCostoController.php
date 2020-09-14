<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CentroCostoController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('centroCosto/CentroCostoModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarCentroCostos()
    {
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre'); 
        $p_estado = $this->input->get('p_estado');  
        $query = $this->CentroCostoModel->cargarCentroCostos($p_cod_cc, $p_cod_emp,  $p_nombre, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCentroCostosFiltro()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $query = $this->CentroCostoModel->cargarCentroCostosFiltro($p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearCentroCosto()
    {
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $p_cod_ger = $this->input->get('p_cod_ger');  
        $p_nom_ger = $this->input->get('p_nom_ger');  
        $p_cod_dep = $this->input->get('p_cod_dep');  
        $p_nom_dep = $this->input->get('p_nom_dep'); 
        $p_rut_jefe = $this->input->get('p_rut_jefe');  
        $p_nom_jefe = $this->input->get('p_nom_jefe'); 

        $query = $this->CentroCostoModel->crearCentroCosto($p_cod_cc, $p_cod_emp, $p_nombre, $p_usuario, $p_estado,
            $p_cod_ger, $p_nom_ger, $p_cod_dep, $p_nom_dep,
            $p_rut_jefe, $p_nom_jefe);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarCentroCosto()
    {
        $p_cod_cc = $this->input->get('p_cod_cc'); 
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado'); 
        $p_cod_ger = $this->input->get('p_cod_ger');  
        $p_nom_ger = $this->input->get('p_nom_ger');  
        $p_cod_dep = $this->input->get('p_cod_dep');  
        $p_nom_dep = $this->input->get('p_nom_dep');
        $p_rut_jefe = $this->input->get('p_rut_jefe');  
        $p_nom_jefe = $this->input->get('p_nom_jefe');  

        $query = $this->CentroCostoModel->modificarCentroCosto($p_cod_cc, $p_cod_emp, $p_nombre, $p_usuario, $p_estado,
            $p_cod_ger, $p_nom_ger, $p_cod_dep, $p_nom_dep, $p_rut_jefe, $p_nom_jefe);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
