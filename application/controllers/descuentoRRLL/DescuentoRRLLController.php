<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class DescuentoRRLLController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('descuentoRRLL/DescuentoRRLLModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarDescuentosRRLL()
    {
        $p_cod = $this->input->get('p_cod');  
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_tipo = $this->input->get('p_tipo');   
        $p_nombre = $this->input->get('p_nombre'); 
        $p_estado = $this->input->get('p_estado');  
        $query = $this->DescuentoRRLLModel->cargarDescuentosRRLL($p_cod, $p_cod_emp, $p_tipo, $p_nombre, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarDescuentosRRLLFiltro()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $query = $this->DescuentoRRLLModel->cargarDescuentosRRLLFiltro($p_cod_emp, $p_tipo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearDescuentoRRLL()
    {
        $p_cod = $this->input->get('p_cod');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_nombre = $this->input->get('p_nombre'); 
        $p_observacion = $this->input->get('p_observacion'); 
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $query = $this->DescuentoRRLLModel->crearDescuentoRRLL($p_cod, $p_cod_emp, $p_tipo, $p_nombre, $p_observacion, $p_usuario, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarDescuentoRRLL()
    {
        $p_cod = $this->input->get('p_cod');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_nombre = $this->input->get('p_nombre'); 
        $p_observacion = $this->input->get('p_observacion'); 
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  
        $query = $this->DescuentoRRLLModel->modificarDescuentoRRLL($p_cod, $p_cod_emp, $p_tipo, $p_nombre, $p_observacion, $p_usuario, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
