<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ParametroController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('parametro/ParametroModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarParametros()
    {
        $p_param = $this->input->get('p_param');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre'); 
        $p_estado = $this->input->get('p_estado');  
        $p_tipo = $this->input->get('p_tipo');  
        $query = $this->ParametroModel->cargarParametros($p_param, $p_cod_emp,  $p_nombre, $p_estado, $p_tipo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarParametrosFiltro()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $query = $this->ParametroModel->cargarParametrosFiltro($p_cod_emp, $p_tipo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarTiposParam()
    {
        $query = $this->ParametroModel->cargarTiposParam();
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearParametro()
    {
        $p_param = $this->input->get('p_param'); 
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $p_tipo = $this->input->get('p_tipo');  
        $query = $this->ParametroModel->crearParametro($p_param, $p_cod_emp, $p_nombre, $p_usuario, $p_estado, $p_tipo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarParametro()
    {
        $p_param = $this->input->get('p_param'); 
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $p_tipo = $this->input->get('p_tipo');  
        $query = $this->ParametroModel->modificarParametro($p_param, $p_cod_emp, $p_nombre, $p_usuario, $p_estado, $p_tipo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
