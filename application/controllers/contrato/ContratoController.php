<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ContratoController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('contrato/ContratoModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarContratos()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_estado = $this->input->get('p_estado');
        $query = $this->ContratoModel->cargarContratos($p_cod_emp, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearContrato()
    {
        $p_id = $this->input->get('p_id');  
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_nombre = $this->input->get('p_nombre');  
        $p_cliente = $this->input->get('p_cliente');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $query = $this->ContratoModel->crearContrato($p_id, $p_cod_emp, $p_nombre, $p_cliente, $p_usuario, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarContrato()
    {
        $p_id = $this->input->get('p_id');  
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_nombre = $this->input->get('p_nombre');  
        $p_cliente = $this->input->get('p_cliente');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $query = $this->ContratoModel->modificarContrato($p_id, $p_cod_emp, $p_nombre, $p_cliente, $p_usuario, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
