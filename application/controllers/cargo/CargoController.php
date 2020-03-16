<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CargoController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('cargo/CargoModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarCargos()
    {
        $p_cod_cargo = $this->input->get('p_cod_cargo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre'); 
        $p_estado = $this->input->get('p_estado');  
        $p_rol = $this->input->get('p_rol');  
        $query = $this->CargoModel->cargarCargos($p_cod_cargo, $p_cod_emp,  $p_nombre, $p_estado, $p_rol);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCargosFiltro()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $query = $this->CargoModel->cargarCargosFiltro($p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarRolesCargo()
    {
        $query = $this->CargoModel->cargarRolesCargo();
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearCargo()
    {
        $p_cod_cargo = $this->input->get('p_cod_cargo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $p_rol = $this->input->get('p_rol');  
        $query = $this->CargoModel->crearCargo($p_cod_cargo, $p_cod_emp, $p_nombre, $p_usuario, $p_estado, $p_rol);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarCargo()
    {
        $p_cod_cargo = $this->input->get('p_cod_cargo'); 
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $p_rol = $this->input->get('p_rol');  
        $query = $this->CargoModel->modificarCargo($p_cod_cargo, $p_cod_emp, $p_nombre, $p_usuario, $p_estado, $p_rol);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
