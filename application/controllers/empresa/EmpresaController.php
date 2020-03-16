<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class EmpresaController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('empresa/EmpresaModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarEmpresas()
    {
        $p_empresa = $this->input->get('p_empresa');  
        $p_estado = $this->input->get('p_estado');  
        $query = $this->EmpresaModel->cargarEmpresas($p_empresa, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearEmpresa()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $query = $this->EmpresaModel->crearEmpresa($p_cod_emp, $p_nombre, $p_usuario, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarEmpresa()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $query = $this->EmpresaModel->modificarEmpresa($p_cod_emp, $p_nombre, $p_usuario, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
